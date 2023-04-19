<template>
    <el-row v-for="history in historyList" :key="history.id">
      <el-col :span="19" class="title">
        {{ history.searchText }}
      </el-col>
    </el-row>
  
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="currentPage"
      :hide-on-single-page="true"
    />
  </template>
  
  <script setup>
  import { watchEffect, ref, computed } from "vue";
  import { useStore } from "vuex";
  
  let store = useStore();
  
  let currentPage = ref(1);
  
  watchEffect(() => {
    store.dispatch("getHistory", {
      page: currentPage.value,
      pageSize: 10,
    });
  });

  
  let total = computed(() => {
    return store.state.historyTotal;
  });
  let historyList = computed(() => {
    return store.state.searchHistoryList;
  });
  </script>
  
  <style scoped>
  .title {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    line-height: 3em;
    padding-right: 25%;
  }
  
  .link {
    color: #000;
    text-decoration: none;
  }
  
  .link:hover {
    color: red;
  }
  </style>