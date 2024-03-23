<script lang="ts">
  import { onMount } from "svelte";

  export let startX: number | undefined = undefined;
  export let startY: number | undefined = undefined;
  export let startAngle: number | undefined = undefined;
  export let elements: RibbonElement[] = [];

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get 2d context");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = startX || canvas.width / 2;
    let y = startY || canvas.height;
    let angle = startAngle || -Math.PI / 2;
    ctx.moveTo(x, y);

    for (const element of elements) {
      console.log(x, y, angle);
      if (element.type === "straight") {
        const dx = element.length * Math.cos(angle);
        const dy = element.length * Math.sin(angle);
        ctx.lineTo(x + dx, y + dy);
        x += dx;
        y += dy;
      } else {
        const radius = element.radius;
        let centerX: number, centerY: number, startAngle: number;
        const clockwise = element.angle > 0;
        const dAngle = element.angle * Math.PI / 180;
        if (clockwise) {
          centerX = x + radius * Math.cos(angle + Math.PI / 2);
          centerY = y + radius * Math.sin(angle + Math.PI / 2);
          startAngle = angle - Math.PI/2;
        } else {
          centerX = x + radius * Math.cos(angle - Math.PI / 2);
          centerY = y + radius * Math.sin(angle - Math.PI / 2);
          startAngle = angle + Math.PI/2;
        }
        const endAngle = startAngle + dAngle;
        ctx.arc(centerX, centerY, radius, startAngle,endAngle, !clockwise);
        angle += dAngle;
        x = centerX + radius * Math.cos(endAngle);
        y = centerY + radius * Math.sin(endAngle);
      }
    }

    ctx.stroke();
  });
</script>

<canvas bind:this={canvas} />
