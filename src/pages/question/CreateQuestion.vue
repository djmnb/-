<template>
  <el-container class="container">
    <el-header>
      <el-input
        v-model="message"
        placeholder="输入题库类型"
        class="input-with-select"
      >
      </el-input>
      <el-button @click="sendMessage" v-loading="isLoading">生成题库</el-button>
    </el-header>
    <el-main>
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="realProgress"
      ></el-progress>
      <el-divider></el-divider>
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(outline, i) in outlines"
          :key="i"
          :title="`大纲 ${i + 1}: ${outline}`"
          :name="String(i)"
        >
          <el-card
            class="box-card"
            v-for="(question, j) in questions[i]"
            :key="j"
          >
            <div class="clearfix">
              <span>题目 {{ j + 1 }}</span>
            </div>
            <el-collapse>
              <el-collapse-item :title="question.title">
                {{ question.answer }}
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-collapse-item>
      </el-collapse>
      <div>
        <h1>消耗token数量: {{ totaltokens }}</h1>
        <h1>消耗美元: {{ (totaltokens / 1200) * 0.02 }}</h1>
        <h1>生成题目数量: {{ length }}</h1>
        <el-button type="primary" v-loading="isLoading" @click="saveQuesions"
          >保存题库</el-button
        >
      </div>
      <div>耗时:{{ time }}秒</div>
    </el-main>
  </el-container>
</template>

<script setup>
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

const message = ref("");
let outlines = ref([]);

let totaltokens = ref(0);

let activeNames = ref([]);
let questions = ref([]);

let length = computed(() => {
  let len = 0;
  for (let i = 0; i < questions.value.length; i++) {
    len += questions.value[i].length;
  }
  return len;
});

let isLoading = ref(false);
let store = useStore();

let userInfo = store.state.userInfo;

let realProgress = ref(0);
let interval = null;

let time = ref(0);

let isSave = ref(false);
let alreadySave = ref(false);

const increaseProgress = () => {
  interval = setInterval(() => {
    if (realProgress.value < 100) {
      if (outlines.value.length == 0 && realProgress.value < 5) {
        realProgress.value++;
      } else if (outlines.value.length != 0) {
        if (
          realProgress.value <
          ((questions.value.length + 1) * 100) / outlines.value.length
        ) {
          realProgress.value++;
        }
      }
    } else {
      clearInterval(interval);
    }
  }, 2000);
};

const sendMessage = () => {


  // 创建一个新的 WebSocket 连接
  const socket = new WebSocket("ws://localhost:8765");

  increaseProgress();

  // 连接打开后发送消息
  socket.addEventListener("open", function (event) {
    if(isLoading.value){
      ElMessage.error("正在生成题库,请勿重复生成");
      return;
    }

    realProgress.value = 0;
    alreadySave.value = false;
    isSave.value = false;
    questions.value = [];
    activeNames.value = [];
    outlines.value = [];
    totaltokens.value = 0;
    time.value = 0;
    isLoading.value = true;

    console.log(message.value);
    let data = {
      email: userInfo.email,
      password: userInfo.password,
      content: message.value,
    };
    socket.send(JSON.stringify(data));
    

    let timer = setInterval(() => {
      if (realProgress.value == 100) {
        clearInterval(timer);
      } else {
        time.value++;
      }
    }, 1000);
  });

  // 服务器消息监听
  socket.addEventListener("message", function (event) {
    let data = JSON.parse(event.data);
    console.log(data);

    if (data["type"] == "outlines") {
      outlines.value = data["content"];
      activeNames.value.push(String(outlines.value.length - 1));
    } else if (data["type"] == "total_tokens") {
      totaltokens.value = data["content"];
    } else if (data["type"] == "questions") {
      questions.value.push(data["content"]);
      console.log(questions.value);
    } else if (data["type"] == "finish") {
      realProgress.value = 100;
      isLoading.value = false;
      ElMessage.success("生成题库成功,5分钟后才能继续生成题目");
    } else {
      ElMessage.error(data["content"]);
      isLoading.value = false;
      return;
    }
    message.value = "";
  });
};

const saveQuesions = () => {
  if (alreadySave.value) {
    ElMessage.error("已经保存过题库了,请勿重复保存");
    return;
  }
  questions.value.forEach((knowledge) => {
    knowledge.forEach((question) => {
      let data = {
        title: question.title,
        content: question.answer,
      };
      store.dispatch("uploadQuestion", data);
    });
  });

  alreadySave.value = true;
};
</script>

<style scoped>
.container {
  height: 100vh;
  background: #f5f7fa;
}

.el-input {
  width: 300px;
}
</style>
