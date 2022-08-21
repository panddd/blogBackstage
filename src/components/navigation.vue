<template>
    <el-scrollbar>
        <el-menu router :default-openeds="['1', '3']" background-color="rgb(48,65,86)" text-color="#fff"
            style="min-height:100%" active-text-color="#ffd04b">
            <el-menu-item index="/manage">
                <template #title>
                    <el-icon>
                        <HomeFilled />
                    </el-icon>主页
                </template>
            </el-menu-item>
            <el-menu-item index="2">
                <template #title>
                    <el-icon>
                        <Menu />
                    </el-icon>菜单
                </template>
            </el-menu-item>
            <el-menu-item index="/manage/article">
                <template #title>
                    <el-icon>
                        <EditPen />
                    </el-icon>文章管理
                </template>
            </el-menu-item>
            <el-menu-item index="/manage/comment">
                <template #title>
                    <el-icon>
                        <Comment />
                    </el-icon>
                    评论管理
                </template>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
export default {
    name: 'navigation',
    data() {
        return {
            isCollapse: true
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
</style>