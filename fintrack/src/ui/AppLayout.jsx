import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-[var(--color4)]">
      {/* <Navbar/> */}
      <Sidebar />
      <main className="no-scrollbar mt-5 flex flex-auto justify-center overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
