import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { db } from '../db';
import { flashcardSchema } from '../schemas';

export const flashcardsRouter = Router();

// Lista todos os flashcards. Pode receber ?category=React para filtrar.
flashcardsRouter.get('/', (req, res) => {
    const categoria = req.query.category;

    if (typeof categoria === 'string' && categoria.length > 0) {
        const flashcards = db
            .prepare('SELECT * FROM flashcards WHERE category = ? ORDER BY created_at DESC')
            .all(categoria);
        return res.json(flashcards);
    }

    const flashcards = db
        .prepare('SELECT * FROM flashcards ORDER BY created_at DESC')
        .all();
    return res.json(flashcards);
});

// Cria um flashcard novo
flashcardsRouter.post('/', (req, res) => {
    const resultado = flashcardSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({ erro: resultado.error.issues[0].message });
    }

    const { question, answer, category } = resultado.data;
    const id = randomUUID();
    const created_at = new Date().toISOString();

    db.prepare(
        'INSERT INTO flashcards (id, question, answer, category, created_at) VALUES (?, ?, ?, ?, ?)'
    ).run(id, question, answer, category, created_at);

    const novoFlashcard = db
        .prepare('SELECT * FROM flashcards WHERE id = ?')
        .get(id);

    return res.status(201).json(novoFlashcard);
});

// Edita um flashcard existente
flashcardsRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    const flashcardExistente = db
        .prepare('SELECT * FROM flashcards WHERE id = ?')
        .get(id);

    if (!flashcardExistente) {
        return res.status(404).json({ erro: 'Flashcard não encontrado' });
    }

    const resultado = flashcardSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({ erro: resultado.error.issues[0].message });
    }

    const { question, answer, category } = resultado.data;

    db.prepare(
        'UPDATE flashcards SET question = ?, answer = ?, category = ? WHERE id = ?'
    ).run(question, answer, category, id);

    const flashcardAtualizado = db
        .prepare('SELECT * FROM flashcards WHERE id = ?')
        .get(id);

    return res.json(flashcardAtualizado);
});

// Deleta um flashcard
flashcardsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    const flashcardExistente = db
        .prepare('SELECT * FROM flashcards WHERE id = ?')
        .get(id);

    if (!flashcardExistente) {
        return res.status(404).json({ erro: 'Flashcard não encontrado' });
    }

    db.prepare('DELETE FROM flashcards WHERE id = ?').run(id);

    return res.status(204).send();
});
