<script setup lang="ts">

</script>

<template>
  <n-layout-footer bordered position="absolute" class="footer" >
    <n-space justify="space-between">
      <div>Left</div>
    </n-space>
  </n-layout-footer>
</template>

<style scoped>
.footer {
  display: grid;
  grid-template-rows: calc(var(--footer-height) - 1px);
  align-items: center;
  padding: 0 8px;
}
</style>