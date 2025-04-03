import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/sidebar";
import {Home} from "@/pages/home";
import {Stock} from "@/pages/stock";

export function MainLayout() {
  return (
    <div className='grid grid-cols-[208px_1fr] gap-8 items-start'>
      <Sidebar />
      <div >
        <Routes>
          	<Route path="/" element={<Home />} />
          	<Route path="/stock" element={<Stock />} />
        </Routes>
      </div>
    </div>
  );
}
