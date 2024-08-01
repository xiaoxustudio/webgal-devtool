<script lang="ts" setup>
import Content from './Content.vue';
import Header from '@/components/Header.vue';
</script>

<template>
    <Suspense>
        <div>
            <Header></Header>
            <Content />
        </div>
    </Suspense>
</template>

<style lang="scss" scoped></style>
