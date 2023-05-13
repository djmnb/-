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
          background-color="#545c64"
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
        </el-menu>
      </el-aside>
      <el-main
        v-loading="isLoading"
        element-loading-background="rgba(240, 240, 240, 0.5)"
        style="position: relative;"
      >
      

        <router-view v-slot="{ Component }">
          <keep-alive>
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

let store = useStore();
let isLoading = computed(() => {
  return store.state.isLoading;
});
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
}

.header {
  height: 15%;
}
.headtitle {
  text-align: center;
  font-weight: 900;
  font-size: 40px;
}

/* .maincontainer {
  height: 85%;
} */

.aside {
  background-color: #545c64;
}
</style>

