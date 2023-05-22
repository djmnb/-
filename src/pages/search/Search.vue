<template>
  <el-row class="search">
    <el-col :span="20">
      <div
        ref="inputBox"
        class="input-box"
        contenteditable="true"
        @paste="handlePaste"
        placeholder="输入文字或粘贴图片"
        v-loading="isloding"
        @keydown.enter.prevent="search"
        @input="updateSearchText"
      ></div>
    </el-col>

    <el-col :span="1">
      <el-button :icon="Search" class="search-button" @click="search" />
    </el-col>
  </el-row>
  <div class="result">
    <show-search-result :questions="questions" :searchText="searchText" :show="show"/>
  </div>
</template>


<script>
export default {
  name: "search",
};
</script>
<script setup>
import axios from "axios";
import {
  reactive,
  ref,
  watch,
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
} from "vue";

import { useStore } from "vuex";
import ShowSearchResult from "@/components/ShowSearchResult.vue";
import { Search } from "@element-plus/icons-vue";

let searchText = ref("");
let isloding = ref(false);
let searchType = ref(103);
const inputBox = ref(null);

let show = ref(false);


// 用户粘贴图片
async function handlePaste(event) {
  if (event.clipboardData.items.length > 0) {
    const item = event.clipboardData.items[0];
    if (item.type.indexOf("image") !== -1) {
      event.preventDefault(); // 阻止默认粘贴行为
      isloding.value = true;

      const blob = item.getAsFile();
      const imageUrl = await convertImageToBase64(blob);
      axios
        .post("/uploadpic/", {
          image: imageUrl,
        })
        .then((res) => {
          isloding.value = false;
          showMessage(res);
          searchText.value += res.data;
          inputBox.value.innerText = searchText.value;

          // 将光标移动到末尾
          const range = document.createRange();
          range.selectNodeContents(inputBox.value);
          range.collapse(false); // 将光标移动到末尾
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        })
        .catch((err) => {
          isloding.value = false;
          showMessage(err);
        });
    }
  }
}
async function convertImageToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
}

function updateSearchText(event) {
  searchText.value = inputBox.value.innerText;
}

let questions = computed(() => {
  return store.state.searchQuestions;
});
const store = useStore();
// 发送搜索请求
async function search() {


  const searchData = {
    searchText: searchText.value,
    questionNums:10
  };
  await store.dispatch("search", searchData);
  show.value = true;
}
</script>
    
<style scoped>
.search {
  align-items: center;
  justify-content: center;
}

.input-box:empty::before {
  content: '输入文字或粘贴图片';
  color:  #8B4513;
}

.input-box {
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid  #8B4513;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  overflow: hidden;
  line-height: 40px;
}

.input-box:focus {
  border-color:  #8B4513;
}

.search-button {
  background-color: #4285f4;
  color: #ccc;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  height: 60px;
  width: 100%;
}

.search-button:hover {
  background-color: #2a75f3;
}
.search-button:active,
.search-button:focus {
  background-color: #4285f4;
  color: #ccc;
}

.result {
  margin-top: 20px;
}
</style>