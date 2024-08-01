<template>
    <div class="px-2">
        <el-collapse accordion>
            <el-collapse-item name="1">
                <template #title>
                    <el-text style="padding: 0 0 0 10px" type="info">场景属性</el-text></template
                >
                <div ref="col1">
                    <el-tree-v2
                        :expand-on-click-node="false"
                        :data="prop.data"
                        :props="prop.props"
                        :height="prop.height"
                    />
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script setup lang="ts">
interface Prop {
    data: any[];
    props: any;
    height: number;
}
const prop = withDefaults(defineProps<Prop>(), {
    data: () => [],
    props: () => {},
    height: 500,
});
</script>
<style scope lang="scss"></style>
