import axios from "axios";

const APP_ID = "F6Ech2daLngR5vCfAcg0DBiVPvJQhtoTjl1nFgRP";
const API_KEY = "SMnFT6VAbg3jfdaTF9vybTVQ9NAFim3kqE0kFLaK";

const BACK4APP_URL = "https://parseapi.back4app.com/classes/Livro"; // mesmo endpoint do primeiro código

const headers = {
  "X-Parse-Application-Id": APP_ID,
  "X-Parse-REST-API-Key": API_KEY,
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

// 🔍 Buscar na Open Library
export const buscarNaOpenLibrary = async (titulo) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`);
    const data = response.data;

    if (!data.docs.length) throw new Error("Livro não encontrado!");

    const livro = data.docs[0];

    return {
      titulo: livro.title,
      autor: (livro.author_name && livro.author_name.join(", ")) || "Autor desconhecido",
      capaUrl: livro.cover_i
        ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
        : null,
    };
  } catch (error) {
    console.error("Erro ao buscar livro:", error.message);
    return null;
  }
};

// 💾 Salvar no Back4App
export const salvarNoBack4App = async (livro) => {
  try {
    const response = await axios.post(BACK4APP_URL, livro, {
      headers: headersJson,
    });

    if (response.status === 201) {
      return { ...livro, ...response.data };
    } else {
      console.log("Erro ao salvar no Back4App:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao salvar no Back4App:", error.message);
  }
  return null;
};

// 📚 Buscar livros salvos no Back4App
export const buscarLivrosSalvos = async () => {
  try {
    const response = await axios.get(BACK4APP_URL, {
      headers: headers,
    });

    if (response.status === 200) {
      return response.data.results;
    } else {
      console.log("Erro ao buscar livros:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao buscar livros:", error.message);
  }
  return [];
};

export async function deleteLivro(Livro) {
  try {
    const response = await axios.delete(`${BACK4APP_URL}/${Livro.objectId}`, {
      headers: headers,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log("deleteLivro status:", response.status);
      console.log("deleteLivro statusText:", response.statusText);
    }
  } catch (err) {
    console.log("deleteLivro err:", err);
  }
  return null;
}
