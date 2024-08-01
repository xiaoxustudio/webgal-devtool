<template>
    <el-row justify="space-between" class="w-full">
        <el-col :span="24"> <ScenePanel :current="_current"></ScenePanel></el-col>
        <el-col :span="24" v-if="is_connect">
            <SceneProp :data="Data" :props="props" :height="500"></SceneProp>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"><ConnectPanel></ConnectPanel></el-col>
        <el-col :span="8"></el-col>
    </el-row>
</template>
<script setup lang="ts">
import { setData, setSocket, wsData, is_connect } from '@/utils';
import SceneProp from './SceneProp.vue';
import ConnectPanel from './ConnectPanel.vue';
import ScenePanel from './ScenePanel.vue';
const port: string = '80';
const manifest = await browser.windows.getCurrent({ populate: true });
const _current = manifest.tabs!.find((val) => val.active)!;
const protocol = _current.url?.substring(0, _current.url?.indexOf('//'));
const loc = _current.url?.match(/\/\/([^/]*)\//)![1];
const init = () => {
    let defaultPort = '';
    if (port && port !== '80' && port !== '443') {
        defaultPort = `:${port}`;
    }
    if (protocol !== 'http:' && protocol !== 'https:') {
        return;
    }
    let wsUrl = `ws://${loc}${defaultPort}/api/webgalsync`;
    if (protocol === 'https:') {
        wsUrl = `wss://${loc}${defaultPort}/api/webgalsync`;
    }

    const socket = new WebSocket(wsUrl);
    socket.onopen = () => {
        socket.send('已建立连接');
    };
    socket.onmessage = (e) => {
        let data = JSON.parse(e.data);
        setData(data.data);
    };
    socket.onclose = () => {
        wsData.value = {};
        setSocket();
    };
    return socket;
};
const createData = function (_wsData: Record<string, any>, deep = 1): Array<any> {
    let _arr = [];
    let index = 0;
    let _keys = Object.keys(_wsData);
    for (let i in _keys) {
        let _ins = {
            id: i + deep,
            label: `${_keys[i]}${
                typeof _wsData[_keys[i]] !== 'object' ? ' : ' + _wsData[_keys[i]] : ''
            }`,
            children:
                typeof _wsData[_keys[i]] === 'object'
                    ? createData(_wsData[_keys[i]], deep + 1)
                    : undefined,
        };
        index++;
        _arr.push(_ins);
    }
    return _arr;
};
const Data = computed(() => createData(wsData.value));
const props = {
    value: 'id',
    label: 'label',
    children: 'children',
};
setSocket(init()!);
onMounted(() => {
    // axios
    // 	.get(`${protocol}//${loc}/games/XUI/game/scene/start.txt`)
    // 	.then((data) => {
    // 		console.log(data.data);
    // 	});
});
</script>
<style scope lang="scss"></style>
