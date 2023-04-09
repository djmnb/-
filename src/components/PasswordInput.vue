<template>
  <div>
    <el-input
      v-model="password"
      :type="passwordType"
      placeholder="请输入密码"
    >
      <template #append>
        <el-icon
          :class="iconClass"
          :name="showPassword ? 'el-icon-eye-off' : 'el-icon-eye'"
          @click="togglePasswordVisibility"
        ></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      showPassword: false,
    };
  },
  computed: {
    passwordType() {
      return this.showPassword ? "text" : "password";
    },
    iconClass() {
      return this.showPassword ? "el-icon-eye-off" : "el-icon-eye";
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.el-icon {
  cursor: pointer;
}
</style>
