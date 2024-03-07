<template>
  <el-container class="container">
    <el-header class="header">
      <div class="banner">
        <el-button
          class="drawer-button"
          :icon="Menu"
          @click="drawer = true"
        ></el-button>
        <h1 class="headtitle">搜题系统</h1>
      </div>
    </el-header>
    <el-container class="maincontainer">
      <el-aside class="aside" v-if="!isMobile" width="150px">
        <aside-menu></aside-menu>
      </el-aside>
      <el-main
        v-loading="isLoading"
        element-loading-background="rgba(240, 240, 240, 0.5)"
        style="position: relative"
      >
        <router-view v-slot="{ Component }">
          <keep-alive exclude="Question">
            <component :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </router-view>
        <!-- your el-main contents here -->
      </el-main>
    </el-container>
    <el-drawer
      title="菜单"
      v-model="drawer"
      :with-header="false"
      direction="ltr"
      size="50%"
    >
      <aside-menu @select="drawer = false"></aside-menu>
    </el-drawer>
  </el-container>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import AsideMenu from "@/components/AsideMenu.vue";
import { Menu } from "@element-plus/icons-vue";

let store = useStore();
let isLoading = computed(() => {
  return store.state.isLoading;
});
let router = useRouter();

// 获取用户信息
await store.dispatch("getUserInfo");

let drawer = ref(false);
let isMobile = ref(window.innerWidth < 768);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});
</script>

<style scoped>
.container {
  height: 100vh;
  overflow: auto;
  background: url("~@/assets/bg.jfif") no-repeat center center fixed;
  background-size: cover;
}

.header {
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.banner {
  background-color: rgba(0, 51, 102, 0.8);
  padding: 20px;
  border-radius: 25px;
  text-align: center;
}

.headtitle {
  font-weight: 900;
  font-size: 40px;
  color: #ffd04b;
}

.drawer-button {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  display: none;
}

@media screen and (max-width: 767px) {
  .drawer-button {
    display: block;
  }
}

.maincontainer {
  height: 85%;
  background-color: rgba(229, 229, 229, 0.8);
  border-radius: 5px;
}

.aside {
  background-color: #003366;
}
</style>
