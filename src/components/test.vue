<template>
    <div>
      <el-input
        v-model="email"
        placeholder="Email"
      ></el-input>
      <el-input
        v-model="password"
        type="password"
        placeholder="Password"
      ></el-input>
      <el-button @click="handleSubmit">Submit</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElInput, ElButton, ElMessage } from 'element-plus';
  
  const email = ref('');
  const password = ref('');
  
  const handleSubmit = async () => {
    try {
      // 模拟发送登录请求
      const response = await axios.post('https://api.example.com/login', {
        email: email.value,
        password: password.value
      });
  
      if (response.data.success) {
        ElMessage.success('登录成功');
        // 处理登录成功后的操作，例如跳转到其他页面
      } else {
        // 根据后端返回的错误信息显示相应的提示
        switch (response.data.errorCode) {
          case 'INVALID_EMAIL':
            ElMessage.error('邮箱无效');
            break;
          case 'INVALID_PASSWORD':
            ElMessage.error('密码错误');
            break;
          default:
            ElMessage.error('发生未知错误，请稍后再试');
        }
      }
    } catch (error) {
      ElMessage.error('请求失败，请检查网络连接');
    }
  };
  </script>
  