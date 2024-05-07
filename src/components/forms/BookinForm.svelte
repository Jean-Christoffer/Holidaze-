<script lang="ts">
  import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    format,
    isBefore,
    isAfter,
    isToday,
    differenceInCalendarDays,
    startOfWeek,
    endOfWeek,
    addDays,
    subDays,
  } from "date-fns";

  import type { Booking, DayInfo } from "../../types/types.ts";

  export let bookings: Booking[];
  export let max: number = 0;
  export let id: string = "";
  export let price: number = 0;

  $: bookingData = bookings;
  $: numDays = 0;
  let bookedDates: string | string[];
  let currentDate = new Date();

  let startDate: Date | undefined;
  let endDate: Date | undefined;
  let guestAmount: number = 1;
  let startDateFormatted: string | undefined;
  let endDateFormatted: string | undefined;
  let days: DayInfo[] = [];
  let success: boolean;
  let isDisabled: boolean = true;

  $: {
    if (guestAmount >= max) guestAmount = max;
    if (guestAmount < 1) guestAmount = 1;
  }
  $: startDateFormatted = startDate
    ? format(startDate, "yyyy-MM-dd")
    : undefined;
  $: endDateFormatted = endDate ? format(endDate, "yyyy-MM-dd") : undefined;

  $: bookedDates = bookingData.flatMap((d) => {
    const start = new Date(d.dateFrom);
    const end = new Date(d.dateTo);
    let days = [];

    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      days.push(format(dt, "yyyy-MM-dd"));
    }

    return days;
  });

  $: {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    days = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
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
          (isToday(day) &&
            format(new Date(), "yyyy-MM-dd") !== formattedDate) ||
          bookedDates.includes(formattedDate),
      };
    });
  }
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
    if (startDate && endDate) {
      const daysBetween = differenceInCalendarDays(endDate, startDate);
      isDisabled = false;

      numDays = daysBetween;
    } else {
      isDisabled = true;
    }
  }

  function changeMonth(offset: number) {
    currentDate = addMonths(currentDate, offset);
  }

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
        bookingData = data.data;
        setTimeout(() => {
          success = false;
        }, 2500);
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
        <label for="guests" class="label"
          ><p>Guests</p>
          <input
            type="number"
            name="guests"
            bind:value={guestAmount}
            {max}
            min="1"
            class="guests"
          />
        </label>
        <p class="total-price">Total price: {price * numDays}</p>
        <div class="btn-container">
          <button type="submit" class="book-btn btn" disabled={isDisabled}
            >Book now</button
          >
        </div>
      </div>
    </div>
    <input type="hidden" name="dateFrom" value={startDateFormatted || ""} />
    <input type="hidden" name="dateTo" value={endDateFormatted || ""} />
    <input type="hidden" name="venueId" value={id} />
  {:else}
    <div class="success-message">
      <p>BOOKED!! Payment at arrival</p>
    </div>
  {/if}
</form>

<style lang="scss">
  svg {
    display: block;
  }
  .label {
    display: flex;
    align-items: center;
    align-self: flex-start;
    margin-left: 16px;
    gap: 16px;
    p {
      color: black;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
    }
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
    flex-direction: column;
    gap: 0;
  }
  .total-price {
    align-self: flex-start;
    margin-left: 16px;
    font-weight: bold;
    color: black;
    font-size: 20px;
  }
  .guests {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 16px;
    height: 30px;
    width: 60px;
    border: 2px solid black;
    outline: none;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .btn {
      padding: 15px;
      margin: 16px auto;
      width: 100%;
      font-size: 15px;
      background: var(--btn-backround);
      border-radius: 30px;
      border-color: black;
      font-weight: 800;
      box-shadow: 5px 5px 0px 0px var(--form-border-color);
    }
    .btn:disabled {
      cursor: not-allowed !important;
    }

    p {
      margin: 20px 0px;
    }
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
