<template>
   <el-button type="primary" @click="back"
    >返回</el-button>
  <h1>题目详情</h1>
  <div>{{ question.title }}</div>
  <h1>题目详解</h1>
  <div>{{ question.content }}</div>
</template>

<script setup>
import { computed, onActivated, onMounted, watchEffect, ref, watch } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useStore } from "vuex";

let route = useRoute();
let router = useRouter();

let store = useStore();
store.dispatch("getQuestion", {
  id: Number(route.params.id),
});

function back() {
  router.back();
}

// watch(router, (newVal, oldVal) => {
//   store.dispatch("getQuestion", {
//     id: Number(router.params.id),
//   });
// });

let question = computed(() => {
  let data = store.state.singelQuestion;
  return data.length > 0 ? data[0] : {};
});
</script>

<style>
</style>