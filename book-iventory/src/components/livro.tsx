import { deleteLivro } from "@/api";

export function Livro({ livro, onDelete }) {
  const handleDelete = async () => {
    const confirmado = window.confirm(`Tem certeza que deseja excluir "${livro.titulo}"?`);
    if (!confirmado) return;

    const resultado = await deleteLivro(livro);
    if (resultado) {
      onDelete(); // Atualiza a lista no componente pai
    } else {
      alert("Erro ao excluir o livro.");
    }
  };

  return (
    <li className="flex justify-between items-center bg-white shadow-md rounded p-4">
      <div className="flex items-center gap-4">
        {livro.capaUrl && (
          <img
            src={livro.capaUrl}
            alt={`Capa do livro ${livro.titulo}`}
            className="w-16 h-24 object-cover rounded"
          />
        )}
        <div className="flex flex-col">
          <span className="font-semibold">{livro.titulo}</span>
          <span className="text-sm text-gray-500">{livro.autor}</span>
        </div>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 text-xl font-bold px-2 hover:text-red-700 transition"
        title="Excluir livro"
      >
        ×
      </button>
    </li>
  );
}