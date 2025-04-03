import { useNavigate, useLocation } from "react-router-dom";
import logo from '@/assets/Design sem nome.png'

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className='w-[15rem] h-screen bg-[var(--gray-600)] text-white flex flex-col'>
      <nav className='flex flex-col items-center gap-2 mt-2'>
        <img src={logo} alt="" className='h-32 w-auto'/>

        <button
          className={`${pathname === "/" ? "text-[var(--green-500)]" : "text-[var(--gray-500)]"} cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem] flex items-center gap-2`}
          onClick={() => navigate("/")} 
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Home
        </button> 

        <button
          className={`${pathname === "/stock" ? "text-[var(--green-500)]" : "text-[var(--gray-500)]"} cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem] flex items-center gap-2`}
          onClick={() => navigate("/stock")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-archive-icon lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
          Estoque
        </button>
      </nav>
    </div>
  );
}
