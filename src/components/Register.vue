<template>
  <div class="register-container">
    <h2>注册</h2>
    <el-form ref="registerForm" :model="registerForm" label-width="100px">
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
            <el-button type="primary">发送</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
import PasswordInput from "@/components/PasswordInput.vue";

export default {
  components: {
    PasswordInput,
  },
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
        confirmPassword: "",
        verificationCode: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("注册成功！");
          // 这里添加实际的注册逻辑
        } else {
          console.log("注册失败！");
          return false;
        }
      });
    },
  },
};
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
  