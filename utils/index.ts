import axios from "axios";
import { IWS } from "./interface";
type IWSS = Partial<IWS>;
export let wsData: Ref<IWSS> = ref({});
export let SocketObject: Ref<WebSocket | undefined> = ref();
export function setSocket(_d: WebSocket) {
	SocketObject.value = _d;
}
export function setData(_d: IWSS) {
	wsData.value = _d;
}
export * from "./interface";
export { axios };
