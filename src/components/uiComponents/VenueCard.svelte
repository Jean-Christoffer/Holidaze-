<script lang="ts">
  import type { Venue } from "../../types/types";
  import Cta from "./CTA.svelte";
  export let data: Venue;

  function cleanAndConvertPrice(price: number) {
    if (price > Number.MAX_SAFE_INTEGER) {
      console.warn(`Price exceeds maximum safe value: ${price}`);
      return 1000;
    }
    return price;
  }
</script>

<figure class="venue-card">
  <div class="venue-card__img-container">
    {#if data?.media[0]?.url}
      <img alt="" src={data?.media[0]?.url} />
    {/if}
  </div>
  <div class="venue-card__body">
    <h3 class="venue-card__title">{data?.name}</h3>
    <p class="venue-card__location">
      {data?.location?.city ??
        data?.location?.country ??
        data?.location?.continent ??
        "Mystery"}
    </p>
    <h4 class="venue-card__price">${cleanAndConvertPrice(data?.price)}</h4>
    <Cta action={`/venues/${data?.id}`} text="Details" />
  </div>
</figure>

<style lang="scss">
  .venue-card {
    border-radius: 4px;
    padding: 16px;
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #85C4E6;
    height: 100%;
    &__body {
      margin-top: auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      padding-top: 8px;
      gap: 8px;
      width: 100%;
    }
    &__title{
        text-transform: uppercase;
         overflow-wrap: break-word;
    }
    &__location{
        font-weight: bold;
    }
    &__price{
        font-size: 24px;
    }
    &__img-container {
      margin-bottom: auto;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid black;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>
