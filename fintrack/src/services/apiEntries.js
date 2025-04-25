import supabase from "./supabase";
const PAGE_SIZE = 8;
export async function addEntry({ entry }) {
  const { data, error } = await supabase
    .from("entries")
    .insert([entry])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function getEntries({ user, filter, sortBy, page }) {
  let query = supabase.from("entries").select("*", { count: "exact" });
  query = query.eq("username", user.email);
  if (filter) {
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].value === "nofilter") continue;
      else if (filter[i].field === "dateRange") {
        query = query.gte("date", filter[i].value.min);
        query = query.lte("date", filter[i].value.max);
      } else if (filter[i].field === "priceRange") {
        console.log(filter[i].value.min, filter[i].value.max);
        query = query.gte("amount", filter[i].value.min);
        query = query.lte("amount", filter[i].value.max);
      } else {
        query = query.eq(filter[i].field, filter[i].value);
      }
    }
  }
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data, count };
}

export async function changeEntry(entry) {
  const { uuid, ...entryData } = entry;

  const { data, error } = await supabase
    .from("entries")
    .update(entryData)
    .eq("uuid", uuid)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEntry(uuid) {
  const { error } = await supabase.from("entries").delete().eq("uuid", uuid);
  if (error) throw new Error(error.message);
}

export async function getDashboardEntries({ user, filter }) {
  let query = supabase.from("entries").select("*", { count: "exact" });
  query = query.eq("username", user.email);

  if (filter) {
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].field == "date") {
        query = query.eq("date", filter[i].value);
      }
      if (filter[i].field === "dateRange") {
        query = query.gte("date", filter[i].value.min);
        query = query.lte("date", filter[i].value.max);
      }
    }
  }

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { data, count };
}
