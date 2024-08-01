import { defineConfig } from 'wxt';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// See https://wxt.dev/api/config.html
export default defineConfig({
    modules: ['@wxt-dev/module-vue'],
    vite: () => {
        return {
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: "@import 'styles/global.scss';",
                    },
                },
                postcss: {
                    plugins: [tailwindcss, autoprefixer],
                },
            },
        };
    },
    runner: {},
    manifest: {
        permissions: ['tabs'],
    },
});
