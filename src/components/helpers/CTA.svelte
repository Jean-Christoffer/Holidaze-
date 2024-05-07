<script lang="ts">
  import type { Button } from "../../types/types";

  export let text: Button["text"];
  export let secondary: Button["secondary"] = false;
  export let action: Button["action"];
</script>

<figure>
  <a
    class={`${secondary ? "button-secondary" : "button-primary"} cta`}
    href={action}
  >
    {text}
  </a>
</figure>

<style lang="scss">
  .cta {
    text-align: center;
    padding: 8px 16px;
    font-family: "Courier Prime", monospace;
    font-size: 20px;
    text-decoration: none;
    display: block;
  }
</style>
