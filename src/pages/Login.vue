<template>
  <div class="login-container">
    <h2>登录</h2>
    <el-form ref="Form" :model="loginForm" label-width="100px">
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
</template>

<script setup>
import PasswordInput from "@/pages/PasswordInput.vue";
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
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.extra-links {
  display: flex;
  justify-content: space-between;
}
</style>

