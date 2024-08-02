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
        startUrls: ['http://localhost:3001/games/XUI/'],
    },
    manifest: {
        permissions: ['tabs', 'storage'],
        description: '一款用于调试WebGal游戏的浏览器devtools扩展。 - Xuran',
        version: '0.0.1',
        content_scripts: [
            {
                matches: ['<all_urls>'],
                js: ['./content-scripts/content.js'],
                all_frames: true,
            },
        ],
    },
});
