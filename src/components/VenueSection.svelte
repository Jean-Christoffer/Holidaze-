<script lang="ts">
  import VenueCard from "./VenueCard.svelte";
  import type { Venue } from "../types/types";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";

  export let data: Array<Venue>;

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

  $: showSortMenu = false;
  function toggleMenu() {
    showSortMenu = !showSortMenu;
  }
</script>

<div class="section">
  <div class="tool-bar">
    <figure class="tool-bar__wrapper">
      <div>
        <div class="btn-container">
          <button on:click={toggleMenu} disabled={false} class="btn"
            ><span>SORTING OPTIONS</span>

            <img
              class={showSortMenu ? "active" : ""}
              src="https://tonyschocolonely.tinloof.com/images/arrow-down.svg"
              alt="Down"
              width="41"
              height="40"
            />
          </button>
        </div>
      </div>
      {#if showSortMenu}
        <div class="sorting-container">
          <div class="sorting-options">
            <button
              class="sorting-button inverse"
              aria-label="price ascending"
              on:click={handleSortPrice}
            >
              {#if isSortedDescending}
                <span>Price decending</span>
              {:else}
                <span>Price ascending</span>
              {/if}
            </button>
            <button
              class="sorting-button"
              aria-label="price descending"
              on:click={handleSortDate}
            >
              {#if isSortedByDateDescending}
                <span>Date decending</span>
              {:else}
                <span>Date ascending</span>
              {/if}
            </button>
          </div>
        </div>
      {/if}
    </figure>
  </div>
  <section>
    {#if venues}
      {#each venues as venue (venue.id)}
        <div animate:flip={{ delay: 100, duration: 600, easing: quintOut }}>
          <VenueCard data={venue} />
        </div>
      {/each}
    {:else}
      <p></p>
    {/if}
  </section>
</div>

<style lang="scss">
  .section {
    max-width: 1000px;
    margin: 0 auto 50px auto;
  }
  .tool-bar {
    padding: 16px;
    width: 100%;
    &__wrapper {
      background-color: #85c4e6;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px;
      gap: 8px;
      flex-wrap: wrap;
      position: relative;
    }
    button {
      width: 300px;
      padding: 15px;
      display: flex;
      align-items: center;
      margin: 0 auto;
      gap: 8px;
      font-size: 20px;
      background: #f2d027;
      border-radius: 30px;
      border-color: black;
      font-weight: 800;
      box-shadow: 5px 5px 0px 0px var(--form-border-color);
      @media (max-width: 450px) {
        font-size: 16px;
      }
      img {
        transform: rotate(0deg);
        transition: 0.3s ease-in-out;
        &.active {
          transform: rotate(180deg);
          transition: 0.3s ease-in-out;
        }
      }
      @media (max-width: 450px) {
        width: auto;
      }
    }
  }
  section {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: flex-start;
    max-width: 1000px;
    margin: 0 auto;
    padding: 16px;
    flex-wrap: wrap;
    align-content: stretch;
    align-items: stretch;
  }
  .sorting-container {
    display: flex;
    justify-content: space-between;
    position: absolute;
    right: 0;
    left: 0;
    top: calc(100% + 20px);
    gap: 10px;
    border: 3px solid black;
    background-color: #85c4e6;
    color: black;
    z-index: 30;
    border-radius: 4px;
    padding: 16px;
    @media (min-width: 1024px) {
      top: calc(100% + 20px);
      padding: 16px;
      border-radius: 4px;
    }
    .sorting-button {
      justify-content: center;
    }
    .sorting-options {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      width: 100%;
      justify-content: center;
    }
  }
</style>
