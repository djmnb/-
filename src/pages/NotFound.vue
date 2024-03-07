<template>
  <el-container class="container">
    <el-main class="main">
      <h1 class="headtitle">404</h1>
      <p class="not-found-text">抱歉，您访问的页面不存在</p>
      <el-button type="primary" @click="goBack">返回首页</el-button>
    </el-main>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

let router = useRouter();

const goBack = () => {
  router.push('/index');
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/bg.jfif") no-repeat center center fixed;
  background-size: cover;
}

.main {
  text-align: center;
  background-color: rgba(229, 229, 229, 0.8);
  padding: 20px;
  border-radius: 25px;
}

.headtitle {
  font-weight: 900;
  font-size: 80px;
  color: #003366;
  margin-bottom: 20px;
}

.not-found-text {
  font-size: 20px;
  color: #003366;
  margin-bottom: 20px;
}
</style>
