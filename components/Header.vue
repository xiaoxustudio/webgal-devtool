<template>
    <el-menu class="h-10 mb-4" default-active="/home" mode="horizontal" :ellipsis="false" router>
        <div class="flex items-center justify-center px-2">
            <el-avatar :size="32" shape="square" :src="is_connect ? 'icon.png' : 'no.png'" />
        </div>
        <div class="flex-grow" />
        <el-menu-item index="/home" v-if="is_connect">首页</el-menu-item>
        <el-menu-item index="/gameconfig" v-if="is_connect">配置</el-menu-item>
        <el-menu-item index="/variable" v-if="is_connect">变量</el-menu-item>
    </el-menu>
</template>
<script setup lang="ts"></script>
<style scope lang="scss"></style>
