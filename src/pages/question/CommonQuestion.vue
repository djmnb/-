<template>
  <el-row v-for="question in questions" :key="question.id" class="search">
    <el-col :span="22" class="title">
      <div v-if="isLink">
        <router-link
          :to="{
            name: 'question',
            params: {
              id: question.id,
            },
          }"
          class="link"
        >
          {{ question.title }}
        </router-link>

        <div class="op" v-if="getType == 'MY_QUESTION'">
          <el-button
            type="primary"
            @click="
              () => {
                dialogTableVisible = true;
                currentQuestion = question;
                formModel = reactive(
                  JSON.parse(JSON.stringify(currentQuestion))
                );
              }
            "
            >编辑</el-button
          >
          <el-button
            type="danger"
            @click="
              () => {
                centerDialogVisible = true;
                currentQuestion = question;
                currentType = 0;
              }
            "
            >删除</el-button
          >
        </div>
      </div>

      <div v-else>
        <span>{{ question.title }}</span>
        <div class="op">
          <el-button
            type="danger"
            @click="
              () => {
                centerDialogVisible = true;
                currentQuestion = question;
                currentType = 1;
              }
            "
            >删除</el-button
          >
        </div>
      </div>
    </el-col>
  </el-row>

  <teleport to="body">
    <el-pagination
      v-show="isShow"
      class="elPagination"
      background
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="currentPage"
      :hide-on-single-page="true"
    />
  </teleport>

  <el-dialog
    v-model="centerDialogVisible"
    title="警告"
    width="400px"
    align-center
  >
    <span>{{
      currentType == 0 ? "你确定要删除这个题目吗" : "你确定要删除这条记录吗?"
    }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="infoDelete"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogTableVisible" title="修改题目" center width="400px">
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
        <el-button type="primary" @click="changeQuestion">保存</el-button>
        <el-button @click="onReset">还原</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
  
  <script setup>
import {
  watchEffect,
  ref,
  computed,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  reactive,
} from "vue";
import { useStore } from "vuex";
import axios from "axios";

let store = useStore();

let currentPage = ref(1);

// 控制删除弹窗是否显示
let centerDialogVisible = ref(false);

// 控制修改弹窗是否显示
let dialogTableVisible = ref(false);

// 当前操作的题目
let currentQuestion = null;

let currentType = 0;

// 修改题目的表单
let formModel = reactive({
  id: -1,
  title: "",
  content: "",
});

let props = defineProps([
  "methodName",
  "dataName",
  "getType",
  "total",
  "isLink",
]);

watchEffect(() => {
  store.dispatch(props.methodName, {
    page: currentPage.value,
    pageSize: 10,
    id: -1,
    getType: props.getType,
  });
});

let total = computed(() => {
  return store.state[props.total];
});
let questions = computed(() => {
  return store.state[props.dataName];
});

let isShow = ref(1);

async function changeQuestion() {
  await axios.post("/question/changequestion/", formModel).then((res) => {
    showMessage(res);
  });
  await store.dispatch(props.methodName, {
    page: currentPage.value,
    pageSize: 10,
    id: -1,
    getType: props.getType,
  });
  dialogTableVisible.value = false;
}

async function infoDelete() {

  if (currentType == 0) {
    await axios
      .post("/question/deletequestion/", {
        id: currentQuestion.id,
      })
      .then((res) => {
        showMessage(res);
      });
  } else {
    await axios
      .post("/question/deletehistory/", {
        id: currentQuestion.id,
      })
      .then((res) => {
        showMessage(res);
      });
  }


  if (questions.value.length == 1 && currentPage.value != 1) {
    currentPage.value--;
  }
 

  await store.dispatch(props.methodName, {
    page: currentPage.value,
    pageSize: 10,
    id: -1,
    getType: props.getType,
  });
  centerDialogVisible.value = false;
}

// 重置表单
function onReset() {
  for (let key in formModel) {
    formModel[key] = currentQuestion[key];
  }
}

// 防止组件失活时，分页器还在页面上
onDeactivated(() => {
  console.log(props.dataName + "失活了");
  isShow.value = false;
});

// 显示分页器
onActivated(() => {
  console.log(props.dataName + "活了");
  isShow.value = true;

  store.dispatch(props.methodName, {
    page: currentPage.value,
    pageSize: 10,
    id: -1,
    getType: props.getType,
  });
});
</script>
  
  <style scoped>
.search {
  overflow: auto;
  justify-self: center;
}
.title {
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  line-height: 3em;
  margin: 0 auto;
}

.link {
  color: #000;
  text-decoration: none;
}

.link:hover {
  color: red;
}

.elPagination {
  position: fixed;
  left: 50%;
  bottom: 5%;
  translate: -50%;
}

.op {
  float: right;
}
</style>