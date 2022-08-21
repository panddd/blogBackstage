<template>
    <div class="toolbar">
        <div></div>
        <el-dropdown>
            <el-icon :size="20" style="margin-right: 8px; margin-top: 1px">
                <setting />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="loginQuit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>{{ name }}</span>
    </div>
</template>

<script>
export default {
    name: 'header',
    data() {
        return {
            name: JSON.parse(localStorage.getItem('user')).account
        }
    },
    methods: {
        loginQuit() {
            this.$router.push("/")
            localStorage.removeItem("user");
            this.$message.success("退出成功")
        }
    }
}
</script>

<style scoped>
#body {
    background-color: #545c64;
    color: white;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>