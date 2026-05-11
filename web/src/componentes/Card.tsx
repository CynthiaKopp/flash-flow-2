import { useState } from 'react';
import type { Flashcard } from '../tipos';

interface PropsCard {
    flashcard: Flashcard;
    onEditar: (flashcard: Flashcard) => void;
    onDeletar: (id: string) => void;
}

export function Card({ flashcard, onEditar, onDeletar }: PropsCard) {
    const [virado, setVirado] = useState(false);

    function virarCard() {
        setVirado(!virado);
    }

    function clicarEditar(evento: React.MouseEvent) {
        evento.stopPropagation();
        onEditar(flashcard);
    }

    function clicarDeletar(evento: React.MouseEvent) {
        evento.stopPropagation();
        if (confirm('Tem certeza que deseja deletar este flashcard?')) {
            onDeletar(flashcard.id);
        }
    }

    const corFundo = virado ? 'bg-flash-cardFlipped' : 'bg-white';
    const corTexto = virado ? 'text-flash-roxoEscuro' : 'text-flash-slate';

    return (
        <div
            onClick={virarCard}
            className={`${corFundo} border-2 border-dashed border-flash-roxo rounded-2xl p-6 min-h-[200px] cursor-pointer flex flex-col justify-between transition-colors`}
        >
            <div>
                <span className="inline-block bg-flash-roxoClaro text-flash-roxoEscuro text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {flashcard.category}
                </span>
                <p className={`${corTexto} text-lg font-medium text-center my-4`}>
                    {virado ? flashcard.answer : flashcard.question}
                </p>
                <p className="text-xs text-flash-slate text-center">
                    {virado ? 'Clique para ver a pergunta' : 'Clique para ver a resposta'}
                </p>
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={clicarEditar}
                    className="flex-1 bg-flash-roxo hover:bg-flash-roxoEscuro text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={clicarDeletar}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
                >
                    Deletar
                </button>
            </div>
        </div>
    );
}
