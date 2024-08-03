<template>
    <div class="flex w-full flex-col">
        <el-row>
            <el-col :span="24">
                <el-text
                    >当前执行到脚本行：<el-input-number
                        size="small"
                        v-model="_sentence_number"
                        @change="handleChange"
                /></el-text>
            </el-col>
        </el-row>
        <el-descriptions
            :column="3"
            :title="`演出 ${index + 1}`"
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
                        <el-text :size="size_content"
                            >{{ item.script.command }}({{
                                transitionCommand(item.script.command)
                            }})</el-text
                        >
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
                    <div class="w-full">
                        <el-text :size="size_content">{{ item.script.content }}</el-text>
                    </div>
                </template>
                <template #label> </template>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script setup lang="ts">
import { jump, wsData } from '@/utils';
interface _Prop {
    data: Array<IRunPerform>;
}
const prop = withDefaults(defineProps<_Prop>(), {
    data: () => [] as IRunPerform[],
});
const _sentence_number = ref(wsData.value.sceneMsg?.sentence ?? 0);
watch([wsData], () => (_sentence_number.value = wsData.value.sceneMsg?.sentence));
const handleChange = (_val: number) => {
    jump(_val);
};
const size = '';
const size_content = 'small';
</script>
<style scope lang="scss"></style>
