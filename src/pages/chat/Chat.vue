<template>
  <el-row class="box">
    <div class="result">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="message.type"
      >
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>
    </div>
    <el-row class="search-box">
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
        <el-button class="search-button" @click="search">发送</el-button>
      </el-col>
    </el-row>
  </el-row>
</template>
  
  
  <script>
export default {
  name: "search",
};
</script>
  <script setup>
import axios from "axios";
import { ref, computed, watch, watchEffect,nextTick } from "vue";

import { useStore } from "vuex";
import ShowSearchResult from "@/components/ShowSearchResult.vue";
import { Search } from "@element-plus/icons-vue";

let searchText = ref("");
let isloding = ref(false);
let searchType = ref(104);
const inputBox = ref(null);
let messages = ref([]);

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

const store = useStore();

function updateSearchText(event) {
  searchText.value = inputBox.value.innerText;
}

// 发送搜索请求
function search() {
  const searchData = {
    searchText: searchText.value,
    searchType: 104,
  };

  messages.value.push({
    type: "user",
    content: searchText.value.trim(),
  });
  searchText.value = "";
  inputBox.value.innerText = "";
  nextTick(() => {
    // 获取滚动区域元素
    const el = document.querySelector(".result");
    // 设置滚动条到最下方
    el.scrollTop = el.scrollHeight;
  });
  axios.post("search/", searchData).then((res) => {
    console.log(res);
    messages.value.push({
      type: "server",
      content: res.data,
    });
    nextTick(() => {
      // 获取滚动区域元素
      const el = document.querySelector(".result");
      // 设置滚动条到最下方
      el.scrollTop = el.scrollHeight;
    });
    showMessage(res, true);
  });
}
</script>
      
  <style scoped>
.box {
  height: 100%;
  justify-content: center;
}

.search-box {
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.input-box {
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: vertical;
  overflow: hidden;
  line-height: 40px;
}

.input-box:focus {
  border-color: #333;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: auto;
  height: 400px;
  width: 80%;
  margin: 0px, auto;
}

.result .user {
  text-align: right;
  margin-bottom: 10px;
}

.result .server {
  text-align: left;
  margin-bottom: 10px;
}

.message-content {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  color: #fff;
}

.result .user .message-content {
  background-color: #4285f4;
}

.result .server .message-content {
  background-color: #999;
}
</style>