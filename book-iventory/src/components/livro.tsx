import { Edit } from '@/components/edit';
import { useState } from 'react';

interface LivroProps {
  livro: {
    objectId?: string;
    titulo: string;
    autor: string;
    capaUrl?: string;
  };
  onDelete: () => void;
  onUpdate: () => void;
}

export function Livro({ livro, onDelete, onUpdate }: LivroProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const confirmado = window.confirm(`Tem certeza que deseja excluir "${livro.titulo}"?`);
    if (!confirmado) return;

    await onDelete();
  };

  return (
    <li className="flex flex-col items-center bg-[var(--gray-600)] shadow-md rounded p-4 w-48 h-[300px] overflow-hidden">
      {livro.capaUrl && (
        <img
          src={livro.capaUrl}
          alt={`Capa do livro ${livro.titulo}`}
          className="w-28 h-40 object-cover border border-black"
        />
      )}

      <div className="text-center mt-2 px-1 flex-1 flex flex-col justify-start w-40">
        <b
          className="block font-bold text-sm truncate text-green-500"
          title={livro.titulo}
        >
          {livro.titulo}
        </b>
        <b
          className="block text-xs text-gray-200 break-words mt-1 line-clamp-2"
          title={livro.autor}
        >
          {livro.autor}
        </b>
      </div>

      <div className="flex justify-between items-center w-full p-2">
        <svg
          onClick={() => setOpen(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-pencil-line cursor-pointer"
        >
          <path d="M12 20h9" />
          <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
          <path d="m15 5 3 3" />
        </svg>

        <svg
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash text-red-500 cursor-pointer"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </div>

      <Edit
        isOpen={open}
        onClose={() => setOpen(false)}
        livro={livro}
        onUpdated={onUpdate}
      />
    </li>
  );
}
