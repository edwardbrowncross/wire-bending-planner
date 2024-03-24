<script lang="ts">
  import { onMount } from "svelte";
  import { getColour } from "./Colours";
  import type { RibbonElement } from "./RibbonElement";
  let canvas: HTMLCanvasElement;

  export let elements: RibbonElement[] = [];

  function getSize(element: RibbonElement) {
    if (element.type === "straight") {
      return element.length;
    } else {
      return (element.radius * Math.abs(element.angle) * Math.PI) / 180;
    }
  }
</script>

<div id="ribbon">
  {#each elements as element, i}
    <div
      style="background-color: {getColour(i)}; flex-grow: {getSize(element) *
        3};"
    >
      {Math.round(getSize(element))}
      <span class="running-total"
        >{Math.round(
          elements.slice(0, i + 1).reduce((acc, e) => acc + getSize(e), 0),
        )}</span
      >
    </div>
  {/each}
</div>

<style>
  #ribbon {
    display: flex;
    flex-wrap: wrap;
    height: 1.5rem;
    position: relative;
    justify-content: stretch;
    width: 100%;
  }
  #ribbon div {
    height: 100%;
    display: flex;
    place-content: center;
    position: relative;
    flex-basis: 0;
  }
  #ribbon .running-total {
    position: absolute;
    bottom: -1rem;
    right: 0rem;
    padding-right: 0.1rem;
    font-size: 0.8rem;
    max-width: 100%;
    border-right: 1px solid black;
    z-index: -1;
    text-justify: right;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
</style>
