<script lang="ts">
  //TODO: Everything works but its rushed, verbose and hard to read.. Refactoring is needed here.
  import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    format,
    isBefore,
    isAfter,
    isToday,
  } from "date-fns";

  import type { Booking } from "../../types/types.ts";

  export let bookings: Booking[];
  export let max: number = 0;
  export let id: string = "";

  let bookedDates: string | string[];
  let currentDate = new Date();

  let startDate: Date | undefined;
  let endDate: Date | undefined;
  let guestAmount: number = 1;
  let startDateFormatted: string | undefined;
  let endDateFormatted: string | undefined;

  $: if (guestAmount > max) {
    guestAmount = max;
  }

  $: startDateFormatted = startDate
    ? format(startDate, "yyyy-MM-dd")
    : undefined;
  $: endDateFormatted = endDate ? format(endDate, "yyyy-MM-dd") : undefined;

  $: bookedDates = bookings.flatMap((d) => {
    const start = new Date(d.dateFrom);
    const end = new Date(d.dateTo);
    let days = [];

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      days.push(format(dt, "yyyy-MM-dd"));
    }

    return days;
  });

  $: days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  }).map((day) => {
    const formattedDate = format(day, "yyyy-MM-dd");
    return {
      date: day,
      formatted: formattedDate,
      isSelected:
        (startDate && format(startDate, "yyyy-MM-dd") === formattedDate) ||
        (endDate && format(endDate, "yyyy-MM-dd") === formattedDate),
      isInRange:
        startDate &&
        endDate &&
        isAfter(day, startDate) &&
        isBefore(day, endDate),
      isDisabled:
        isBefore(day, new Date()) ||
        (isToday(day) && format(new Date(), "yyyy-MM-dd") !== formattedDate) ||
        bookedDates.includes(formattedDate),
    };
  });

  function selectDate(date: Date) {
    const formattedDate = format(date, "yyyy-MM-dd");
    if (!bookedDates.includes(formattedDate)) {
      if (!startDate || (startDate && endDate)) {
        startDate = date;
        endDate = undefined;
      } else if (startDate && isAfter(date, startDate)) {
        endDate = date;
      } else {
        endDate = startDate;
        startDate = date;
      }
    }
  }

  function changeMonth(offset: number) {
    currentDate = addMonths(currentDate, offset);
  }
  let success: boolean;

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    success = false;

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/book", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        success = true;

        setTimeout(() => {
          window.location.href = `${id}`;
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const daysShort = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
</script>

<form on:submit={handleSubmit}>
  {#if !success}
    <div class="calendar">
      <div class="calendar__header">
        <div class="calendar__title-container">
          <h3>2024</h3>
          <h2 class="month-year">{format(currentDate, "MMMM")}</h2>
        </div>
        <div class="calendar__title-btn-container">
          <button
            type="button"
            on:click={() => changeMonth(-1)}
            class="navigation left"
          >
            <img alt="" src="/svg/left.svg" />
          </button>
          <button
            type="button"
            on:click={() => changeMonth(1)}
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
            on:click={() => selectDate(day.date)}
            disabled={day.isDisabled}
          >
            <p>{format(day.date, "d")}</p>
          </button>
        {/each}
      </div>
      <div class="book-container">
        <input
          type="number"
          name="guests"
          bind:value={guestAmount}
          {max}
          min="1"
          class="guests"
        />
        <button type="submit" class="book-btn">Book now</button>
      </div>
    </div>
    <input type="hidden" name="dateFrom" value={startDateFormatted || ""} />
    <input type="hidden" name="dateTo" value={endDateFormatted || ""} />
    <input type="hidden" name="venueId" value={id} />
  {:else}
    <div class="success-message">
      <p>BOOKED!!</p>
    </div>
  {/if}
</form>

<style lang="scss">
  svg {
    display: block;
  }
  .calendar {
    margin: 0 20px;
    position: relative;
    width: 350px;
    @media (max-width: 1100px) {
      font-size: 12px;
    }
    .navigation {
      border: 2px solid black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      margin: 0;
      height: 30px;
      width: 30px;
      font-weight: bold;
      font-size: 16px;
      margin-top: 25px;
      background-color: #f27ea9;
    }
    &__title-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    &__title-btn-container {
      display: flex;
      gap: 16px;
      align-content: center;
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      gap: 8px;
      font-weight: bold;
      position: relative;

      .month-year {
        display: block;
        font-size: 36px;
        @media (max-width: 1100px) {
          font-size: 24px;
        }
      }
    }
    &__body {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      gap: 8px;
    }
    &__day {
      padding: 10px 0px;
      border: none;
      background: none;
      font-size: 16px;
      font-weight: bold;
      @media (max-width: 1100px) {
        font-size: 12px;
      }

      &.selected {
        background-color: #9b67bf;
        color: white;
      }
      &.range {
        background-color: #9b67bf;
        opacity: 0.4;
      }
      &:hover {
        background-color: #9b67bf;
      }
      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        box-shadow: none;
        border: none;
        background-color: transparent;
        &:hover {
          box-shadow: none;
          border: none;
          background-color: transparent;
        }
      }
    }
  }
  .book-container {
    display: flex;
    align-items: center;
    gap: 0;
    border: 3px solid black;
    background-color: var(--background-color);
  }
  .guests {
    padding: 15px;
    outline: none;
    border: none;
    border-right: 3px solid black;
    height: 100%;
    display: block;
    font-size: 16px;
    font-weight: 800;
    width: 100px;
  }
  .book-btn {
    width: 150px;
    border: none;
    padding: 15px;
    display: block;
    font-size: 15px;
    background-color: var(--background-color);
    font-weight: 800;
    text-transform: uppercase;
  }

  .calendar__day-names {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  }

  .calendar__day-name {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
  .success-message {
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: 60px;
      color: green;
    }
  }
</style>
