<template>
    <el-row justify="space-between" class="w-full">
        <el-col :span="24">
            <el-card>
                <template #header>
                    <el-text type="info">场景面板</el-text>
                </template>
                <el-text
                    >当前URL：<b>{{ _current.url }}</b></el-text
                >
                <div v-if="is_connect">
                    <el-text
                        >当前场景：<b>{{ wsData.sceneMsg?.scene }}</b></el-text
                    >
                    <PlatformPanel :data="wsData.stageSyncMsg?.PerformList"></PlatformPanel>
                </div>
                <template #footer
                    >演出总计：{{ wsData.stageSyncMsg?.PerformList.length ?? 0 }}</template
                >
            </el-card>
        </el-col>
        <el-col :span="24" v-if="is_connect">
            <div class="px-2">
                <el-collapse accordion>
                    <el-collapse-item name="1">
                        <template #title>
                            <el-text style="padding: 0 0 0 10px" type="info"
                                >场景属性</el-text
                            ></template
                        >
                        <div ref="col1">
                            <el-tree-v2
                                :expand-on-click-node="false"
                                :data="Data"
                                :props="props"
                                :height="_height"
                            />
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8">
            <div>
                <el-progress
                    :color="is_connect ? '#00FF00' : '#F57272'"
                    type="dashboard"
                    :percentage="100"
                >
                    <template #default>
                        <div class="flex flex-col">
                            <el-text>{{ Date.now() - wsData_delay }}ms </el-text>
                            <el-text>{{ is_connect ? '已连接' : '未连接' }} </el-text>
                        </div>
                    </template>
                </el-progress>
            </div>
        </el-col>
        <el-col :span="8"></el-col>
    </el-row>
</template>
<script setup lang="ts">
import { ElTreeV2 } from 'element-plus';
import { axios, setData, setSocket, wsData, wsData_delay } from '@/utils';
import PlatformPanel from '@/components/PlatformPanel.vue';
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
    socket.onclose = () => (wsData.value = {});
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
const col1 = ref<HTMLElement>();
const _height = ref(400);
const is_connect = computed(() => Object.keys(wsData.value).length == 4);
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
