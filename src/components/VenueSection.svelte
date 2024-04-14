<script lang="ts">
  import VenueCard from "./uiComponents/VenueCard.svelte";
  import type {Venues} from "../types/types"
  export let data:Venues

  let venues = data.sort((a, b) => cleanAndConvertPrice(b.price) - cleanAndConvertPrice(a.price) )

  let isSortedDescending = true;

  function cleanAndConvertPrice(price: number) {
    if (price > Number.MAX_SAFE_INTEGER) {
      return 1000;
    }
    return price;
  }

  function handleSortPrice(){
    isSortedDescending = !isSortedDescending; 
    venues = [...venues].sort((a, b) => {
      const priceA = cleanAndConvertPrice(a.price);
      const priceB = cleanAndConvertPrice(b.price);
      return isSortedDescending ? priceB - priceA : priceA - priceB;
    });
 return venues
  }
</script>

<div class="section">
  <div class="tool-bar">
    <figure class="tool-bar__wrapper">
      <div>
        <button on:click={handleSortPrice} disabled={false}>PRICE {isSortedDescending ? "Descending" : "Ascending"}</button>
      
      </div>
    </figure>
  </div>
<section>
  {#if venues}
  {#each venues as venue}
  <VenueCard data={venue} />
  {/each}
  {/if}
</section>
</div>
<style lang="scss">
  .section{
    max-width: 1000px;
    margin: 0 auto;
  }
  .tool-bar{
    padding: 16px;
    width: 100%;
    &__wrapper{
      background-color: #85C4E6;
      border-radius: 4px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 16px;
    }
    button{
      text-transform: uppercase;
      padding: 8px;
      font-weight: bold;
      background-color: #f2d027;
      width: 200px;
      text-align: center;
    }
  }
  section{
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