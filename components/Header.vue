<template>
    <el-menu default-active="1" mode="horizontal" :ellipsis="false">
        <div class="flex items-center justify-center px-2">
            <el-avatar :size="32" shape="square" src="icon.png" />
        </div>
        <div class="flex-grow" />
        <el-menu-item index="1"
            ><RouterLink
                :to="{
                    path: '/home',
                }"
                >首页</RouterLink
            ></el-menu-item
        >
        <el-menu-item index="2"
            ><RouterLink
                :to="{
                    path: '/gameconfig',
                }"
                >配置</RouterLink
            ></el-menu-item
        >
    </el-menu>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<style scope lang="scss"></style>
