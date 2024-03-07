<template>
  <el-menu
    :default-active="$route.fullPath"
    class="el-menu-vertical-demo"
    background-color="#003366"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    @select="$emit('select')"
  >
    <el-menu-item index="/index/search">搜索题目</el-menu-item>
    <el-menu-item index="/index/uploadquestion">上传题目</el-menu-item>
    <el-menu-item index="/index/myquestion">我的题目</el-menu-item>
    <el-menu-item index="/index/chat">在线问答</el-menu-item>
    <el-menu-item index="/index/searchhistory">搜索记录</el-menu-item>
    <el-menu-item index="/index/allquestion">所有题目</el-menu-item>
    <el-menu-item index="/index/myinfo">个人中心</el-menu-item>
    <el-menu-item index="/index/createquestion" v-if="userInfo.hasPermission">生成题库</el-menu-item>
    <!-- your el-menu-items here -->
  </el-menu>
</template>

<script setup>

import { useStore } from "vuex";

let store = useStore();
let userInfo = store.state.userInfo;


</script>

<style>
</style>