import { useEffect, useState } from "react";
import {
  buscarNaOpenLibrary,
  salvarNoBack4App,
  buscarLivrosSalvos,
  deleteLivro,
} from "@/api/index";
import { Livro } from "../components/livro";
import { FloatingButton } from "@/components/fab";

type LivroSalvo = {
  objectId: string;
  titulo: string;
  autor: string;
  capaUrl?: string;
};

export function Stock() {
  const [tituloBusca, setTituloBusca] = useState("");
  const [livros, setLivros] = useState<LivroSalvo[]>([]);

  const carregarLivros = async (): Promise<void> => {
    try {
      const livrosSalvos = await buscarLivrosSalvos();
      const livrosCompletos: LivroSalvo[] = livrosSalvos.map((livro) => ({
        objectId: livro.objectId!,
        titulo: livro.titulo,
        autor: livro.autor || "Autor desconhecido",
        capaUrl: livro.capaUrl ?? undefined,
      }));
      setLivros(livrosCompletos);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    }
  };

  const handleDeleteLivro = async (livro: LivroSalvo): Promise<void> => {
    const confirmar = window.confirm(`Deseja realmente deletar "${livro.titulo}"?`);
    if (!confirmar) return;

    try {
      const sucesso = await deleteLivro(livro);
      if (sucesso) {
        await carregarLivros();
      } else {
        alert("Erro ao deletar livro.");
      }
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
      alert("Erro inesperado ao deletar livro.");
    }
  };

  const adicionarLivro = async (): Promise<void> => {
    const titulo = tituloBusca.trim();
    if (!titulo) {
      alert("Digite o título do livro");
      return;
    }

    try {
      const livro = await buscarNaOpenLibrary(titulo);
      if (!livro) {
        alert("Livro não encontrado.");
        return;
      }

      const sucesso = await salvarNoBack4App(livro);
      if (sucesso) {
        setTituloBusca("");
        await carregarLivros();
      } else {
        alert("Erro ao salvar livro.");
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      alert("Erro inesperado ao buscar ou salvar livro.");
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 w-full">

      <div className="flex  items-center gap-2 w-full max-w-[30rem] mb-8 bg-[var(--gray-600)] rounded-lg ">
        <input
          className=" px-4 py-2 rounded w-full"
          value={tituloBusca}
          onChange={(e) => setTituloBusca(e.target.value)}
          placeholder="Digite o título do livro"
        />
        <svg onClick={adicionarLivro} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus cursor-pointer bg-[var(--green-500)] rounded-lg hover:bg-[var(--green-300)] transition-colors"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {livros.map((livro) => (
          <Livro key={livro.objectId} livro={livro} onDelete={() => handleDeleteLivro(livro)} onUpdate={() => { /* Implement update logic here if needed */ }} />
        ))}
      </ul>

      <FloatingButton />
    </div>
  );
}
