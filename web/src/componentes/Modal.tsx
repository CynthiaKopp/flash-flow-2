import type { ReactNode } from 'react';

interface PropsModal {
    titulo: string;
    aberto: boolean;
    onFechar: () => void;
    children: ReactNode;
}

export function Modal({ titulo, aberto, onFechar, children }: PropsModal) {
    if (!aberto) {
        return null;
    }

    function clicarFundo(evento: React.MouseEvent) {
        if (evento.target === evento.currentTarget) {
            onFechar();
        }
    }

    return (
        <div
            onClick={clicarFundo}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        >
            <div className="bg-white text-flash-slate rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onFechar}
                    className="absolute top-3 right-4 text-2xl text-flash-slate hover:text-flash-roxoEscuro"
                    aria-label="Fechar"
                >
                    &times;
                </button>
                <h2 className="font-sora text-xl font-bold mb-4 text-flash-roxoEscuro">
                    {titulo}
                </h2>
                {children}
            </div>
        </div>
    );
}
