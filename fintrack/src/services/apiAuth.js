import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: "username",
        avatar: "",
        categories: [],
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCurrentUser({
  fullName,
  email,
  password,
  avatar,
  categories,
}) {
  let updateData;
  if (email) updateData = { email };
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  if (categories) updateData = { data: { categories } };
  if (avatar) {
    console.log(avatar);
    const fileName = `avatar-${Math.random()}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);
    updateData = {
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  return data;
}

export async function forgotPassword({ email }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw new Error(error.message);
  return data;
}

export async function updateEmail({ email }) {
  const { data, error } = await supabase.auth.updateUser({ email });
  if (error) throw new Error(error.message);
  return data;
}
