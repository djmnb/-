<template>
  <el-form
    label-position="top"
    label-width="100px"
    :model="formModel"
    ref="form"
  >
    <el-form-item label="题目内容" prop="title">
      <el-input
        type="textarea"
        :rows="1"
        v-model="formModel.title"
        placeholder="请输入题目内容"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="题目答案" prop="content">
      <el-input
        type="textarea"
        :rows="10"
        v-model="formModel.content"
        placeholder="请输入题目答案"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script setup>

import { reactive, ref, watch, defineComponent, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

let formModel = reactive({
  title: "",
  content: "",
});

const form = ref(null);
const store = useStore();


async function onSubmit() {
  await store.dispatch("uploadQuestion", formModel);
  onReset();
}

function onReset() {
  form.value.resetFields();
}





</script>

<style>

</style>