import { useNavigate } from "react-router-dom";

export function FloatingButton() {
	const navigate = useNavigate();
	return (
	  <button
		onClick={() => navigate("/create")} 
		className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[var(--green-500)] text-white text-3xl shadow-md hover:bg-[var(--green-300)] transition-colors cursor-pointer "
	  >
		+
	  </button>
	);
  }
  