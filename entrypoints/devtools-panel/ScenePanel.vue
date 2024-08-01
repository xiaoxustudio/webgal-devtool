<template>
    <el-card>
        <template #header>
            <el-text type="info">场景面板</el-text>
        </template>
        <el-text
            >当前URL：<b>{{ prop.current.url }}</b></el-text
        >
        <div v-if="is_connect">
            <el-text
                >当前场景：<b>{{ wsData.sceneMsg?.scene }}</b></el-text
            >
            <PlatformPanel :data="wsData.stageSyncMsg?.PerformList"></PlatformPanel>
        </div>
        <template #footer>演出总计：{{ wsData.stageSyncMsg?.PerformList.length ?? 0 }}</template>
    </el-card>
</template>
<script setup lang="ts">
import PlatformPanel from '@/components/PlatformPanel.vue';
interface Prop {
    current: any;
}
const prop = withDefaults(defineProps<Prop>(), {
    current: () => {},
});
</script>
<style scope lang="scss"></style>
