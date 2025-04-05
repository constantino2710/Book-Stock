export function Livro({ livro }) {
    return (
      <li style={{ marginBottom: "20px", listStyle: "none" }}>
        <strong>{livro.titulo}</strong> <br />
        <em>{livro.autor}</em> <br />
        {livro.capaUrl ? (
          <img src={livro.capaUrl} alt={`Capa de ${livro.titulo}`} width={120} />
        ) : (
          <p>[Sem capa]</p>
        )}
      </li>
    );
  }