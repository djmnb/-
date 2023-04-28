<template>
  <!-- <router-view v-if="!$route.meta.withinApp"></router-view>
  <not-found v-else></not-found> -->
  <router-view></router-view>
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
