<script setup lang="ts">
  import {Clean as CleanIcon} from '@vicons/carbon'

  const painting = ref(false);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const ctx = ref< CanvasRenderingContext2D | null>(null);

  const clearCanvas = () => {
    if(ctx.value === null || canvas.value === null) return;
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  };

  const startPainting = (e) => {
    painting.value = true;
    draw(e);
  };

  const finishedPainting = () => {
    painting.value = false;
    if(ctx.value === null) return;
    ctx.value.beginPath();
  };

  const draw = (e) => {
    if (!painting.value) return;
    if(ctx.value === null || canvas.value === null) return;
    ctx.value.lineWidth = 10;
    ctx.value.lineCap = "round";

    const offsetTop = canvas.value.offsetTop + 50;
    const touch = e.touches ? e.touches[0] : e;

    ctx.value.lineTo(touch.pageX - canvas.value.offsetLeft, touch.pageY - offsetTop);
    ctx.value.stroke();

    ctx.value.beginPath();
    ctx.value.moveTo(touch.pageX - canvas.value.offsetLeft, touch.pageY - offsetTop);
  };

  onMounted(() => {
    canvas.value = document.getElementById("canvas") as HTMLCanvasElement
    ctx.value = canvas.value!.getContext("2d");

    if(ctx.value === null || canvas.value === null) return;
    // Set default stroke color
    ctx.value.strokeStyle = "black";

    // Resize canvas to parent size
    const parent = canvas.value.parentElement!;
    const grandParent = parent.parentElement!;
    canvas.value.width = grandParent.clientWidth;
    canvas.value.height = grandParent.clientHeight;
    canvas.value.addEventListener("touchstart", startPainting, false);
    canvas.value.addEventListener("touchmove", draw, true);
    canvas.value.addEventListener("touchend", finishedPainting, false);
    document.body.addEventListener("touchcancel", finishedPainting, false);
  });

  defineExpose({
    clearCanvas
  });
</script>

<template>
  <canvas @mousedown="startPainting" @mouseup="finishedPainting" @mousemove="draw" id="canvas"></canvas>
  <n-button type="error" @click.prevent="clearCanvas" class="clear-button">
    <template #icon>
      <n-icon><clean-icon /></n-icon>
    </template>
  </n-button>
</template>

<style scoped>
 #canvas {
    background-color: rgba(164, 164, 164, 0.14);
    cursor: crosshair;
    width: 100%;
    height: 100%;
 }
 .clear-button {
    position: absolute;
    top: 10px;
    right: 10px;
 }
</style>