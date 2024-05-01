<script lang="ts">
  import type { Booking } from "../../../types/types";

  export let data: Array<Booking> = [];
  import { format } from "date-fns";

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/cancelbooking", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return (window.location.href = "/bookings");
    } catch (err) {
      console.log(err);
    }
  }
</script>

{#each data as booking}
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
          <p>
            {format(new Date(booking?.dateFrom), "dd LLL yyyy")} - {format(
              new Date(booking?.dateTo),
              "dd LLL yyyy"
            )}
          </p>
        </div>
        <form on:submit={submit}>
          <button>Cancel Booking</button>
          <input type="hidden" name="bookingId" value={booking?.id} />
        </form>
      </div>
    </figure>
  </div>
{/each}

<style lang="scss">
  .container {
    margin-bottom: 32px;
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
