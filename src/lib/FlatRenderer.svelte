<script lang="ts">
  import { onMount } from "svelte";
    import { getColour } from "./Colours";
  let canvas: HTMLCanvasElement;

  export let elements: RibbonElement[] = [];

  function getSize (element: RibbonElement) {
    if (element.type === "straight") {
      return element.length;
    } else {
      return element.radius * Math.abs(element.angle) * Math.PI / 180;
    }
  }
</script>

<div id="ribbon">
  {#each elements as element, i}
    <div style="background-color: {getColour(i)}; width: {getSize(element)*3}px;">
      {Math.round(getSize(element))}
      <span class="running-total">{Math.round(elements.slice(0, i+1).reduce((acc, e) => acc + getSize(e), 0))}</span>
    </div>
  {/each}
</div>

<style>
  #ribbon {
    display: flex;
    flex-wrap: wrap;
    height: 1.5rem;
    position: relative;
  }
  #ribbon div {
    height: 100%;
    display: flex;
    place-content: center;
    position: relative;
  }
  #ribbon .running-total {
    position: absolute;
    bottom: -1rem;
    right: 0.1rem;
    font-size: 0.8rem;
  }
</style>