<template>
  <el-form label-width="110px" class="form">
    <el-form-item label="邮箱">
      <el-input :value="user.email" disabled></el-input>
    </el-form-item>

    <el-form-item label="生成题库权限">
      <el-input
        :value="user.hasPermission ? '有' : '无'"
        disabled
      ></el-input>
    </el-form-item>

    <el-form-item label="上传题目数量">
      <el-input :value="user.uploadCount" disabled></el-input>
    </el-form-item>

    <el-form-item label="剩余token数量">
      <el-input :value="user.tokens" disabled></el-input>
    </el-form-item>



    <el-form-item label="创建时间">
      <el-input :value="formatDate(user.createTime)" disabled></el-input>
    </el-form-item>

    <el-form-item label="登录时间">
      <el-input :value="formatDate(user.loginTime)" disabled></el-input>
    </el-form-item>
    <el-form-item label="登录ip">
      <el-input :value="user.loginIp" disabled></el-input>
    </el-form-item>
  </el-form>

  <div class="box">
    <el-button type="primary" @click="dialogTableVisible = true"
      >修改密码</el-button
    >
    <el-button type="danger" @click="logout">退出登录</el-button>
  </div>

  <el-dialog v-model="dialogTableVisible" title="修改密码" center width="400px">
    <el-form label-width="100px">
      <el-form-item label="旧密码">
        <el-input v-model="oldPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="newPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

const store = useStore();
const router = useRouter();
let user = store.state.userInfo;

let oldPassword = ref("");
let newPassword = ref("");
let confirmPassword = ref("");

let dialogTableVisible = ref(false);

function formatDate(dateString) {
  let date = new Date(dateString);
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function logout() {
  axios.post("/user/logout/").then((res) => {
    router.replace("/login");
    showMessage(res);
  });
}

function changePassword() {
  axios
    .post("/user/changepassword/", {
      oldPassword: oldPassword.value,
      password: newPassword.value,
      confirmPassword: confirmPassword.value,
      email: user.email,
    })
    .then((res) => {
      showMessage(res);
      if (res.code === 200) {
        dialogTableVisible.value = false;
      }
      router.replace("/login");
    });
}
</script>

<style scoped>
.form {
  width: 400px;
  margin: 0 auto;
}
.box {
  margin-top: 20px;
  text-align: center;
  width: 400px;
  margin: 0 auto;
}
</style>