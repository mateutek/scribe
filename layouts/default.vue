<script setup lang="ts">
  import { useSlots } from 'vue'
  import { sidebarCollapsedWidth } from '~/utils';
  const slots = useSlots();
  const collapsed = ref(false);
</script>

<template>
  <n-layout class="root-layout" scr>
    <Header/>
    <n-layout class="content">
      <slot></slot>
    </n-layout>
  </n-layout>
</template>

<style scoped>

.root-layout {
  overflow: hidden;
}

.center-layout {
  height: calc(100vh - var(--header-height));
}
.content {
  //height: 100%;
}


.sider-content {
  height: 100%;
}

</style>