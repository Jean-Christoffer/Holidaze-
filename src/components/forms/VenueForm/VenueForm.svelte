<script lang="ts">
  import type { VenueForm } from "../../../types/types";
  import Meta from "./Meta.svelte";
  import Location from "./Location.svelte";
  import Progress from "./Progress.svelte";
  import { onMount } from "svelte";

  export let initialVenue: VenueForm | null = null;

  let currentStep = 1;

  let venue: VenueForm = {
    name: "",
    description: "",
    media: [
      {
        url: "",
      },
    ],
    price: 0,
    maxGuests: 1,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
    },
  };
  onMount(() => {
    if (initialVenue) {
      venue = { ...venue, ...initialVenue };
    }
  });
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  const nameRegex = /^[a-zA-Z0-9_ ]+$/;

  let descriptionError = "";
  let urlError = "";
  let nameError = "";
  let isDisabled: boolean = true;
  let steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  $: {
    nameError = validateName(venue.name);
    urlError = validateUrl(venue.media[0].url);
    descriptionError = validateDescription(venue.description);

    if (venue.price < 0) {
      venue.price = 1;
    }
    if (venue.price > 9999) {
      venue.price = 1000;
    }
    if (venue.maxGuests < 1) {
      venue.maxGuests = 1;
    }

    isDisabled = Boolean(
      nameError || urlError || descriptionError || venue.price < 1
    );
  }

  function validateName(name: string) {
    if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (!nameRegex.test(name)) {
      return "Name can only use a-Z, 0-9, and _.";
    }
    return "";
  }
  function validateDescription(description: string) {
    if (description.length < 3) {
      return "description must be at least 3 characters long.";
    }
    return "";
  }
  function validateUrl(url: string) {
    if (!urlPattern.test(url)) {
      return "Please enter a valid url.";
    }
    return "";
  }

  let currentActive: number = 1;

  function getSectionClass(stepNumber: number) {
    return currentStep === stepNumber ? "active" : "hidden";
  }
  function nextStep() {
    if (currentStep < 3) currentStep += 1;
    handleProgress(1);
  }

  function prevStep() {
    if (currentStep > 1) currentStep -= 1;
    handleProgress(-1);
  }
  async function submit(e: SubmitEvent) {
    e.preventDefault();

    try {
      const response = await fetch(
        initialVenue ? `/api/auth/updateVenue` : "/api/auth/createVenue",
        {
          method: "POST",
          body: JSON.stringify(venue),
        }
      );
      const data = await response.json();
      if (data.success) {
        handleProgress(1);

        let url;
        if (initialVenue) {
          url = new URL(window.location.origin);
        } else {
          const venueId = data.result.id;

          url = new URL(`${window.location.origin}/venues/${venueId}`);
        }

        window.location.href = url.toString();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleProgress(stepIncrement: number) {
    const newActive = currentActive + stepIncrement;
    currentActive = Math.max(1, Math.min(steps.length, newActive));
  }
</script>

<div class="form_area">
  <Progress {steps} {currentActive} />
  <h4 class="title">Create venue</h4>
  <form on:submit={submit}>
    {#if currentStep === 1}
      <div class={getSectionClass(1)}>
        <div class="form_group">
          <label for="name" class="sub_title">Name</label>
          <input
            class="form_style"
            type="text"
            bind:value={venue.name}
            placeholder="Venue Name"
            required
            name="name"
          />
          {#if nameError}
            <div class="error">{nameError}</div>
          {/if}
        </div>
        <div class="form_group">
          <label for="description" class="sub_title">Description</label>
          <textarea
          rows="4" cols="50"
            class="form_style"
            bind:value={venue.description}
            placeholder="Description"
            required
            name="description"
          ></textarea>
          {#if descriptionError}
            <div class="error">{descriptionError}</div>
          {/if}
        </div>
        <div class="form_group">
          <label for="image" class="sub_title">Image</label>

          <input
            type="text"
            bind:value={venue.media[0].url}
            placeholder="Image"
            required
            class="form_style"
            name="image"
          />
          {#if urlError}
            <div class="error">{urlError}</div>
          {/if}
        </div>
        <div class="form_group">
          <label for="price" class="sub_title">Price</label>

          <input
            type="number"
            bind:value={venue.price}
            placeholder="Price"
            min="1"
            required
            class="form_style"
            name="price"
          />
        </div>
      </div>
    {/if}
    {#if currentStep === 2}
      <div class={getSectionClass(2)}>
        <Meta bind:venue />
      </div>
    {/if}
    {#if currentStep === 3}
      <div class={getSectionClass(3)}>
        <Location bind:venue />
      </div>
    {/if}

    {#if currentStep === 4}
      <div>SUCCESSSSS</div>
    {/if}

    <div class="btn-container">
      {#if currentStep > 1}
        <button class="btn" type="button" on:click={prevStep}>Prev</button>
      {/if}
      {#if currentStep < 3}
        <button
          class="btn"
          type="button"
          on:click={nextStep}
          disabled={isDisabled}>Next</button
        >
      {/if}
      {#if currentStep === 3}
        <button class="btn" type="submit">Create venue</button>
      {/if}
    </div>
  </form>
</div>

<style lang="scss">
  .tabs {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    padding: 16px;
  }
  .form_area {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row !important;
    gap: 16px;
  }
  .btn {
    margin: 5px;
  }
  .hidden {
    display: none;
  }
  .active {
    display: block;
  }
</style>