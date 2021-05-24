<template>
    <el-main class="layout-content">
        <slot></slot>
    </el-main>
</template>

<script>
export default {
    name: 'layout-content'
};
</script>

<style lang="less">
.layout-content {
    background: #f0f2f5;
    padding: 0;
    height: calc(100vh - 60px);
}

.layout-content::-webkit-scrollbar {
    display: none;
}
</style>
