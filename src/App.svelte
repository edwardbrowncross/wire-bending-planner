<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { getColour } from "./lib/Colours";
  import CurveRenderer from "./lib/CurveRenderer.svelte";
  import ElementInput from "./lib/ElementInput.svelte";
  import FlatRenderer from "./lib/FlatRenderer.svelte";
  import {
    decodeElements,
    encodeElements,
    type RibbonElement,
  } from "./lib/RibbonElement";

  let elements: RibbonElement[] = [];

  function handleDelete(i: number) {
    elements = elements.filter((_, j) => i !== j);
  }

  function handleAddElement() {
    const lastElementType = elements[elements.length - 1]?.type;
    if (lastElementType === "straight") {
      let lastRadius;
      const lastBend = elements.filter((e) => e.type === "bend").slice(-1)[0];
      if (lastBend?.type === "bend") {
        lastRadius = lastBend?.radius;
      }
      elements = [
        ...elements,
        { type: "bend", radius: lastRadius ?? 4, angle: 0 },
      ];
    } else {
      elements = [...elements, { type: "straight", length: 20 }];
    }
  }

  onMount(() => {
    const params = new URLSearchParams(location.search);
    const encoded = params.get("elements");
    if (encoded) {
      elements = decodeElements(encoded);
    }
  });
  afterUpdate(() => {
    const encoded = encodeElements(elements);
    history.replaceState({}, "", `?elements=${encoded}`);
  });
</script>

<main>
  <h1>Wire Bending Planner</h1>
  {#key JSON.stringify(elements)}
    <CurveRenderer {elements} />
    <FlatRenderer bind:elements />
  {/key}

  <h2>Elements</h2>
  <div id="scroll-list">
    {#each elements as element, i}
      <ElementInput
        bind:element
        colour={getColour(i)}
        on:delete={() => handleDelete(i)}
      />
    {/each}
  </div>
  <button type="button" on:click={handleAddElement}>Add Element</button>
</main>

<style>
  h1 {
    text-align: center;
  }
  main {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 5rem);
  }

  #scroll-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 50vh;
    padding-right: 1rem;
    margin-bottom: 1rem;
  }
</style>
