<template>
  <div class="container">
    <h2>忘记密码</h2>
    <el-form
      ref="forgotPasswordForm"
      :model="forgotPasswordForm"
      label-width="100px"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="forgotPasswordForm.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <password-input v-model="forgotPasswordForm.password"></password-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword">
        <password-input
          v-model="forgotPasswordForm.confirmPassword"
        ></password-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input
          v-model="forgotPasswordForm.verificationCode"
          placeholder="请输入验证码"
        >
          <template #append>
            <el-button type="primary" @click="getCode" :disabled="disabled">{{ btnText }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('forgotPasswordForm')"
          >重置密码</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script setup>
import PasswordInput from "@/pages/PasswordInput.vue";
import { reactive, ref } from "vue";





let forgotPasswordForm = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});

const submitForm = (formName) => {
  const form = ref(formName);
  form.value.validate((valid) => {
    if (valid) {
      console.log("重置密码成功！");
      // 这里添加实际的重置密码逻辑
    } else {
      console.log("重置密码失败！");
      return false;
    }
  });
};

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
.container {
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
  

