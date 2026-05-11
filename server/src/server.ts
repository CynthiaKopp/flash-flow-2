import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { flashcardsRouter } from './routes/flashcards';
import { CATEGORIAS } from './categorias';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint pra retornar as categorias fixas
app.get('/categorias', (_req, res) => {
    res.json(CATEGORIAS);
});

app.use('/flashcards', flashcardsRouter);

const porta = Number(process.env.PORT) || 3333;

app.listen(porta, () => {
    console.log(`API rodando em http://localhost:${porta}`);
});
