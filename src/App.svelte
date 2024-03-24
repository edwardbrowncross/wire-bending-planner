<script lang="ts">
  import { onMount } from "svelte";
  import { getColour } from "./lib/Colours";
  import CurveRenderer from "./lib/CurveRenderer.svelte";
  import ElementInput from "./lib/ElementInput.svelte";
  import FlatRenderer from "./lib/FlatRenderer.svelte";
  import UrlHacker from "./lib/URLHacker.svelte";
  import { decodeElements, type RibbonElement } from "./lib/RibbonElement";

  let elements: RibbonElement[] = [];

  function handleDelete(i: number) {
    elements = elements.filter((_, j) => i !== j);
  }

  function handleAddElement() {
    const lastElementType = elements[elements.length - 1]?.type;
    if (lastElementType === "straight") {
      elements = [...elements, { type: "bend", radius: 20, angle: 0 }];
    } else {
      elements = [...elements, { type: "straight", length: 20 }];
    }
  }

  const params = new URLSearchParams(location.search);
  const encoded = params.get("elements");
  if (encoded) {
    elements = decodeElements(encoded);
  }
</script>

<main>
  <h1>Ribbon Bending Planner</h1>
  {#key JSON.stringify(elements)}
    <UrlHacker {elements} />
    <CurveRenderer {elements} />
    <FlatRenderer bind:elements={elements} />
  {/key}

  <h2>Elements</h2>
  {#each elements as element, i}
    <ElementInput
      bind:element
      colour={getColour(i)}
      on:delete={() => handleDelete(i)}
    />
  {/each}
  <button type="button" on:click={handleAddElement}>Add Element</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
</style>
