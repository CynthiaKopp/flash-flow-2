export interface Flashcard {
    id: string;
    question: string;
    answer: string;
    category: string;
    created_at: string;
}

// As mesmas categorias fixas do back-end
export const CATEGORIAS = ['JavaScript', 'React', 'Tailwind CSS'] as const;

export type Categoria = typeof CATEGORIAS[number];
