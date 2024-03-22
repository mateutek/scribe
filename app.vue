import 'vfonts/Lato.css'

<script setup lang="ts">

const { colorModePreference } = useNaiveColorMode();

colorModePreference.set('light');
useHead({
  title: 'Scribe',
  meta: [
    { name: 'description', content: 'Naucz się pisać z nami' }
  ]
})

</script>

<template>
  <naive-config>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </naive-config>
</template>

<style>

</style>