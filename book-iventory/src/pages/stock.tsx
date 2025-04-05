import { useEffect, useState } from "react";
import { buscarNaOpenLibrary, salvarNoBack4App, buscarLivrosSalvos } from "../api";
import { Livro } from "../components/Livro";
import { FloatingButton } from "@/components/fab";

export function Stock() {
  const [tituloBusca, setTituloBusca] = useState("");
  const [livros, setLivros] = useState([]);

  async function carregarLivros() {
    const livrosSalvos = await buscarLivrosSalvos();
    setLivros(livrosSalvos);
  }

  async function adicionarLivro() {
    if (!tituloBusca.trim()) {
      alert("Digite o título do livro");
      return;
    }

    const livro = await buscarNaOpenLibrary(tituloBusca);
    if (!livro) {
      alert("Livro não encontrado.");
      return;
    }

    const resultado = await salvarNoBack4App(livro);
    if (resultado) {
      setTituloBusca("");
      carregarLivros();
    }
  }

  useEffect(() => {
    carregarLivros();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl font-bold">Stock</h1>
      <p className="mt-4 text-lg mb-8">Manage your book stock here.</p>

      {/* Área de busca */}
      <div className="flex flex-col items-center gap-2 w-full max-w-xl mb-8">
        <input
          className="border border-gray-300 px-4 py-2 rounded w-full"
          value={tituloBusca}
          onChange={(e) => setTituloBusca(e.target.value)}
          placeholder="Digite o título do livro"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          onClick={adicionarLivro}
        >
          Buscar e Salvar
        </button>
      </div>

      {/* Lista de livros salvos */}
      <ul className="w-full max-w-xl space-y-4">
        {livros.map((livro) => (
          <Livro key={livro.objectId} livro={livro} />
        ))}
      </ul>

      <FloatingButton />
    </div>
  );
}
