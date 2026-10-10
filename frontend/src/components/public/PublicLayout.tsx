
import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";

function PublicLayout() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-white text-slate-900">
      <PublicHeader />

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
