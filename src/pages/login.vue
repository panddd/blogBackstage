<template>
    <div id="bigBox">
        <div class="main">
            <p style="margin-top:20px">登录</p>
            <!-- 账号输入框 -->
            <el-input class="input" v-model="form.account" placeholder="请输入账号" clearable>
                <template #prefix>
                    <el-icon :size="25">
                        <Avatar />
                    </el-icon>
                </template>
            </el-input>
            <!-- 密码输入框 -->
            <el-input class="input" v-model="form.password" type="password" placeholder="密码" show-password clearable>
                <template #prefix>
                    <el-icon :size="25">
                        <Lock />
                    </el-icon>
                </template>
            </el-input>
            <!-- 登录按钮 -->
            <div>
                <el-button class="btn" @click="Login" type="success">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { login } from '../api/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const form = ref({ account: 'user', password: '123456789' })

function Login() {
    login(form.value).then(res => {
        if (res.code === 1) {
            localStorage.setItem("user", JSON.stringify(res.data))  //存储用户信息
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            router.push('/manage')
        } else {
            ElMessage({
                message: '登录失败' + ',' + res.msg,
                type: 'error',
            })
            console.log(form.value);
        }
    })
}

</script>

<style scoped>
#bigBox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%);
}

.main {
    width: 500px;
    height: 350px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px
}

p {
    font-family: "微软雅黑", "黑体", "宋体";
    font-size: 30px;
}

.input {
    width: 400px;
    height: 40px;
}

.btn {
    width: 120px;
    margin-top: 20px;
}
</style>