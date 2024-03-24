<script lang="ts">
  import { onMount } from "svelte";
  import { getColour } from "./Colours";
  import type { RibbonElement } from "./RibbonElement";

  export let elements: RibbonElement[] = [];

  let canvas: HTMLCanvasElement;

  let totalWidth: number, totalHeight: number;
  let loopGap: number;

  function render(
    startX: number = 0,
    startY: number = 0,
    startAngle: number = 0,
    scaleFactor: number = 1,
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2d context");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = startX;
    let y = startY;
    let angle = startAngle - Math.PI / 2;
    ctx.lineWidth = 3;

    let minX = x;
    let minY = y;
    let maxX = x;
    let maxY = y;

    for (const element of elements) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = getColour(elements.indexOf(element));
      if (element.type === "straight") {
        const distance = element.length * scaleFactor;
        const dx = distance * Math.cos(angle);
        const dy = distance * Math.sin(angle);
        ctx.lineTo(x + dx, y + dy);
        x += dx;
        y += dy;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      } else {
        const radius = element.radius * scaleFactor;
        let centerX: number, centerY: number, startAngle: number;
        const clockwise = element.angle > 0;
        const dAngle = (element.angle * Math.PI) / 180;
        if (clockwise) {
          centerX = x + radius * Math.cos(angle + Math.PI / 2);
          centerY = y + radius * Math.sin(angle + Math.PI / 2);
          startAngle = angle - Math.PI / 2;
        } else {
          centerX = x + radius * Math.cos(angle - Math.PI / 2);
          centerY = y + radius * Math.sin(angle - Math.PI / 2);
          startAngle = angle + Math.PI / 2;
        }
        const endAngle = startAngle + dAngle;
        ctx.arc(centerX, centerY, radius, startAngle, endAngle, !clockwise);
        angle += dAngle;
        x = centerX + radius * Math.cos(endAngle);
        y = centerY + radius * Math.sin(endAngle);
        if (element.angle !== 0) {
          minX = Math.min(minX, centerX - Math.abs(radius));
          minY = Math.min(minY, centerY - Math.abs(radius));
          maxX = Math.max(maxX, centerX + Math.abs(radius));
          maxY = Math.max(maxY, centerY + Math.abs(radius));
        }
      }
      ctx.stroke();
    }
    return { minX, minY, maxX, maxY, finalX: x, finalY: y };
  }

  onMount(() => {
    const { minX, minY, maxX, maxY, finalX, finalY } = render();
    const scaleFactor = Math.min(
      (canvas.width - 20) / (maxX - minX),
      (canvas.height - 20) / (maxY - minY),
    );
    const paddingX = canvas.width - (maxX - minX) * scaleFactor;
    const paddingY = canvas.height - (maxY - minY) * scaleFactor;
    totalWidth = maxX - minX;
    totalHeight = maxY - minY;
    loopGap = Math.sqrt(finalX * finalX + finalY * finalY);
    render(
      -minX * scaleFactor + paddingX / 2,
      -minY * scaleFactor + 3 + paddingY / 2,
      0,
      scaleFactor,
    );
  });
</script>

<div id="container">
  <canvas bind:this={canvas} width={600} height={400} />
  <div id="dimensions">
    width: {Math.round(totalWidth)}
    <br />
    height: {Math.round(totalHeight)}
    <br />
    loop gap: {Math.round(loopGap)}
  </div>
</div>

<style>
  #container {
    position: relative;
  }
  #dimensions {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
