<template>
  <div class="register-container">
    <h2>注册</h2>
    <el-form ref="Form" :model="registerForm" label-width="100px">
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <password-input v-model="registerForm.password"></password-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <password-input v-model="registerForm.confirmPassword"></password-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input
          v-model="registerForm.verificationCode"
          placeholder="请输入验证码"
        >
          <template #append>
            <el-button type="primary" @click="getCode" :disabled="disabled">{{
              btnText
            }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script setup>
import PasswordInput from "@/pages/PasswordInput.vue";
import { reactive, ref, toRef } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

let registerForm = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});

const Form = ref(null);

function submitForm($event) {
  Form.value.validate((valid) => {
    if (valid) {
      axios
        .post("/register/", {
          email: registerForm.email,
          password: registerForm.password,
          confirmPassword: registerForm.confirmPassword,
          verificationCode: registerForm.verificationCode,
        })
        .then((res) => {
          console.log(res);
        });
      return true;
    } else {
      return false;
    }
  });
}

let btnText = ref("发送");
let disabled = ref(false);
function getCode() {
  disabled.value = true;
  let nums = 60;
  let timer = setInterval(() => {
    if (nums > 0) {
      nums--;
      btnText.value = nums + "s";
    } else {
      clearInterval(timer);
      btnText.value = "发送";
      disabled.value = false;
    }
  }, 1000);
  axios
    .post("/sendcode/", {
      email: registerForm.email,
      codeType: 100,
    })
    .then((data) => {

      console.log(data);
      showMessage(data);

      if (data.code >= 400) {
        clearInterval(timer);
        btnText.value = "发送";
        disabled.value = false;
      }
    });
}
</script>
  
  <style scoped>
.register-container {
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
</style>
  

