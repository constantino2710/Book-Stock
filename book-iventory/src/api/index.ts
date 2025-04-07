import axios, { AxiosError } from "axios";

const APP_ID = "F6Ech2daLngR5vCfAcg0DBiVPvJQhtoTjl1nFgRP";
const API_KEY = "SMnFT6VAbg3jfdaTF9vybTVQ9NAFim3kqE0kFLaK";

const BACK4APP_URL = "https://parseapi.back4app.com/classes/Livro";

const headers = {
  "X-Parse-Application-Id": APP_ID,
  "X-Parse-REST-API-Key": API_KEY,
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

export interface Livro {
  objectId?: string;
  titulo: string;
  autor: string;
  capaUrl?: string | null;
}

interface OpenLibraryDoc {
  title: string;
  author_name?: string[];
  cover_i?: number;
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[];
}

// Buscar na Open Library
export const buscarNaOpenLibrary = async (titulo: string): Promise<Livro | null> => {
  try {
    const response = await axios.get<OpenLibraryResponse>(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`
    );
    const data = response.data;

    if (!data.docs.length) return null;

    const livro = data.docs[0];

    return {
      titulo: livro.title,
      autor: livro.author_name?.join(", ") || "Autor desconhecido",
      capaUrl: livro.cover_i
        ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
        : null,
    };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar livro:", err.message);
    return null;
  }
};

// Salvar no Back4App
export const salvarNoBack4App = async (livro: Livro): Promise<Livro | null> => {
  try {
    const response = await axios.post(BACK4APP_URL, livro, { headers: headersJson });
    if (response.status === 201) {
      return { ...livro, ...response.data };
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao salvar no Back4App:", err.message);
  }
  return null;
};

// Buscar livros salvos
export const buscarLivrosSalvos = async (): Promise<Livro[]> => {
  try {
    const response = await axios.get<{ results: Livro[] }>(BACK4APP_URL, { headers });
    if (response.status === 200) {
      return response.data.results;
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao buscar livros:", err.message);
  }
  return [];
};

// Deletar livro
export const deleteLivro = async (livro: Livro): Promise<unknown | null> => {
  if (!livro.objectId) return null;

  try {
    const response = await axios.delete(`${BACK4APP_URL}/${livro.objectId}`, { headers });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao deletar livro:", err.message);
  }
  return null;
};

export const atualizarLivro = async (
  objectId: string,
  dadosAtualizados: { titulo: string; autor: string }
): Promise<boolean> => {
  try {
    const response = await axios.put(
      `${BACK4APP_URL}/${objectId}`,
      dadosAtualizados,
      { headers: headersJson }
    );

    return response.status === 200;
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao atualizar livro:", err.message);
    return false;
  }
};

export const adicionarLivroManual = async (
  dados: { titulo: string; autor: string; capaUrl?: string }
): Promise<Livro | null> => {
  try {
    const response = await axios.post(BACK4APP_URL, dados, {
      headers: headersJson,
    });

    if (response.status === 201) {
      return { ...dados, ...response.data };
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Erro ao adicionar livro manualmente:", err.message);
  }
  return null;
};
