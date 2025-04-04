import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import { Home } from "@/pages/home";
import { Stock } from "@/pages/stock";

export function MainLayout() {
  const { pathname } = useLocation();
  const showSidebar = ["/", "/stock"].includes(pathname); // rotas que terão sidebar

  return (
    <div className={`grid ${showSidebar ? "grid-cols-[208px_1fr]" : "grid-cols-1"} gap-8 items-start`}>
      {showSidebar && <Sidebar />}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </div>
    </div>
  );
}
