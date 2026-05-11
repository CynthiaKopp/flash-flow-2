import type { Flashcard } from './tipos';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

export interface DadosFlashcard {
    question: string;
    answer: string;
    category: string;
}

// Lista todos os flashcards. Se passar uma categoria, filtra por ela.
export async function listarFlashcards(categoria?: string): Promise<Flashcard[]> {
    let url = `${API_URL}/flashcards`;

    if (categoria) {
        url += `?category=${encodeURIComponent(categoria)}`;
    }

    const resposta = await fetch(url);

    if (!resposta.ok) {
        throw new Error('Não foi possível carregar os flashcards');
    }

    return resposta.json();
}

// Cria um novo flashcard
export async function criarFlashcard(dados: DadosFlashcard): Promise<Flashcard> {
    const resposta = await fetch(`${API_URL}/flashcards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    const corpo = await resposta.json();

    if (!resposta.ok) {
        throw new Error(corpo.erro || 'Erro ao criar flashcard');
    }

    return corpo;
}

// Edita um flashcard existente
export async function editarFlashcard(id: string, dados: DadosFlashcard): Promise<Flashcard> {
    const resposta = await fetch(`${API_URL}/flashcards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    });

    const corpo = await resposta.json();

    if (!resposta.ok) {
        throw new Error(corpo.erro || 'Erro ao editar flashcard');
    }

    return corpo;
}

// Deleta um flashcard
export async function deletarFlashcard(id: string): Promise<void> {
    const resposta = await fetch(`${API_URL}/flashcards/${id}`, {
        method: 'DELETE',
    });

    if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => ({}));
        throw new Error(corpo.erro || 'Erro ao deletar flashcard');
    }
}
