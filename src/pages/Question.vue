<template>
  <h1>题目详情</h1>
  <div>{{  question?question.title:question }}</div>
  <h1>题目详解</h1>
  <div>{{ question?question.answer:question }}</div>



</template>

<script setup>
import { computed, onActivated, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";



// let props = defineProps(["title", "answer"]);
let router = useRoute();

let store = useStore();
// 字符串变成数字

let id = Number(router.params.id);
store.dispatch("getQuestion", id);

let question = computed(() => {
  return store.state.tempQuestion
});


watchEffect(() => {
  if (router.params.id !== undefined) {

    let tempid = Number(router.params.id);
    if (tempid == id) return
    id = tempid;
    store.dispatch("getQuestion", id);
  }
});

onMounted(() => {
  console.log("mounted");
});

console.log("ageain")




</script>

<style>

</style>