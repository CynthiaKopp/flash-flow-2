// Categorias fixas e pre-definidas. Nao tem cadastro de categoria,
// o usuario so consegue escolher uma dessas ao criar um flashcard.
export const CATEGORIAS = ['JavaScript', 'React', 'Tailwind CSS'] as const;

export type Categoria = typeof CATEGORIAS[number];
