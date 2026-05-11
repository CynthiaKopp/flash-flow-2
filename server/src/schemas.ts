import { z } from 'zod';
import { CATEGORIAS } from './categorias';

// Validacao para criar ou editar um flashcard.
// Pergunta, resposta e categoria sao obrigatorios.
// A categoria precisa ser uma das pre-definidas.
export const flashcardSchema = z.object({
    question: z.string().trim().min(1, 'A pergunta é obrigatória'),
    answer: z.string().trim().min(1, 'A resposta é obrigatória'),
    category: z.enum(CATEGORIAS, { message: 'Categoria inválida' }),
});

export type FlashcardInput = z.infer<typeof flashcardSchema>;
