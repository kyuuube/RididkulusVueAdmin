<template>
    <div class="page-not-found">
        <div class="fof">
            <h1>Error 404</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-not-found'
};
</script>

<style lang="less">
.page-not-found {
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
    font-family: 'Lato', sans-serif;
    color: #888;
    .fof {
        display: table-cell;
        vertical-align: middle;
    }

    .fof h1 {
        font-size: 50px;
        display: inline-block;
        padding-right: 12px;
        animation: type 0.5s alternate infinite;
    }

    @keyframes type {
        from {
            box-shadow: inset -3px 0px 0px #888;
        }
        to {
            box-shadow: inset -3px 0px 0px transparent;
        }
    }
}
</style>
