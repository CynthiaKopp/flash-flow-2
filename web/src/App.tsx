import { useState, useEffect } from 'react';
import type { Flashcard } from './tipos';
import {
    listarFlashcards,
    criarFlashcard,
    editarFlashcard,
    deletarFlashcard,
    type DadosFlashcard,
} from './api';
import { Card } from './componentes/Card';
import { FiltroCategorias } from './componentes/FiltroCategorias';
import { Modal } from './componentes/Modal';
import { FormFlashcard } from './componentes/FormFlashcard';

export function App() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [editando, setEditando] = useState<Flashcard | null>(null);
    const [carregando, setCarregando] = useState(true);

    // Carrega os flashcards toda vez que o filtro muda
    useEffect(() => {
        async function carregar() {
            setCarregando(true);
            try {
                const lista = await listarFlashcards(categoriaFiltro);
                setFlashcards(lista);
            } catch (erro) {
                alert('Erro ao carregar flashcards. Verifique se o servidor está rodando.');
                console.error(erro);
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [categoriaFiltro]);

    function abrirModalCriar() {
        setEditando(null);
        setModalAberto(true);
    }

    function abrirModalEditar(flashcard: Flashcard) {
        setEditando(flashcard);
        setModalAberto(true);
    }

    function fecharModal() {
        setModalAberto(false);
        setEditando(null);
    }

    async function salvar(dados: DadosFlashcard) {
        try {
            if (editando) {
                const atualizado = await editarFlashcard(editando.id, dados);
                // Se editou e o filtro nao bate mais, remove da lista; senao atualiza
                if (categoriaFiltro && atualizado.category !== categoriaFiltro) {
                    setFlashcards(flashcards.filter((f) => f.id !== atualizado.id));
                } else {
                    setFlashcards(flashcards.map((f) => (f.id === atualizado.id ? atualizado : f)));
                }
            } else {
                const novo = await criarFlashcard(dados);
                // Se tem filtro ativo e a categoria do novo card nao bate, nao mostra
                if (!categoriaFiltro || novo.category === categoriaFiltro) {
                    setFlashcards([novo, ...flashcards]);
                }
            }
            fecharModal();
        } catch (erro) {
            const mensagem = erro instanceof Error ? erro.message : 'Erro ao salvar';
            alert(mensagem);
        }
    }

    async function deletar(id: string) {
        try {
            await deletarFlashcard(id);
            setFlashcards(flashcards.filter((f) => f.id !== id));
        } catch (erro) {
            const mensagem = erro instanceof Error ? erro.message : 'Erro ao deletar';
            alert(mensagem);
        }
    }

    return (
        <div className="min-h-screen bg-flash-dark text-white">
            <header className="text-center py-10 px-4">
                <h1 className="font-sora text-4xl md:text-5xl font-bold mb-2">
                    FlashFlow <span className="text-flash-roxo">2.0</span>
                </h1>
                <p className="text-flash-texto text-base">
                    Crie e estude seus flashcards
                </p>
            </header>

            <main className="max-w-5xl mx-auto px-4 pb-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <FiltroCategorias
                        selecionada={categoriaFiltro}
                        onSelecionar={setCategoriaFiltro}
                    />
                    <button
                        onClick={abrirModalCriar}
                        className="bg-flash-roxo hover:bg-flash-roxoEscuro text-white font-semibold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                    >
                        + Novo flashcard
                    </button>
                </div>

                {carregando && (
                    <p className="text-flash-texto text-center py-10">Carregando...</p>
                )}

                {!carregando && flashcards.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-flash-texto text-lg mb-2">
                            Nenhum flashcard por aqui ainda.
                        </p>
                        <p className="text-flash-texto text-sm">
                            Clique em "+ Novo flashcard" pra começar!
                        </p>
                    </div>
                )}

                {!carregando && flashcards.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {flashcards.map((flashcard) => (
                            <Card
                                key={flashcard.id}
                                flashcard={flashcard}
                                onEditar={abrirModalEditar}
                                onDeletar={deletar}
                            />
                        ))}
                    </div>
                )}
            </main>

            <Modal
                titulo={editando ? 'Editar flashcard' : 'Novo flashcard'}
                aberto={modalAberto}
                onFechar={fecharModal}
            >
                <FormFlashcard flashcardEditando={editando} onSalvar={salvar} />
            </Modal>

            <footer className="text-center text-flash-texto text-sm pb-6">
                FlashFlow 2.0 — Desafio Fase 3
            </footer>
        </div>
    );
}
