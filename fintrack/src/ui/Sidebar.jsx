import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import Logo from "./Logo";
import Navlinks from "./Navlinks";
import { useLogout } from "../hooks/auth/useLogout";
import { useUser } from "../hooks/auth/useUser";
import Spinner from "./Spinner";

function Sidebar() {
  const { logout, isPending } = useLogout();
  const { user } = useUser();
  return (
    <div className="flex flex-row gap-10 text-[var(--color-text)] shadow-2xl bg-[var(--color3)] justify-end">
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center backdrop-blur-xs">
          <Spinner />
        </div>
      )}
      <Navlinks />
    </div>
  );
}

export default Sidebar;
