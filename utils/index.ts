import axios from 'axios';
import { IWS } from './interface';
type IWSS = Partial<IWS>;
export let wsData: Ref<IWSS> = ref({});
export let SocketObject: Ref<WebSocket | undefined> = ref();
export let wsData_delay = ref<number>(Date.now());
export const is_connect = computed(() => Object.keys(wsData.value).length == 4);
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
                stageSyncMsg: {},
                message: '徐然',
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
                    sentence: wsData.value.sceneMsg?.sentence,
                },
                stageSyncMsg: {},
                message: e,
            },
        };
        SocketObject.value.send(JSON.stringify(msg));
    }
}
export * from './interface';
export { axios };
