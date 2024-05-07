<script lang="ts">
  import type { Venue } from "../../types/types";
  import { ellipsizeString } from "../../utils/helpers";

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
    <img
      alt=""
      src={data?.media[0]?.url ?? "https://i.stack.imgur.com/EzZiD.png"}
    />
  </div>
  <div class="venue-card__body">
    <h3 class="venue-card__title">{ellipsizeString(data?.name, 10, 10, 30)}</h3>
    <p class="venue-card__location">
      {ellipsizeString(
        data?.location?.city ??
          data?.location?.country ??
          data?.location?.continent ??
          "Mystery",
        10,
        10,
        50
      )}
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
    background-color: #85c4e6;
    height: 100%;
    @media (max-width: 450px) {
      width: calc(100vw - 30px);
      max-width: none;
    }
    &__body {
      margin-top: auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      padding-top: 8px;
      gap: 8px;
      width: 100%;
      color: black;
    }
    &__title {
      text-transform: uppercase;
      overflow-wrap: break-word;
    }
    &__location {
      font-weight: bold;
      color: black;
    }
    &__price {
      font-size: 24px;
    }
    &__img-container {
      margin-bottom: auto;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid black;
      overflow: hidden;
      background-color: #f2d027;

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
