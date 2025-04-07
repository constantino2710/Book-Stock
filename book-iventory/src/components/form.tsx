import { useState } from "react";
import { ImageUpload } from '@/components/imgUpload';
import { adicionarLivroManual } from "@/api";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalForm({ isOpen, onClose }: ModalFormProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [capaUrl, setCapaUrl] = useState("");

  const handleAdicionarLivro = async () => {
    if (!titulo.trim() || !autor.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    const resultado = await adicionarLivroManual({ titulo, autor, capaUrl });

    if (resultado) {
      window.location.reload(); // ← força a atualização da página
    } else {
      alert("Erro ao adicionar o livro.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative flex flex-col items-center bg-[var(--gray-700)] w-[40rem] rounded-lg p-[4rem]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-[var(--green-300)] cursor-pointer transition"
        >
          &times;
        </button>

        <h1 className="text-4xl mb-6 text-white">Adicione um livro</h1>
        <form className="flex flex-col items-center justify-center w-full gap-[1rem]" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full h-[2.5rem] rounded-lg bg-[var(--gray-600)] text-white pl-2 focus:border-[var(--green-300)] focus:border focus:outline-none"
          />

          <input
            type="text"
            placeholder="Autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className="w-full h-[2.5rem] rounded-lg bg-[var(--gray-600)] text-white pl-2 focus:border-[var(--green-300)] focus:border focus:outline-none"
          />

          <ImageUpload onUpload={(url: string) => setCapaUrl(url)} />

          <button
            type="button"
            onClick={handleAdicionarLivro}
            className="bg-[var(--green-500)] w-full h-[2.5rem] rounded-lg text-white cursor-pointer"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
