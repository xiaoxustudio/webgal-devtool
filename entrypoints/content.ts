export default defineContentScript({
    matches: ['*://*/*'],
    main() {
        document.addEventListener('visibilitychange', () => {
            // 切换tab检测图标
            browser.runtime.sendMessage({
                type: 'check',
            });
        });

        browser.runtime.onMessage.addListener(async (message: any) => {
            // 检测是否为webgal应用
            switch (message?.type) {
                case 'check':
                    message.res = callCheckWebGal(document);
                    break;
            }
            return message;
        });
    },
});
