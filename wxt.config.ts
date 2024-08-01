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
    runner: {
        startUrls: [],
    },
    manifest: {
        permissions: ['tabs'],
        description:"一款用于调试WebGal游戏的浏览器devtools扩展。 - Xuran",
        version:"0.0.1",
    },
});
