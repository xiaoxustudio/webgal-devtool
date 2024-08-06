<script lang="ts" setup>
const _res = ref(false);
browser.tabs.query({}).then((_val) => {
    const _current = _val.filter((_val) => _val.active)[0];
    browser.runtime
        .sendMessage({
            tabId: _current.id,
            type: 'check',
        })
        .then((_val) => {
            _res.value = _val?.res ?? false;
        });
});
watch([_res], () => {
    if (_res.value)
        browser.devtools.panels.create('webgal-devtool', 'icon.png', 'devtools-panel.html');
});
</script>

<template></template>

<style scoped></style>
