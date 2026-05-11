import { CATEGORIAS } from '../tipos';

interface PropsFiltro {
    selecionada: string;
    onSelecionar: (categoria: string) => void;
}

export function FiltroCategorias({ selecionada, onSelecionar }: PropsFiltro) {
    const opcoes = ['', ...CATEGORIAS];

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {opcoes.map(function (categoria) {
                const ativa = categoria === selecionada;
                const rotulo = categoria === '' ? 'Todas' : categoria;

                const classes = ativa
                    ? 'bg-flash-roxo text-white border-flash-roxo'
                    : 'bg-transparent text-flash-texto border-flash-texto hover:border-flash-roxo hover:text-flash-roxo';

                return (
                    <button
                        key={categoria || 'todas'}
                        onClick={() => onSelecionar(categoria)}
                        className={`${classes} text-sm font-semibold px-4 py-2 rounded-full border transition-colors`}
                    >
                        {rotulo}
                    </button>
                );
            })}
        </div>
    );
}
