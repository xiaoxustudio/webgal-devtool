<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
</script>

<template>
    <Suspense>
        <div>
            <Header></Header>
            <RouterView :key="Date.now() + Math.random()" v-slot="{ Component }">
                <KeepAlive>
                    <component :is="Component"></component>
                </KeepAlive>
            </RouterView>
        </div>
    </Suspense>
</template>

<style lang="scss" scoped></style>
