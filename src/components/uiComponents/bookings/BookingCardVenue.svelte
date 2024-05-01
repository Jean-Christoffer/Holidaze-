<script lang="ts">
  import type { Booking } from "../../../types/types";

  export let data: Array<Booking> = [];
  import { format } from "date-fns";
</script>

<div class="container">
{#if data.length > 0}
  {#each data as booking}
    <figure class="container__body">
      <div class="container__body-wrapper">
        <div class="img-container">
          <img alt="" src={booking?.customer?.avatar?.url} />
        </div>
        <div>
          <h3>{booking?.customer?.name}</h3>
          <p>
            {format(new Date(booking?.dateFrom), "dd LLL yyyy")} - {format(
              new Date(booking?.dateTo),
              "dd LLL yyyy"
            )}
          </p>
        </div>
      </div>
    </figure>
  {/each}
  {:else}
  <p>No bookings yet</p>
  {/if}
</div>

<style lang="scss">
  .container {
    overflow-y: auto;
    max-height: 500px;
    &__body {
      margin-bottom: 16px;
      padding: 24px;
      background-color: #85c4e6;
      border-radius: 8px;
    }
    &__body-wrapper {
      display: flex;
      width: 100%;
      gap: 16px;
      align-items: center;

      h3 {
        margin-bottom: 8px;
      }
    }
    .img-container {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid black;
      box-shadow: var(--figure-border-shadow);
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>
