<template>
    <div class="w-full px-2">
        <el-row>
            <el-col
                :span="24"
                :key="key"
                v-for="(item, key) in wsData.stageSyncMsg?.GameVar"
                class="cursor-pointer p-2 duration-200 hover:bg-gray-200"
            >
                <el-text :size="_size">{{ key }}</el-text>
                <el-text :size="_size">:</el-text>
                <div class="flex flex-row justify-between">
                    <el-text :style="{ PointerEvent: 'all' }" :size="_size">{{ item }}</el-text>
                    <el-button
                        v-if="(!_is_change && _change.key == key) || _change.key == ''"
                        @click="handleClick(key, item)"
                        >修改</el-button
                    >
                    <el-input
                        class="w-1/2"
                        v-if="_is_change && _change.key == key"
                        @blur="handleSave"
                        v-model="_change.value"
                    ></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';

const _size = 'large';
const _is_change = ref(false);
const _change = ref({ value: '', key: '' });
const handleClick = (_key: any, _val: any) => {
    _is_change.value = true;
    _change.value.value = _val;
    _change.value.key = _key;
};
const handleSave = () => {
    _is_change.value = false;
    ElMessageBox.confirm(`是否修改变量${_change.value.key} 为 ${_change.value.value}`, '', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        type: 'info',
    })
        .then(() => {
            ElMessage({
                type: 'success',
                message: '修改成功',
            });
            exec_cmd(`setVar:${_change.value.key}=${_change.value.value};`);
            _change.value = { value: '', key: '' };
        })
        .catch(() => {});
};
</script>
<style scope lang="scss"></style>
