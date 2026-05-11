/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                flash: {
                    dark: '#1E1E1E',
                    texto: '#E2E2E2',
                    roxo: '#8B5CF6',
                    roxoEscuro: '#6A3FCB',
                    roxoClaro: '#E7DDFF',
                    cardFlipped: '#F8F7FF',
                    slate: '#3F465B',
                },
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
