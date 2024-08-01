<template>
    <div class="w-full text-center">
        <el-progress :color="is_connect ? '#00FF00' : '#F57272'" type="dashboard" :percentage="100">
            <template #default>
                <div class="flex flex-col">
                    <el-text>{{ Date.now() - wsData_delay }}ms </el-text>
                    <el-text>{{ is_connect ? '已连接' : '未连接' }} </el-text>
                </div>
            </template>
        </el-progress>
    </div>
</template>
<script setup lang="ts">
import { is_connect } from '@/utils';
</script>
<style scope lang="scss"></style>
