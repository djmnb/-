<template>
  <el-row v-for="question in questions" :key="question.id" class="search">
    <el-col :span="19" class="title">
      <router-link
        v-if="isLink"
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
      <span v-else>{{ question.title }}</span>
    </el-col>
  </el-row>

  <teleport to="body">
    <el-pagination v-show="isShow"
      class="elPagination"
      background
      layout="prev, pager, next"
      :total="total"
      v-model:current-page="currentPage"
      :hide-on-single-page="true"
    />
  </teleport>
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
} from "vue";
import { useStore } from "vuex";

let store = useStore();

let currentPage = ref(1);


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

onDeactivated(() => {
  console.log(props.dataName+"失活了");
  isShow.value = false;
});

onMounted(() => {
  console.log(props.dataName + "被挂载");
});

onUnmounted(() => {
  console.log(props.dataName + "被卸载");
});

onActivated(() => {
  console.log(props.dataName+"活了");
  isShow.value = true;
});
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

.elPagination {
  position: fixed;
  left: 50%;
  bottom: 5%;
  translate: -50%;
}
</style>