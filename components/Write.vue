<script setup lang="ts">
  import {Clean as CleanIcon} from '@vicons/carbon'
  import {Erase as EraseIcon} from '@vicons/carbon'
  import {Pen as PencilIcon} from '@vicons/carbon'

  const painting = ref(false);
  const canvas = ref<HTMLCanvasElement | null>(null);
  const ctx = ref<CanvasRenderingContext2D | null>(null);
  const selectedTool = ref('pencil');
  const eraserTip = ref<HTMLDivElement | null>(null);
  const clearCanvas = () => {
    if(ctx.value === null || canvas.value === null) return;
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  };

  const startPainting = (e: MouseEvent | TouchEvent) => {
    painting.value = true;
    draw(e);
  };

  const finishedPainting = () => {
    painting.value = false;
    if(ctx.value === null) return;
    ctx.value.beginPath();
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!painting.value) return;
    if(ctx.value === null || canvas.value === null || eraserTip.value === null) return;

    // Set line width to be 1% of the canvas width
    ctx.value.lineWidth = canvas.value.width * 0.01;
    ctx.value.lineCap = "round";

    const offsetTop = canvas.value.offsetTop + 50;

    let touch;
    if (e instanceof TouchEvent) {
      touch = e.touches[0];
    } else if (e instanceof MouseEvent) {
      touch = e;
    }
    if(touch === undefined) return;

    if (selectedTool.value === 'erase') {
      ctx.value.globalCompositeOperation = "destination-out";
      ctx.value.strokeStyle = "rgba(0,0,0,1)";

      const eraserSize = canvas.value.width * 0.02;
      eraserTip.value.style.width = `${eraserSize}px`;
      eraserTip.value.style.height = `${eraserSize}px`;
      eraserTip.value.style.left = `${touch.pageX - canvas.value.offsetLeft - eraserSize / 2}px`;
      eraserTip.value.style.top = `${touch.pageY - offsetTop - eraserSize / 2}px`;
      eraserTip.value.style.display = 'block';
    } else {
      ctx.value.globalCompositeOperation = "source-over";
      ctx.value.strokeStyle = "black";
      eraserTip.value.style.display = 'none';
    }

    ctx.value.lineTo(touch.pageX - canvas.value.offsetLeft, touch.pageY - offsetTop);
    ctx.value.stroke();

    ctx.value.beginPath();
    ctx.value.moveTo(touch.pageX - canvas.value.offsetLeft, touch.pageY - offsetTop);
  };


  const resizeCanvas = () => {
    if(ctx.value === null || canvas.value === null) return;
    // Resize canvas to parent size
    const parent = canvas.value.parentElement!;
    const grandParent = parent.parentElement!;
    canvas.value.width = grandParent.clientWidth;
    canvas.value.height = grandParent.clientHeight;
  };

  onMounted(() => {
    canvas.value = document.getElementById("canvas") as HTMLCanvasElement
    ctx.value = canvas.value!.getContext("2d");

    if(ctx.value === null || canvas.value === null) return;
    // Set default stroke color
    ctx.value.strokeStyle = "black";

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    canvas.value.addEventListener("touchstart", startPainting, false);
    canvas.value.addEventListener("touchmove", draw, true);
    canvas.value.addEventListener("touchend", finishedPainting, false);
    document.body.addEventListener("touchcancel", finishedPainting, false);


    eraserTip.value = document.getElementById("eraser-tip") as HTMLDivElement;

    canvas.value.addEventListener("touchend", () => {
      if(eraserTip.value === null) return;
      eraserTip.value.style.display = 'none';
    });

    canvas.value.addEventListener("mouseleave", () => {
      if(eraserTip.value === null) return;
      eraserTip.value.style.display = 'none';
    });

  });

  defineExpose({
    clearCanvas
  });
</script>

<template>
  <canvas @mousedown="startPainting" @mouseup="finishedPainting" @mousemove="draw" id="canvas"></canvas>
  <div id="eraser-tip" style="position: absolute; border: 1px solid red; border-radius: 50%; display: none;"></div>
  <n-space class="buttons-container">
    <n-button type="error" @click.prevent="clearCanvas" size="large">
      <template #icon>
        <n-icon><clean-icon /></n-icon>
      </template>
    </n-button>
    <n-radio-group v-model:value="selectedTool" size="large">
      <n-radio-button  value="pencil">
          <n-icon><pencil-icon /></n-icon>
      </n-radio-button>
      <n-radio-button value="erase">
          <n-icon color="red"><erase-icon /></n-icon>
      </n-radio-button>
    </n-radio-group>
  </n-space>
</template>

<style scoped>
 #canvas {
    background-color: rgba(164, 164, 164, 0.14);
    cursor: crosshair;
    width: 100%;
    height: 100%;
 }
 .buttons-container {
    position: absolute;
    top: 10px;
    right: 10px;
 }
</style>