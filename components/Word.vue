,<script setup lang="ts">
  import type { Write } from '#components';
  import type { CSSProperties } from 'vue';
  import words from '~/utils/words';
  const currentWord = ref('');
  const canvasEnabled = ref(false);
  const writeRef = ref<InstanceType<typeof Write> | null>(null);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  const railStyle = ({ focused, checked }: {
    focused: boolean
    checked: boolean
  }) => {
    const style: CSSProperties = {}
    if (checked) {
      style.background = 'rgb(42, 148, 125)'
      if (focused) {
        style.boxShadow = '0 0 0 2px #d0305040'
      }
    } else {
      style.background = 'rgb(145,145,145)'
      if (focused) {
        style.boxShadow = '0 0 0 2px #2080f040'
      }
    }
    return style
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


  function isVowel(char: string) {
    return ['a','ą', 'e', 'ę', 'i', 'o', 'u', 'ó', 'y'].includes(char.toLowerCase());
  }

</script>

<template>
    <n-flex justify="center" align="center" vertical>
      <div class="container">
        <n-el tag="svg" viewBox="0 0 80 20" class="word">
          <line x1="0%" y1="8%" x2="100%" y2="8%" style="stroke:rgba(255,0,0,0.5);stroke-width:0.5" />
          <!-- Red line 2 -->
          <line x1="0%" y1="36%" x2="100%" y2="36%" style="stroke:rgba(255,0,0,0.5);stroke-width:0.5" />
          <!-- Blue line -->
          <line x1="0%" y1="65.5%" x2="100%" y2="65.5%" style="stroke:rgba(0,0,255,0.5);stroke-width:0.5" />
          <text x="50%" y="65%" text-anchor="middle" :style="`opacity: ${canvasEnabled ? 0.54 : 1}`">
            <tspan v-for="(char, index) in currentWord.split('')" :key="index" :style="isVowel(char) ? 'fill: red' : 'fill: var(--info-color)'">
              {{ char }}
            </tspan>
          </text>
          <!-- Red line 1 -->
        </n-el>
        <div v-if="canvasEnabled" style="width:100%; height:100%; position: absolute; top:0; left:0;">
          <Write ref="writeRef"/>
        </div>
      </div>
      <n-button size="large" type="primary" @click="getNewWord">Nowe słowo</n-button>
      <n-form-item label-placement="left" label="Przełącz pisanie">
        <n-switch v-model:value="canvasEnabled" @update:value="enableCanvas" :rail-style="railStyle"/>
      </n-form-item>
    </n-flex>
</template>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    & * {
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }
  }
  .word {
    font-family: Elementarz, sans-serif;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
</style>