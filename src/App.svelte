<script lang="ts">
  import CurveRenderer from './lib/CurveRenderer.svelte'

  let elements: RibbonElement[] = [
    { type: 'straight', length: 100 },
    { type: 'bend', radius: 50, angle: 90 },
    { type: 'straight', length: 30 },
    { type: 'bend', radius: 50, angle: 45 },
    { type: 'straight', length: 20 },
    { type: 'bend', radius: 20, angle: 135 },
    { type: 'bend', radius: 20, angle: -135 },
    { type: 'straight', length: 20 },
    { type: 'bend', radius: 20, angle: 225 },
    { type: 'bend', radius: 40, angle: -45 },
    { type: 'bend', radius: 35, angle: -45 },
    { type: 'bend', radius: 25, angle: -45 },
    { type: 'bend', radius: 15, angle: -45 },
    { type: 'straight', length: 30 },
  ]
</script>

<main>
  <h1>Ribbon Bending Planner</h1>
  <CurveRenderer {elements} />
</main>

<style>
  
</style>
