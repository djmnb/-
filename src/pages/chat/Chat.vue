<template>
  <el-row class="box">
    <chat-result ref="chatResult"></chat-result>
    <el-row class="search-box">
      <el-col :span="20">
        <el-tooltip
          class="select-box"
          placement="top"
          content="3.5模型有更快的响应速度,4模型有更高的准确度"
        >
          <select v-model="modelType">
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-4">gpt-4</option>
          </select>
        </el-tooltip>
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

      <el-col :span="1" style="padding-top: 20px">
        <el-button class="search-button" @click="search" v-loading="isloding1"
          >发送</el-button
        >
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
import { ref, computed, watch, watchEffect, nextTick, onMounted } from "vue";

import { useStore } from "vuex";
import ChatResult from "@/components/ChatResult.vue";

let searchText = ref("");
let isloding = ref(false);
let isloding1 = ref(false);
let searchType = ref(104);
const inputBox = ref(null);
let chatResult = ref(null);

let modelType = ref("gpt-3.5-turbo");





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

function updateSearchText() {
  searchText.value = inputBox.value.innerText;
}

// 发送搜索请求
async function search() {
  if (searchText.value.trim() == "") return;
  if (isloding1.value == true) return;
  isloding1.value = true;
  let data = {
    searchText: searchText.value,
    modelType: modelType.value,
  };
  searchText.value = "";
  inputBox.value.innerText = "";
  await chatResult.value.search(data);
  isloding1.value = false;
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
.select-box {
  position: absolute;
  left: 6.3%;
  top: -30%;
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
</style>