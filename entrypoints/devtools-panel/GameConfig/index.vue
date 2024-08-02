<template>
    <el-descriptions :column="1" border>
        <el-descriptions-item :key="index + item.label" v-for="(item, index) in _data">
            <template #label>
                <el-text>{{ item.label }}</el-text>
            </template>
            <el-text>{{ item.value }}</el-text>
        </el-descriptions-item>
    </el-descriptions>
</template>
<script setup lang="ts">
const _data = computed(() =>
    Object.keys(GameConfig.value).map((_val) => {
        return {
            value: GameConfig.value[_val],
            label: _val,
            children: [],
        };
    }),
);
</script>
<style scope lang="scss"></style>
