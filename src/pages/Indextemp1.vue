<template>
  <el-container class="container">
    <el-header class="header">
      <h1 class="headtitle">搜题系统</h1>
    </el-header>
    <el-container class="maincontainer">
      <el-aside class="aside" width="150px">
        <el-menu
          :default-active="$route.fullPath"
          class="el-menu-vertical-demo"
          background-color="#3F51B5"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/index/search">搜索题目</el-menu-item>
          <el-menu-item index="/index/uploadquestion">上传题目</el-menu-item>
          <el-menu-item index="/index/myquestion">我的题目</el-menu-item>
          <el-menu-item index="/index/chat">在线问答</el-menu-item>
          <el-menu-item index="/index/searchhistory">搜索记录</el-menu-item>
          <el-menu-item index="/index/allquestion">所有题目</el-menu-item>
          <el-menu-item index="/index/myinfo">个人中心</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main
        v-loading="isLoading"
        element-loading-background="rgba(240, 240, 240, 0.5)"
        style="position: relative;"
      >
        <router-view v-slot="{ Component }">
          <keep-alive exclude="Question">
            <component :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";


let store = useStore();
let isLoading = computed(() => {
  return store.state.isLoading;
});
let router = useRouter()

// 获取用户信息
await store.dispatch("getUserInfo");



</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
  background: url('https://th.bing.com/th?id=OIP.VPX2HZTUr5eckwJGBtxEegHaDe&w=350&h=164&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2') no-repeat center center fixed;
  background-size: cover;
}

.header {
  height: 15%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.headtitle {
  text-align: center;
  font-weight: 900;
  font-size: 40px;
  color: #3F51B5;
}

.maincontainer {
  height: 85%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
}

.aside {
  background-color: #3F51B5;
}
</style>
