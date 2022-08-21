<template>
    <el-container class="layout-container-demo">

        <el-aside width="200px" style="min-height:100vh">
            <navigation></navigation>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <Header></Header>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
import Navigation from '../components/navigation.vue'
import Header from '../components/haeder.vue'
export default {
    name: 'manage',
    components: { Navigation, Header }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.layout-container-demo .el-header {
    position: relative;
    background-color: #fff;
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: rgb(48, 65, 86);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
}

.toolbar {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}


.el-aside {
    overflow: auto;
}

.el-container {
    overflow: hidden;
}

.el-scrollbar__view {
    border-right: none;
}

.el-menu .el-menu--vertical {
    border: 0;
}

.title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
}
</style>