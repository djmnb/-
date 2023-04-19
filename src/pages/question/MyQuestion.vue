<template>
    <el-row v-for="question in questions" :key="question.id" class="search">
      <el-col :span="19" class="title">
        <router-link
          :to="{
            name: 'question',
            params: {
              id: question.id,
            },
          }"
          class="link"
        >
          {{ question.title }}
        </router-link>
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
    store.dispatch("getQuestion", {
      page: currentPage.value,
      pageSize: 10,
      id: -1,
      getType: "MY_QUESTION",
    });
  });

  
  let total = computed(() => {
    return store.state.myQuestionTotal;
  });
  let questions = computed(() => {
    return store.state["myQuestions"];
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