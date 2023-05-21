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
        <div>
          {{ question.title }}
          <div>
            <el-button type="primary" @click="questionEdit(question)"
              >编辑</el-button
            >
            <el-popover :visible="visible" placement="top" :width="160">
              <p>Are you sure to delete this?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" text @click="visible = false"
                  >cancel</el-button
                >
                <el-button
                  size="small"
                  type="primary"
                  @click="questionDelete(question.id)"
                  >confirm</el-button
                >
              </div>
              <template #reference>
                <el-button type="danger" @click="visible = true"
                  >删除</el-button
                >
              </template>
            </el-popover>
          </div>
        </div>
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
import axios from "axios";
import { watchEffect, ref, computed } from "vue";
import { useStore } from "vuex";

let store = useStore();

let currentPage = ref(1);
let visible = ref(false);

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

function questionEdit(question) {
  router.push({
    name: "questionEdit",
    params: {
      id: question.id,
    },
  });
}

function questionDelete(id) {
  axios.post("question/delete", {
    id,
  });
}
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