import axios from 'axios';
import { IGameConfig } from './interface';
export * from './interface';
type IWSS = Partial<IWS>;
export let wsData: Ref<IWSS> = ref({});
export let SocketObject: Ref<WebSocket | undefined> = ref();
export let wsData_delay = ref<number>(Date.now());
export let GameNetWorkConfig = ref<IConfig>({});
export let GameConfig = ref<IGameConfig>({});
export const _check_webgal_arr = [
    '#Title_enter_page',
    '#Title_white_container',
    '#Title_white_container',
    '#Title_enter_text',
    '#panic-overlay',
    '#ebg',
];

export function callCheckWebGal(_document: Document) {
    return _check_webgal_arr.every((_val) => _document.querySelector(_val) instanceof HTMLElement);
}
export const is_connect = computed(() => Object.keys(wsData.value).length == 4);
// 获取全部tab
export async function getAllTabs() {
    return await browser.tabs.query({});
}
// 获取当前tab
export async function getCurrentTab() {
    const contentScriptTabs = await getAllTabs();
    return contentScriptTabs.filter((tab) => tab.id != null && tab.url != null && tab.active)[0];
}
// 选择dom元素
export function selectElement(_domExp: string = '') {
    browser.devtools.inspectedWindow.eval(`inspect($$(${_domExp})[0])`);
}
export function setSocket(_d?: WebSocket) {
    SocketObject.value = _d;
    wsData_delay.value = Date.now();
}
export function setData(_d: IWSS) {
    wsData.value = _d;
}
export function jump(_val: number) {
    if (SocketObject.value) {
        const msg: IDebugMessage = {
            event: 'message',
            data: {
                command: DebugCommand.JUMP,
                sceneMsg: {
                    scene: wsData.value.sceneMsg?.scene,
                    sentence: _val,
                }, // @ts-ignore
                stageSyncMsg: wsData.value.stageSyncMsg,
                message: 'exp',
                self: true,
            },
        };
        SocketObject.value.send(JSON.stringify(msg));
    }
}
export function exec_cmd(e: string) {
    if (SocketObject.value) {
        const msg: IDebugMessage = {
            event: 'message',
            data: {
                command: DebugCommand.EXE_COMMAND,
                sceneMsg: {
                    scene: wsData.value.sceneMsg?.scene,
                    sentence: 1,
                },
                stageSyncMsg: {},
                message: e,
                self: true,
            },
        };
        SocketObject.value.send(JSON.stringify(msg));
    }
}
export function syncfc() {
    if (SocketObject.value) {
        const message: IDebugMessage = {
            event: 'message',
            data: {
                command: DebugCommand.SYNCFC,
                sceneMsg: {
                    scene: wsData.value.sceneMsg?.scene,
                    sentence: wsData.value.sceneMsg?.sentence,
                },
                stageSyncMsg: wsData.value.stageSyncMsg,
                message: 'sync',
                self: true,
            },
        };
        SocketObject.value.send(JSON.stringify(message));
    }
}
export async function UpdateGetGameConfig(): Promise<void> {
    const _data = (
        await axios.get(`http://${GameNetWorkConfig.value.url}/api/manageGame/getGameConfig/XUI`)
    ).data as string;
    const _list: Record<string, any> = {};
    for (let i of _data.split('\n')) {
        const _reg = i.match(/((?<!\:).+)\s*:\s*(.+?);/);
        if (_reg) {
            let _name = _reg[1];
            let _val = _reg[2];
            _list[_name] = _val;
        }
    }
    GameConfig.value = _list;
}
export { axios };
