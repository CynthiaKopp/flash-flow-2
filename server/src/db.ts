import Database from 'better-sqlite3';
import 'dotenv/config';

const caminhoDb = process.env.DATABASE_URL || './flashcards.db';

export const db = new Database(caminhoDb);

// Cria a tabela de flashcards se ainda nao existir
const criarTabela = `
    CREATE TABLE IF NOT EXISTS flashcards (
        id TEXT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
`;

db.prepare(criarTabela).run();
