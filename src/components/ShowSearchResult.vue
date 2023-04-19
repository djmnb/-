<template>
  <el-row v-for="question in questions" :key="question.id" class="search">
    <el-col :span="19" class="title">
      <router-link :to="{
        name: 'question',
        params: {
          id: question.id
        }

      }" class="link">
        <em
          v-for="(ch, index) in question.title"
          :key="index"
          :class="{ match: ismatch(searchText, ch) }"
          >{{ ch }}</em
        >
      </router-link>
    </el-col>
    <el-col :span="2">
      <button class="viewbtn" @click="viewdetail">查看答案</button>
    </el-col>
  </el-row>
</template>



<script setup>

let props = defineProps(["questions", "searchText"]);
function ismatch(text, ch) {
  return text.indexOf(ch) !== -1;
}
</script>
  
  <style scoped>
.search {
  align-items: center;
  justify-content: center;
}

.title{
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

em.match {
  color: red;
}
</style>
  