<template>
  <el-input
    v-model="password"
    :type="passwordType"
    placeholder="请输入密码"
  >
    <template #suffix>
      <span
        @click.stop="passwordVisible = !passwordVisible"
        class="no-select"
        ><el-icon v-show="!passwordVisible"><View /></el-icon>
        <el-icon v-show="passwordVisible"><Hide /></el-icon
      ></span>
    </template>
  </el-input>
</template>


<script>
export default {
  data() {
    return {
      password: "",
      passwordVisible: false,
    };
  },
  computed: {
    passwordType() {
      return this.passwordVisible ? "text" : "password";
    },
  },
  watch: {
    password(newval, oldval) {
      this.$emit('update:modelValue',newval)
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
