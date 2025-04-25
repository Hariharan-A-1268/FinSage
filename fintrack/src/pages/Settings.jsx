import {
  HiEye,
  HiEyeSlash,
  HiMiniCheckCircle,
  HiMoon,
  HiPencil,
  HiPlusCircle,
  HiSun,
  HiXCircle,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import {
  editFullName,
  editPassword,
  editEmail,
  updateFullName,
  updatePassword,
  updatePassWordVisiblity,
  updateEmail,
} from "../features/settings/settingsSlice";
import { useDarkMode } from "../context/DarkModeContext";
import { useEffect } from "react";
import { useUser } from "../hooks/auth/useUser";
import { useUpdateUser } from "../hooks/auth/useUpdateUser";
import Spinner from "../ui/Spinner";
import useUpdateEmail from "../hooks/auth/useUpdateEmail";
import SettingsCategoryTag from "../ui/SettingsCategoryTag";
function Settings() {
  const dispatch = useDispatch();
  const { updateUser, isUpdating } = useUpdateUser();
  const { updateEmail: updateUsername, isPending } = useUpdateEmail();
  const { user } = useUser();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const {
    canEditFullName,
    canEditEmail,
    canEditPassword,
    email,
    password,
    fullName,
    passwordVisibility,
  } = useSelector((store) => store.settings);

  useEffect(
    function () {
      dispatch(updateFullName(user?.user_metadata?.fullName));
    },
    [dispatch, user?.user_metadata?.fullName],
  );
  useEffect(
    function () {
      dispatch(updateEmail(user?.email));
    },
    [dispatch, user?.email],
  );
  const categories = user?.user_metadata?.categories || [];
  return (
    <div className="flex flex-col gap-3 text-3xl">
      {console.log(user)}
      {(isUpdating || isPending) && (
        <div className="absolute inset-0 z-50 flex items-center backdrop-blur-xs">
          <Spinner />
        </div>
      )}
      {/* <div className="relative flex flex-col">
        <img
          src={user?.user_metadata?.avatar || "userlogo.png"}
          className="h-44 w-44 self-center rounded-full bg-[var(--color10)]"
        />

        <HiPencil className="absolute right-[40%] bottom-1 rounded-2xl bg-[var(--color3)] p-1" />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const avatar = e.target.files[0];
            updateUser({ avatar });
          }}
          disabled={isUpdating || isPending}
          className="absolute right-[40%] bottom-1 h-8 w-8 rounded-2xl opacity-0"
        />
      </div> */}

      {/* <div className="flex flex-row">
        <label className="mr-3 font-bold">FullName</label>

        <input
          required
          className="mr-2 rounded-lg bg-[var(--color6)]"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => dispatch(updateFullName(e.target.value))}
          disabled={!canEditFullName}
        />

        {canEditFullName ? (
          <>
            <HiXCircle
              onClick={() => {
                dispatch(updateFullName(user?.user_metadata?.fullName));
                dispatch(editFullName(false));
              }}
            />
            <HiMiniCheckCircle
              onClick={() => {
                dispatch(editFullName(false));
                updateUser({ fullName });
              }}
            />
          </>
        ) : (
          <HiPencil onClick={() => dispatch(editFullName(true))} />
        )}
      </div>
      <div className="flex flex-row">
        <label className="mr-3 font-bold">email</label>

        <input
          required
          className="mr-2 rounded-lg bg-[var(--color6)]"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => dispatch(updateEmail(e.target.value))}
          disabled={!canEditEmail}
        />

        {canEditEmail ? (
          <>
            <HiXCircle
              onClick={() => {
                dispatch(updateEmail(user?.email));
                dispatch(editEmail(false));
              }}
            />
            <HiMiniCheckCircle
              onClick={() => {
                dispatch(editEmail(false));
                updateUsername({ email });
              }}
            />
          </>
        ) : (
          <HiPencil onClick={() => dispatch(editEmail(true))} />
        )}
      </div>
      <div className="flex flex-row">
        <label className="mr-4 font-bold">Change Password</label>
        {canEditPassword && (
          <input
            required
            className="mr-2 rounded-lg bg-[var(--color6)]"
            value={password}
            type={passwordVisibility}
            placeholder="Password"
            disabled={!canEditPassword}
            onChange={(e) => dispatch(updatePassword(e.target.value))}
          />
        )}
        {canEditPassword ? (
          <>
            <HiXCircle
              onClick={() => {
                dispatch(updatePassword(""));
                dispatch(editPassword(false));
              }}
            />
            <>
              <HiMiniCheckCircle
                onClick={() => {
                  dispatch(editPassword(false));
                  updateUser({ password });
                  dispatch(updatePassword(""));
                }}
              />
              {passwordVisibility === "password" ? (
                <HiEye
                  onClick={() => dispatch(updatePassWordVisiblity("text"))}
                />
              ) : (
                <HiEyeSlash
                  onClick={() => dispatch(updatePassWordVisiblity("password"))}
                />
              )}
            </>
          </>
        ) : (
          <HiPencil onClick={() => dispatch(editPassword(true))} />
        )}
      </div> */}
      <div>
        <div className="flex flex-row mt-5">
          <p className="font-bold text-white mb-3">Add new Category</p>
          <HiPlusCircle
            className="mt-2 ml-2 text-white"
            onClick={() => {
              if (categories.length === 10) return;

              updateUser({
                categories: [
                  ...categories,
                  `category${Math.floor(Math.random() * 100) + 1}`,
                ],
              });
            }}
          />
          <p className="mt-1 text-lg text-red-500">
            {categories.length === 10 ? "Maximum of 10 categories allowed" : ""}
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-5 border-2 bg-white p-1">
          {categories.map((category, index) => (
            <SettingsCategoryTag
              name={category}
              key={Math.random()}
              index={index + 1}
              categories={categories}
              updateUser={updateUser}
            />
          ))}
        </div>
      </div>

      {/* <div className="mt-1">
        <div className="mr-1 flex flex-row gap-1 font-bold">
          {isDarkMode ? "Light Mode" : "Dark Mode"}

          {isDarkMode ? (
            <HiSun className="h-9 w-8" onClick={() => setIsDarkMode(false)} />
          ) : (
            <HiMoon className="h-9 w-8" onClick={() => setIsDarkMode(true)} />
          )}
        </div>
      </div> */}
    </div>
  );
}

export default Settings;
