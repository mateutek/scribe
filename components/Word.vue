<script setup lang="ts">
  import type { Write } from '#components';
  import words from '~/utils/words';
  const currentWord = ref('');
  const canvasEnabled = ref(false);
  const writeRef = ref<InstanceType<typeof Write> | null>(null);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  const clearCanvas = () => {
    writeRef.value?.clearCanvas();
  };

  onMounted(() => {
    getNewWord();
  });


  function getNewWord() {
    clearCanvas();
    currentWord.value = getRandomWord();
  }

  function enableCanvas(value: boolean) {
    canvasEnabled.value = value;
  }

</script>

<template>
    <n-flex justify="center" align="center" vertical>
      <div class="container">
        <n-el :style="`fill: ${canvasEnabled ? 'rgba(110,110,110,0.34)' : 'var(--text-color-base)'}`" tag="svg" viewBox="0 0 80 20" class="word">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
            {{currentWord}}
          </text>
        </n-el>
        <div v-if="canvasEnabled" style="width:100%; height:100%; position: absolute; top:0; left:0;">
          <Write ref="writeRef"/>
        </div>
      </div>
      <n-button size="large" type="primary" @click="getNewWord">Nowe słowo</n-button>
      <n-form-item label-placement="left" label="Przełącz pisanie">
        <n-switch v-model:value="canvasEnabled" @update:value="enableCanvas" />
      </n-form-item>
    </n-flex>
</template>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .word {
    font-family: Elementarz, sans-serif;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
</style>