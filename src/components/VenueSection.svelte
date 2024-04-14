<script lang="ts">
  import VenueCard from "./uiComponents/VenueCard.svelte";
  import type { Venues } from "../types/types";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  export let data: Venues;

  let venues = data.sort(
    (a, b) => cleanAndConvertPrice(b.price) - cleanAndConvertPrice(a.price)
  );

  let isSortedDescending = true;
  let isSortedByDateDescending = true;

  function cleanAndConvertPrice(price: number) {
    if (price > Number.MAX_SAFE_INTEGER) {
      return 1000;
    }
    return price;
  }

  function handleSortPrice() {
    isSortedDescending = !isSortedDescending;
    venues = [...venues].sort((a, b) => {
      const priceA = cleanAndConvertPrice(a.price);
      const priceB = cleanAndConvertPrice(b.price);
      return isSortedDescending ? priceB - priceA : priceA - priceB;
    });
    return venues;
  }

  function handleSortDate() {
    isSortedByDateDescending = !isSortedByDateDescending;
    venues = [...venues].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);

      return isSortedByDateDescending
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    return venues;
  }
</script>

<div class="section">
  <div class="tool-bar">
    <figure class="tool-bar__wrapper">
      <div>
        <button on:click={handleSortPrice} disabled={false}
          >PRICE {isSortedDescending ? "Descending" : "Ascending"}</button
        >
      </div>
      <div>
        <button on:click={handleSortDate} disabled={false}
          >CREATED {isSortedByDateDescending
            ? "Descending"
            : "Ascending"}</button
        >
      </div>
    </figure>
  </div>
  <section>
    {#if venues}
      {#each venues as venue (venue.id)}
        <div animate:flip={{ delay: 100, duration: 1300, easing: quintOut }}>
          <VenueCard data={venue} />
        </div>
      {/each}
    {/if}
  </section>
</div>

<style lang="scss">
  ul {
    list-style: none;
  }
  .section {
    max-width: 1000px;
    margin: 0 auto;
  }
  .tool-bar {
    padding: 16px;
    width: 100%;
    &__wrapper {
      background-color: #85c4e6;
      border-radius: 4px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 16px;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      text-transform: uppercase;
      padding: 8px;
      font-weight: bold;
      background-color: #f2d027;
      width: 180px;
      text-align: center;
    }
  }
  section,
  ul {
    display: flex;
    gap: 16px;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
    flex-wrap: wrap;
    align-content: stretch;
    align-items: stretch;
  }
</style>
