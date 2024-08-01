import axios from 'axios';
import { IWS } from './interface';
type IWSS = Partial<IWS>;
export let wsData: Ref<IWSS> = ref({});
export let SocketObject: Ref<WebSocket | undefined> = ref();
export let wsData_delay = ref<number>(Date.now());
export function setSocket(_d: WebSocket) {
    SocketObject.value = _d;
    wsData_delay.value = Date.now();
}
export function setData(_d: IWSS) {
    wsData.value = _d;
}
export * from './interface';
export { axios };
