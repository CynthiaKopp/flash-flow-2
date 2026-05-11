import { useState, useEffect } from 'react';
import type { Flashcard } from '../tipos';
import { CATEGORIAS } from '../tipos';
import type { DadosFlashcard } from '../api';

interface PropsForm {
    flashcardEditando: Flashcard | null;
    onSalvar: (dados: DadosFlashcard) => void;
}

export function FormFlashcard({ flashcardEditando, onSalvar }: PropsForm) {
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');
    const [categoria, setCategoria] = useState<string>(CATEGORIAS[0]);

    // Quando estiver editando, preenche os campos com os dados existentes
    useEffect(() => {
        if (flashcardEditando) {
            setPergunta(flashcardEditando.question);
            setResposta(flashcardEditando.answer);
            setCategoria(flashcardEditando.category);
        } else {
            setPergunta('');
            setResposta('');
            setCategoria(CATEGORIAS[0]);
        }
    }, [flashcardEditando]);

    function enviar(evento: React.FormEvent) {
        evento.preventDefault();

        if (pergunta.trim() === '' || resposta.trim() === '') {
            alert('Preencha a pergunta e a resposta');
            return;
        }

        onSalvar({
            question: pergunta.trim(),
            answer: resposta.trim(),
            category: categoria,
        });
    }

    return (
        <form onSubmit={enviar} className="flex flex-col gap-4">
            <div>
                <label htmlFor="pergunta" className="block text-sm font-semibold mb-1">
                    Pergunta
                </label>
                <textarea
                    id="pergunta"
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-flash-roxo"
                    required
                />
            </div>

            <div>
                <label htmlFor="resposta" className="block text-sm font-semibold mb-1">
                    Resposta
                </label>
                <textarea
                    id="resposta"
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-flash-roxo"
                    required
                />
            </div>

            <div>
                <label htmlFor="categoria" className="block text-sm font-semibold mb-1">
                    Categoria
                </label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-flash-roxo"
                >
                    {CATEGORIAS.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="bg-flash-roxo hover:bg-flash-roxoEscuro text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
                Salvar
            </button>
        </form>
    );
}
