<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let element: RibbonElement;
  
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
      <input type="number" bind:value={element.radius} />
    </label>
    <label>
      Angle:
      <input type="number" bind:value={element.angle} />
    </label>
  {/if}
  <button type="button" on:click={handleDelete}>Delete</button>
</fieldset>