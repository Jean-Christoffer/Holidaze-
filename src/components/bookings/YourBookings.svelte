<script lang="ts">
  import type { Booking } from "../../types/types";

  export let data: Array<Booking> = [];
  $: bookingData = data;

  import { format } from "date-fns";

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/cancelbooking", {
        method: "DELETE",
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.success) {
        bookingData = responseData.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

{#if bookingData.length > 0}
  <h1>Bookings & Trips</h1>
{:else}
  <h1>No bookings yet</h1>
{/if}
{#each bookingData as booking}
  <div class="container">
    <div class="container__title">
      <h2>{booking?.venue?.location?.city ?? "Mystery town"}</h2>
      <p><em>{booking?.venue?.location?.country ?? "Mystery country"}</em></p>
    </div>
    <figure class="container__body">
      <div class="container__body-wrapper">
        <div class="img-container">
          <img alt="" src={booking?.venue?.media[0]?.url} />
        </div>
        <div>
          <h3>{booking?.venue?.name}</h3>
          <p class="date">
            {format(new Date(booking?.dateFrom), "dd LLL yyyy")} - {format(
              new Date(booking?.dateTo),
              "dd LLL yyyy"
            )}
          </p>
        </div>
        <form on:submit={submit}>
          <button class="cancel"></button>
          <input type="hidden" name="bookingId" value={booking?.id} />
        </form>
      </div>
    </figure>
  </div>
{/each}

<style lang="scss">
  h1 {
    font-size: 100px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 40px;
    }
  }
  .container {
    margin-bottom: 32px;
    .cancel {
      border: none;
      background-color: transparent;
      padding: 0;
      margin: 0;
      &::after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="black" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3.4 14L12 13.4L8.4 17L7 15.6l3.6-3.6L7 8.4L8.4 7l3.6 3.6L15.6 7L17 8.4L13.4 12l3.6 3.6z" /></svg>');
      }
    }
    h3,
    .date {
      color: black;
    }
    &__title {
      h2 {
        margin-bottom: 4px;
      }
    }
    &__body {
      margin-top: 24px;
      padding: 24px;
      background-color: #85c4e6;
      border-radius: 8px;
    }
    &__body-wrapper {
      display: flex;
      width: 100%;
      gap: 16px;

      h3 {
        margin-bottom: 8px;
      }
      form {
        margin-left: auto;
      }
    }
    .img-container {
      width: 80px;
      height: 80px;
      border-radius: 4px;
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
