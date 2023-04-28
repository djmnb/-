<template>
  <h1>题目详情</h1>
  <div>{{ question.title }}</div>
  <h1>题目详解</h1>
  <div>{{ question.answer }}</div>
</template>

<script setup>
import { computed, onActivated, onMounted, watchEffect,ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";


let router = useRoute();

let store = useStore();

watchEffect(() => {
  store.dispatch("getQuestion", {
    id: Number(router.params.id),
  });
});



let question = computed(() => {
  let data = store.state.singelQuestion;
  return data.length > 0 ? data[0] : {};
});








</script>

<style>

</style>