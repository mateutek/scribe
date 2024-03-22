<script setup lang="ts">

</script>

<template>
  <n-layout-header bordered class="nav">
    <n-space justify="space-between">
      <div class="left">
       Skryba
      </div>
      <div class="right">
        <naive-color-mode-switch/>
      </div>
    </n-space>
  </n-layout-header>
</template>

<style scoped>
.nav {
  display: grid;
  grid-template-rows: calc(var(--header-height) - 1px);
  align-items: center;
  padding: 0 8px;
}
</style>