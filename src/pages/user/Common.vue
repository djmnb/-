<template>
  <div class="app-container">
    <div class="container">
      <h2>{{ title }}</h2>
      <el-form ref="Form" :model="data" label-width="90px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="data.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item :label="label" prop="password">
          <password-input v-model="data.password"></password-input>
        </el-form-item>
        <el-form-item :label="'确认' + label" prop="confirmPassword">
          <password-input v-model="data.confirmPassword"></password-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model="data.verificationCode" placeholder="请输入验证码">
            <template #append>
              <el-button type="primary" @click="getCode" :disabled="disabled">{{
                btnText
              }}</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="sendbtn">{{
            sendBtnText
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import PasswordInput from "@/pages/user/PasswordInput.vue";
import { reactive, ref, toRef } from "vue";
import axios from "axios";
import router from "@/router";
import { ElMessage } from "element-plus";

let props = defineProps(["title", "label", "sendBtnText", "codeType", "url"]);

let data = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  verificationCode: "",
});

const Form = ref(null);

function submitForm($event) {
  if (data.confirmPassword !== data.password) {
    ElMessage.error("两次密码不一致");
    return;
  }
  axios
    .post(props.url, {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      verificationCode: data.verificationCode,
    })
    .then((data) => {
      showMessage(data);
      if (data.code === 200) {
        router.replace({ path: "/index" });
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
    .post("/user/sendcode/", {
      email: data.email,
      codeType: props.codeType,
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
.app-container {
  background: url("~@/assets/bg.jfif") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
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
  color: #3f51b5;
}

.el-form-item label {
  color: #3f51b5;
}

.sendbtn {
  width: 100%;
  background-color: #3f51b5;
  color: white;
}
</style>
