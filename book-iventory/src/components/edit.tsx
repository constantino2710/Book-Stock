import { useEffect, useState } from "react";
import { atualizarLivro } from "@/api/index"; // ✅ importe a função de update

interface LivroEdit {
  objectId?: string;
  titulo: string;
  autor: string;
}

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  livro: LivroEdit;
  onUpdated: () => void;
}

export function Edit({ isOpen, onClose, livro, onUpdated }: EditProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    if (isOpen && livro) {
      setTitulo(livro.titulo);
      setAutor(livro.autor);
    }
  }, [isOpen, livro]);

  const handleUpdate = async () => {
    if (!livro.objectId) return;

    const sucesso = await atualizarLivro(livro.objectId, { titulo, autor });
    if (sucesso) {
      onClose();
      onUpdated(); 
	  window.location.reload();// para recarregar os dados
    } else {
      alert("Erro ao atualizar livro.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-[var(--gray-700)] w-full max-w-xl rounded-lg p-8 sm:p-12 flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-[var(--green-300)] transition cursor-pointer"
        >
          &times;
        </button>

        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-white text-center">
          Editar livro
        </h1>

        <form className="flex flex-col items-center w-full gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full h-10 rounded-lg bg-[var(--gray-600)] text-white px-3 focus:outline-none focus:border focus:border-[var(--green-300)]"
          />

          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full h-10 rounded-lg bg-[var(--gray-600)] text-white px-3 focus:outline-none focus:border focus:border-[var(--green-300)]"
          />

<button
  type="button"
  onClick={handleUpdate}
  className="bg-[var(--green-500)] w-full h-10 rounded-lg text-white font-medium hover:bg-[var(--green-300)] transition cursor-pointer"
>
  Atualizar
</button>

        </form>
      </div>
    </div>
  );
}
