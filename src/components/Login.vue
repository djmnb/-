<template>
  <div class="container">
    <h2 class="title">登录</h2>
    <el-form label-width="60px" :model="userinfo">
      <el-form-item label="账号">
        <el-input placeholder="请输入邮箱" v-model="userinfo.email"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input
          placeholder="请输入密码"
          v-model="userinfo.password"
          :type="passwordVisible ? 'text' : 'password'"
        >
          <template #suffix>
            <span
              @click.stop="passwordVisible = !passwordVisible"
              class="passwordVisible"
              ><el-icon v-show="!passwordVisible"><View /></el-icon>
              <el-icon v-show="passwordVisible"><Hide /></el-icon
            ></span>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="验证码">
        <el-col :span="16" style="margin-right: 20px">
          <el-input placeholder="请输入验证码" v-model="userinfo.code">
          </el-input
        ></el-col>
        <el-col :span="6">
          <img src="" alt="验证码图片" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginbtn">Primary</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  
  <script setup>
import { reactive, ref } from "vue";

let passwordVisible = ref(false);

let userinfo = reactive({
  email: "",
  password: "",
  code: "",
});
</script>
  
  <style scoped>
.container {
  width: 500px;
  height: 400px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;

  box-sizing: border-box;

  padding: 60px 30px;
}

.title {
  text-align: center;
}

.passwordVisible:hover {
  color: black;
}

.loginbtn {
  width: 250px;
  margin-left: 20px;
}
</style>