<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let element: RibbonElement;
  export let colour: string;
  
  function handleChangeType(event: Event) {
    const select = event.target as HTMLSelectElement;
    element.type = select.value as RibbonElement["type"];
    if (element.type === "straight") {
      element.length = element.length ?? 20;
    } else {
      element.radius = element.radius ?? 20;
      element.angle = element.angle ?? 0;
    }
  }

  function handleDelete() {
    dispatch("delete");
  }
  
</script>

<fieldset>
  <legend style="background-color: {colour}">{element.type}</legend>
  <label>
    Type:
    <select bind:value={element.type} on:change={handleChangeType}>
      <option value="straight">Straight</option>
      <option value="bend">Bend</option>
    </select>
  </label>
  {#if element.type === 'straight'}
    <label>
      Length:
      <input type="number" bind:value={element.length} />
    </label>
  {:else}
    <label>
      Radius:
      <input type="number" bind:value={element.radius} min=0 max=360 />
    </label>
    <label>
      Angle:
      <input type="number" bind:value={element.angle} step={5} />
    </label>
  {/if}
  <button type="button" on:click={handleDelete}>❌</button>
</fieldset>

<style>
  legend {
    border-radius: 1rem;
    padding: 0rem 0.5rem;
  }

  fieldset {
    margin-bottom: 0.5rem;
    border-radius: 1rem;
    border: 0;
    background-color: whitesmoke;
    display: flex;
    align-items: center;
  }

  button {
    margin-left: auto;
    padding: 0.2rem;
    background: none;
  }

  button:hover {
    background-color: white;
  }

  input[type="number"] {
    width: 4rem;
  }

  input, select {
    padding: 0.3rem 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
  }

  label {
    margin-right: 1rem;
  }
</style>