import { NavLink } from "react-router-dom";
import {
  HiArrowRightEndOnRectangle,
  HiListBullet,
  HiSparkles,
} from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import { HiCog6Tooth } from "react-icons/hi2";
import { useLogout } from "../hooks/auth/useLogout";
import { HiArrowsRightLeft } from "react-icons/hi2";
function Navlinks() {
  const { logout, isPending } = useLogout();
  return (
    <div className="flex flex-row text-[var(--color-text)]">
      <nav className="flex flex-row gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex flex-row font-extrabold underline"
              : "flex flex-row"
          }
        >
          <HiOutlineHome className="mr-2 h-12 w-8 text-[var(--color4)]" />
          {/* <span className="mt-1 text-2xl">Dashboard</span> */}
        </NavLink>

        <NavLink
          to="/Entries"
          className={({ isActive }) =>
            isActive
              ? "flex flex-row font-extrabold underline"
              : "flex flex-row"
          }
        >
          <HiListBullet className="mr-2 h-12 w-8 text-[var(--color4)]" />
          {/* <span className="mt-2 text-2xl">Entries</span> */}
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "flex flex-row font-extrabold underline"
              : "flex flex-row"
          }
        >
          <HiCog6Tooth className="mr-2 h-12 w-8 text-[var(--color4)]" />
          {/* <span className="mt-1 text-2xl">Settings</span> */}
        </NavLink>
        <HiArrowRightEndOnRectangle
          className="h-12 w-8 text-[var(--color4)]"
          onClick={logout}
        />
        <a href="http://localhost:3000/home">
          <HiArrowsRightLeft className="mr-2 h-12 w-8 text-[var(--color4)]" />
        </a>
      </nav>
    </div>
  );
}

export default Navlinks;
