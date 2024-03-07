<template>
  <div class="container">
    <el-button type="primary" class="back-button" @click="back">返回</el-button>
    <el-card class="box-card question-card">
      <template #header>
        <div class="clearfix">
          <span>题目详情</span>
        </div>
      </template>
      <div class="text item">{{ question.title }}</div>
    </el-card>

    <el-card class="box-card answer-card">

      <template #header>
        <div  class="clearfix">
          <span>题目答案</span>
      </div>
      </template>

      <v-md-preview class="text item" :text="question.content"  />
    
      <!-- <div class="text item"><v-md-preview :text="question.content" /></div> -->
    </el-card>
  </div>
</template>

<script setup>
import { computed, onActivated, onMounted, watchEffect, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
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
<style scoped>
.container {
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.back-button {
  margin-bottom: 20px;
}
.box-card {
  margin-bottom: 30px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
.clearfix::before {
  display: block;
  clear: both;
  content: "";
}
.text.item {
  margin-top: 5px;
  color: #606266;
}
.question-card {
  border-top: 4px solid #409eff;
}
.answer-card {
  border-top: 4px solid #67c23a;
}
</style>
