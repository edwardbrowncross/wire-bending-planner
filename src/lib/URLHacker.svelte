<script lang="ts">
  import { encodeElements, type RibbonElement } from "./RibbonElement";

  export let elements: RibbonElement[];

  const encoded = encodeElements(elements);
  history.replaceState({}, "", `?elements=${encoded}`);
</script>

<div />