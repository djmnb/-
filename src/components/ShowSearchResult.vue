<template>
  <div v-if="show">
    <el-row
      v-for="question in questions"
      :key="question.id"
      class="question-item"
      type="flex"
      justify="center"
      
    >
      <el-col :span="16" class="question-container">
        <router-link
          :to="{
            name: 'question',
            params: {
              id: question.id
            }
          }"
          class="question-link ellipsis"
        >
          <em
            v-for="(ch, index) in question.title"
            :key="index"
            :class="{ match: ismatch(searchText, ch) }"
          >{{ ch }}</em>
        </router-link>
      </el-col>
      <el-col :span="4">
        <el-button type="text" @click="viewdetail(question.id)">
          查看答案
        </el-button>
      </el-col>
    </el-row>
    <div v-if="questions.length == 0" class="no-result">
      暂无数据,换个关键字试试吧
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();

let props = defineProps(["questions", "searchText","show"]);


function ismatch(text, ch) {
  return text.indexOf(ch) !== -1;
}



function viewdetail(id) {
  router.push({
    name: "question",
    params: {
      id
    },
  });
  
}
</script>
  

<style scoped>
.question-item {
  margin-bottom: 10px;
}

.question-container {
  display: flex;
}

.question-link {
  color: #333;
  width: 100%;
}

.question-link:hover {
  color:  #8B4513;
}

.match {
  color: red;
}
.ellipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.no-result {
  color:  #8B4513;
  text-align: center;
  padding: 20px 0;
}
</style>
