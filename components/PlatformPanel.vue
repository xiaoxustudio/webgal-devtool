<template>
    <div class="flex w-full items-center justify-center">
        <el-descriptions
            :column="3"
            :title="`演出 ${index}`"
            :key="index"
            v-for="(item, index) in prop.data"
        >
            <el-descriptions-item>
                <template #default>
                    <div><el-text style="color: #333" :size="size">ID</el-text></div>
                    <div>
                        <el-text :size="size_content">{{ item.id }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #default>
                    <div><el-text style="color: #333" :size="size">演出类型</el-text></div>
                    <div>
                        <el-text :size="size_content">{{ item.isHoldOn }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #default>
                    <div><el-text style="color: #333" :size="size">演出携带子场景</el-text></div>
                    <div>
                        <el-text :size="size_content">{{ item.script.subScene.length }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #default>
                    <div><el-text style="color: #333" :size="size">演出脚本</el-text></div>
                    <div>
                        <el-text :size="size_content">{{ item.script.command }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #default>
                    <div><el-text style="color: #333" :size="size">原始内容</el-text></div>
                    <div>
                        <el-text :size="size_content">{{ item.script.commandRaw ?? '' }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #default>
                    <div><el-text style="color: #333" :size="size">语句内容</el-text></div>
                    <div class="w-10">
                        <el-text :size="size_content">{{ item.script.content }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script setup lang="ts">
interface _Prop {
    data: Array<IRunPerform>;
}
const prop = withDefaults(defineProps<_Prop>(), {
    data: () => [] as IRunPerform[],
});
const size = 'medium';
const size_content = 'small';
</script>
<style scope lang="scss"></style>
