<template>
  <div class="app-container">
    <div class="login-container">
      <h2>欢迎使用搜题系统</h2>
      <el-form ref="Form" :model="loginForm" label-width="60px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" placeholder="请输入邮箱" type="email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <password-input v-model="loginForm.password"></password-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
        <div class="extra-links">
          <router-link to="/register">注册账号</router-link>
          <router-link to="/forgot-password">忘记密码</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import PasswordInput from "@/pages/user/PasswordInput.vue";
import { reactive, ref, getCurrentInstance } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

let loginForm = reactive({
  email: "",
  password: "",
})

const router = useRouter();
const Form = ref(null)
const submitForm = () => {
 
  Form.value.validate((valid) => {
    
    if (!valid) return false;
    
    axios.post('/user/login/',{
      email: loginForm.email,
      password: loginForm.password
    }).then(data => {
      showMessage(data)
      if (data.code === 200) {
        router.replace({ path: '/index' })
      }

    })
  });
}

</script>

<style scoped>
.app-container {
  background: url('https://th.bing.com/th?id=OIP.VPX2HZTUr5eckwJGBtxEegHaDe&w=350&h=164&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2') no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #3F51B5;
}

.el-form-item label {
  color: #3F51B5;
}

.extra-links {
  display: flex;
  justify-content: space-between;
  color: #3F51B5;
}

.extra-links a:hover {
  color: #536DFE;
}

.el-button {
  width: 100%;
  background-color: #3F51B5;
  color: white;
}
</style>
