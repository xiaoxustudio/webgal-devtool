/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './entrypoints/**/index.html',
        './entrypoints/**/*.{vue,js,ts,jsx,tsx}',
        './components/**/*.{vue,js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {},
    },

    plugins: [],
};
