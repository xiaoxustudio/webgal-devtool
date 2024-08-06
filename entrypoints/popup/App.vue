<script lang="ts" setup>
const _res = ref(false);
browser.tabs.query({}).then((_val) => {
    const _current = _val.filter((_val) => _val.active)[0];
    browser.runtime
        .sendMessage({
            tabId: _current.id,
            type: 'check',
        })
        .then((_val) => {
            _res.value = _val.res ?? false;
        });
});
</script>

<template>
    <ul class="w-full p-5" v-if="_res">
        <li class="w-full text-center">
            <div class="text-nowrap">开发者控制台找到<b class="text-color">webgal-devtool</b></div>
        </li>
        <li class="w-full text-center"><div class="text-nowrap">打开选项卡</div></li>
    </ul>
    <ul class="w-full p-5" v-if="!_res">
        <li class="w-full text-center">
            <div class="text-nowrap">
                <b>未检测出<b class="text-color">WebGAL</b>应用</b>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.text-color {
    color: #b5495b;
}
</style>
