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
        alt: "",
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
  let maxIndex = 2;
  let mediaUrls = initialVenue ? initialVenue.media.map((u) => u.url) : [""];

  function updateMediaUrls(index: number, event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      const newValue = target.value;
      mediaUrls[index] = newValue;

      if (newValue === "") {
        if (venue.media.length === 1) {
          venue.media[0] = { url: "", alt: "" };
        } else {
          mediaUrls.splice(index, 1);
          venue.media.splice(index, 1);
        }
      } else {
        if (urlPattern.test(newValue)) {
          if (venue.media.length > index) {
            venue.media[index] = {
              url: newValue,
              alt: "Venue image",
            };
          } else {
            venue.media.push({
              url: newValue,
              alt: "Venue image",
            });
          }

          if (index === venue.media.length - 1 && index !== maxIndex) {
            venue.media.push({ url: "", alt: "" });
            mediaUrls.push("");
          }
        }
      }
    }
    console.log(venue.media);
  }

  $: {
    nameError = validateName(venue.name);
    descriptionError = validateDescription(venue.description);
    urlError = validateUrl(venue?.media[0]?.url);

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

    function filterEmptyMedia(v: VenueForm) {
      return {
        ...v,
        media: venue.media.filter((m) => m.url),
      };
    }
    const filteredVenue = filterEmptyMedia(venue);

    try {
      const response = await fetch(
        initialVenue ? `/api/updateVenue` : "/api/createVenue",
        {
          method: initialVenue ? "PUT" : "POST",
          body: JSON.stringify(filteredVenue),
        }
      );
      const data = await response.json();
      if (data.success) {
        if (currentStep < 4) currentStep += 1;
        handleProgress(1);
        const venueId = data.result.id;
        let url;
        url = new URL(`${window.location.origin}/venues/${venueId}`);
        setTimeout(() => {
          window.location.href = url.toString();
        }, 2500);
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
            autocomplete="additional-name"
            id="name"
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
            id="description"
            rows="4"
            cols="50"
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
        {#each mediaUrls as mediaUrl, index}
          <div class="form_group">
            <label for={`media-url-${index}`} class="sub_title">
              {#if index === 0}
                Image {index + 1}
                <small class="info-label">* only one image is required</small>
              {:else}
                Image {index + 1}
              {/if}
            </label>
            <input
              type="text"
              id={`media-url-${index}`}
              name={`media-url-${index}`}
              bind:value={mediaUrl}
              on:input={(event) => updateMediaUrls(index, event)}
              class="form_style"
            />
            {#if urlError}
              <div class="error">{urlError}</div>
            {/if}
          </div>
        {/each}

        <div class="form_group">
          <label for="price" class="sub_title">Price</label>

          <input
            type="number"
            id="price"
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

    {#if currentStep > 3}
      {#if initialVenue}
        <div class="success"><p>Success! Venue is changed</p></div>
      {:else}
        <div class="success"><p>Success! Venue created!</p></div>
      {/if}
    {/if}

    <div class="btn-container">
      {#if currentStep > 1 && currentStep <= 3}
        <button class="btn" type="button" on:click={prevStep}>Previous</button>
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
  .info-label {
    font-size: 12px;
  }
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
  .success {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
</style>
