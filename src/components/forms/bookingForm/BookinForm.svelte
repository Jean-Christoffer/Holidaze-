<script lang="ts">
  import { format } from "date-fns";
  import {
    calculateBookedDates,
    getDaysArray,
    selectDate,
    calculateDaysBetween,
    changeMonth,
  } from "./dateUtils";
  import type { Booking, DayInfo } from "../../../types/types.ts";

  export let bookings: Booking[];
  export let max: number = 0;
  export let id: string = "";
  export let price: number = 0;
  export let isLoggedIn: boolean = false;

  $: bookingData = bookings;

  let bookedDates: string[];
  let currentDate = new Date();
  let startDate: Date | undefined;
  let endDate: Date | undefined;
  let guestAmount: number = 1;
  let days: DayInfo[] = [];
  let numDays = 0;
  let isDisabled = true;
  let isBooked: boolean;

  const daysShort = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

  $: bookedDates = calculateBookedDates(bookingData);
  $: days = getDaysArray(currentDate, bookedDates, startDate, endDate);
  $: numDays = calculateDaysBetween(startDate, endDate);

  let result: any = { startDate: undefined, endDate: undefined, valid: true };

  $: {
    if (guestAmount >= max) guestAmount = max;
    if (guestAmount < 1) guestAmount = 1;
  }
  function handleSelectDate(date: Date) {
    result = selectDate(date, bookedDates, startDate, endDate);
    if (result.valid) {
      startDate = result.startDate;
      endDate = result.endDate;
      isDisabled = false;
    } else {
      isDisabled = true;
    }
  }
  $: if (startDate && endDate) {
    numDays = calculateDaysBetween(startDate, endDate);
  } else {
    numDays = 0;
  }

  $: isDisabled = numDays === 0 || !result.valid || !isLoggedIn;
  function handleMonthChange(offset: number) {
    currentDate = changeMonth(currentDate, offset);
  }
  function showBookedDates() {
    const latestBooking = bookingData[bookingData.length - 1];
    return `from ${format(latestBooking.dateFrom, "dd LLL yyyy")} to ${format(latestBooking.dateTo, "dd LLL yyyy")}`;
  }
  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isBooked = false;

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/bookVenue", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        isBooked = true;
        bookingData = data.data;
        setTimeout(() => {
          isBooked = false;
        }, 2500);
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<form on:submit={handleSubmit} class="booking-form">
  {#if !isBooked}
    <div class="calendar">
      <div class="calendar__header">
        <div class="calendar__title-container">
          <h3>2024</h3>
          <h2 class="month-year">{format(currentDate, "MMMM")}</h2>
        </div>
        <div class="calendar__title-btn-container">
          <button
            type="button"
            on:click={() => handleMonthChange(-1)}
            class="navigation left"
          >
            <img alt="" src="/svg/left.svg" />
          </button>
          <button
            type="button"
            on:click={() => handleMonthChange(1)}
            class="navigation right"
          >
            <img alt="" src="/svg/right.svg" />
          </button>
        </div>
      </div>
      <div class="calendar__day-names">
        {#each daysShort as dayName}
          <div class="calendar__day-name">{dayName}</div>
        {/each}
      </div>
      <div class="calendar__body">
        {#each days as day (day.formatted)}
          <button
            type="button"
            class="calendar__day {day.isSelected
              ? 'selected'
              : ''} {day.isInRange ? 'range' : ''}"
            on:click={() => handleSelectDate(day.date)}
            disabled={day.isDisabled}
          >
            <p>{format(day.date, "d")}</p>
          </button>
        {/each}
      </div>
      <div class="calendar__book-container">
        <label for="guests" class="label"
          ><p>Guests</p>
          <input
            type="number"
            name="guests"
            id="guests"
            bind:value={guestAmount}
            {max}
            min="1"
            class="guests"
          />
        </label>
        <p class="total-price">Total price: {price * numDays}</p>
        <div class="btn-container">
          <button type="submit" class="book-btn btn" disabled={isDisabled}
            >{#if !isLoggedIn}
              Log in to book
            {:else}
              Book now
            {/if}
          </button>
        </div>
      </div>
    </div>
    <input type="hidden" name="dateFrom" value={startDate || ""} />
    <input type="hidden" name="dateTo" value={endDate || ""} />
    <input type="hidden" name="venueId" value={id} />
  {:else}
    <div class="booking-form__success-message">
      <p>BOOKED!</p>
      <p class="date-from">{showBookedDates()}</p>
    </div>
  {/if}
</form>
<style>
  .book-btn{
    background-color: #f2d027 !important;
  }
</style>