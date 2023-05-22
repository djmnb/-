<template>
  <div class="result">
    <div class="inner">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="message.role"
      >
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>
    </div>
    <div class="result-op">
      <div>
        <el-button type="primary" @click="clearMessages"
          >清空聊天记录</el-button
        >
      </div>
      <el-tooltip placement="top" :hide-after="10">
        <template #content>
          如果需要连续对话就需要上下文,在这里指定上下文数量,默认只能连续选择前面的<br />选择的越多,消耗token可能也就越多,根据自己需要选择,最少0条最多10条</template
        >
        <el-input-number
          v-model="contentNum"
          size="small"
          :step="2"
          step-strictly
          :min="0"
          :max="10"
        />
      </el-tooltip>
      <h4>本次消耗token数量:{{ nowConsumTokens }}</h4>
      <h4>累计消耗token数量:{{ allConsumTokens }}</h4>
      <h4>
        &nbsp;&nbsp;剩&nbsp;&nbsp;余&nbsp;&nbsp;&nbsp;token数量:{{ allTokens }}
      </h4>
    </div>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, nextTick, watchEffect, watch, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
let store = useStore();

let messages = ref([]);
let contentNum = ref(4);
let nowConsumTokens = ref(0);
let allConsumTokens = ref(0);
let allTokens = ref(0);

// if (store.state.userInfo == null) {
//   store.dispatch("getUserInfo");
// }

// watchEffect(() => {
//   if(store.state.userInfo != null)allTokens.value = store.state.userInfo.tokens;
// });

allTokens.value = store.state.userInfo.tokens;

async function search(data) {
  messages.value.push({
    role: "user",
    content: data.searchText.trim(),
  });

  let temp = [{ role: "system", content: "You are a helpful assistant." }];
  temp.push(...messages.value.slice(-contentNum.value - 1));

  const searchData = {
    modelType: data.modelType,
    messages: temp,
  };

  await axios.post("/chat/", searchData).then((res) => {
    console.log(res);
    nowConsumTokens.value = 0;
    if (res.code == 200) {
      messages.value.push(res.data.result);
      nowConsumTokens.value = res.data["totalTokens"];
      allConsumTokens.value += res.data["totalTokens"];
      allTokens.value = res.data["allTokens"];
    } else {
      messages.value.push({ role: "assistant", content: "" });
    }
    showMessage(res, true);
  });
}

watch(messages.value, (newVal, oldVal) => {
  nextTick(() => {
    // 获取滚动区域元素
    const el = document.querySelector(".inner");
    // 设置滚动条到最下方
    el.scrollTop = el.scrollHeight;
  });
});

function clearMessages(event) {
  let info = "请确保您不需要历史上下文了,如果不需要则确认删除";
  ElMessageBox.confirm(info, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    messages.value = [];

    ElMessage({
      type: "success",
      message: "删除成功",
    });
  });

  event.target.blur();
}

defineExpose({ search });
</script>

<style scoped>
.result {
  border: 2px solid #4285f4;
  border-radius: 4px;
  overflow-x: visible;
  height: 60vh;
  width: 80%;
  margin: 0px, auto;
  position: relative;
}

.result .inner {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.result .user {
  text-align: right;
  margin-bottom: 10px;
}

.result .assistant {
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

.result .assistant .message-content {
  background-color: #999;
}

.result-op {
  position: absolute;
  right: 0%;
  top: 0%;
  transform: translateX(100%);
}
h4 {
  font-size: 5px;
}

</style>