export default defineBackground(() => {
    browser.runtime.onInstalled.addListener(({ reason }) => {
        if (reason === 'install') {
            browser.storage.local.set({ installDate: Date.now() });
        }
    });
    async function handleMessage(request: any, sender: any, sendResponse: any) {
        let message: Record<string, any> = request;
        const allTabs = await browser.tabs.query({});
        let _tabCurrent = allTabs.filter((_val) => _val.id === message?.tabId || _val.active)[0];
        let _tabCurrent_real = allTabs.filter((_val) => _val.active)[0];
        try {
            message = await browser.tabs.sendMessage(_tabCurrent.id!, message);
        } catch {}
        switch (message?.type) {
            case 'uninstall':
                if (message.value == false) browser.management.uninstallSelf();
                break;
            case 'check':
                try {
                    const _res = message?.res ?? false;
                    browser.action.setIcon({
                        path: {
                            '16': 'no/16.png',
                            '32': 'no/32.png',
                            '48': 'no/48.png',
                            '96': 'no/96.png',
                            '128': 'no/128.png',
                        },
                    });
                    if (_res && _tabCurrent.id == _tabCurrent_real.id) {
                        browser.action.setIcon({
                            path: {
                                '16': 'icon/16.png',
                                '32': 'icon/32.png',
                                '48': 'icon/48.png',
                                '96': 'icon/96.png',
                                '128': 'icon/128.png',
                            },
                        });
                    }
                } catch {}
                break;
            default:
                return await browser.tabs.sendMessage(_tabCurrent.id!, message);
        }
        return message;
    }
    browser.runtime.onMessage.addListener(handleMessage);
    console.log('WebGal DevTool Start !');
});
