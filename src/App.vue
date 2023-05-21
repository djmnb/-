<template>
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div>Loading...</div> <!-- 这里可以替换成你的加载状态组件 -->
    </template>
  </Suspense>
</template>

<script setup>

</script>

<style>
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
*{
  margin: 0;
  padding: 0;
}


</style>
