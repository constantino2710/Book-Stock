import { useNavigate, useLocation } from "react-router-dom";
import logo from '@/assets/logo.png';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-house-icon lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Home
        </button> 

        <button
          className={`${pathname === "/stock" ? "text-[var(--green-500)]" : "text-[var(--gray-500)]"} cursor-pointer text-base w-[13rem] rounded-lg h-[3.5rem] flex items-center gap-2`}
          onClick={() => navigate("/stock")}
        >
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-library-icon lucide-square-library"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7v10"/><path d="M11 7v10"/><path d="m15 7 2 10"/></svg>          Acervo
        </button>
      </nav>
    </div>
  );
}
