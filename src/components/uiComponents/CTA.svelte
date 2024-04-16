<script lang="ts">
  import type { Button } from "../../types/types";

  export let text: Button["text"];
  export let secondary: Button["secondary"] = false;
  export let action: Button["action"];
</script>

<a
  class={`${secondary ? "button-secondary" : "button-primary"} button`}
  href={action}
>
  {text}
</a>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  .button {
    text-align: center;
    padding: 8px 16px;
    font-family: "Courier Prime", monospace;
    font-size: 20px;
    text-decoration: none;
    display: block;
  }
</style>
