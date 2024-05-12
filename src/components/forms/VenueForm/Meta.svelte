<script lang="ts">
  import type { VenueForm } from "../../../types/types";

  export let venue: VenueForm;
</script>

<div class="form_group">
  <label for="guests" class="sub_title">Max guests</label>

  <input
    type="number"
    bind:value={venue.maxGuests}
    placeholder="Max Guests"
    min="0"
    required
    class="form_style"
    id="guests"
    name="guests"
  />
</div>

<div class="form_group">
  <label for="rating" class="sub_title">Rating</label>

  <input
    type="number"
    bind:value={venue.rating}
    placeholder="Rating"
    min="0"
    max="5"
    name="rating"
    id="rating"
    class="form_style"
  />
</div>
<div class="checkbox-group">
  <div class="form_group">
    <label for="wifi" class="sub_title">Wifi</label>

    <input
      type="checkbox"
      name="wifi"
      id="wifi"
      bind:checked={venue.meta.wifi}
    />
  </div>
  <div class="form_group">
    <label for="parking" class="sub_title">Parking</label>

    <input
      type="checkbox"
      name="parking"
      id="parking"
      bind:checked={venue.meta.parking}
    />
  </div>
  <div class="form_group">
    <label for="breakfast" class="sub_title">Breakfast</label>

    <input
      type="checkbox"
      name="breakfast"
      id="breakfast"
      bind:checked={venue.meta.breakfast}
    />
  </div>
  <div class="form_group">
    <label for="pets" class="sub_title">Pets</label>

    <input
      type="checkbox"
      name="pets"
      id="pets"
      bind:checked={venue.meta.pets}
    />
  </div>
</div>

<style lang="scss">
  .checkbox-group {
    display: flex;
    justify-content: center;
    .form_group {
      align-items: center !important;
      margin: 10px;
      justify-content: center;
      input {
        display: block;
        height: 20px;
        width: 20px;
        margin-top: 6px;
      }
    }
  }
</style>
