<script lang="ts">
  export let number: number;

  function getStarType(index: number, rating: number): string {
    const floorRating = Math.floor(rating);
    if (index < floorRating) {
      return "full";
    }
    if (index === floorRating && rating % 1 !== 0) {
      return "half";
    }
    return "empty";
  }
</script>

{#each Array(5) as _, index}
  <svg class="star" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fill=""
      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
      class={getStarType(index, number) === "full" ? "full" : "empty"}
    />
    {#if getStarType(index, number) === "half"}
      <path
        fill=""
        clip-path="polygon(0 0, 50% 0, 50% 100%, 0% 100%)"
        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
      />
    {/if}
  </svg>
{/each}

<style>
  svg {
    stroke: black;
  }
  .star {
    width: 34px;
    height: 34px;
    display: inline-block;
  }
  .full {
    fill: #f2d027;
  }
  .empty {
    fill: none;
  }
</style>
