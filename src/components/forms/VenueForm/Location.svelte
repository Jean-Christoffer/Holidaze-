<script lang="ts">
  import type { VenueForm } from "../../../types/types";

  export let venue: VenueForm;
</script>

<div class="form_group">
  <label for="adress" class="sub_title">Adress</label>

  <input
    type="text"
    bind:value={venue.location.address}
    placeholder="Address"
    name="adress"
    class="form_style"
  />
</div>

<div class="form_group">
  <label for="city" class="sub_title">City</label>

  <input
    type="text"
    bind:value={venue.location.city}
    placeholder="City"
    name="city"
    class="form_style"
  />
</div>

<div class="form_group">
  <label for="zip" class="sub_title">Zip</label>

  <input
    type="text"
    bind:value={venue.location.zip}
    placeholder="Zip"
    class="form_style"
  />
</div>

<div class="form_group">
  <label for="country" class="sub_title">Country</label>

  <input
    type="text"
    bind:value={venue.location.country}
    placeholder="Country"
    name="country"
    class="form_style"
  />
</div>

<div class="form_group">
  <label for="continent" class="sub_title">Continent</label>

  <input
    type="text"
    bind:value={venue.location.continent}
    placeholder="Continent"
    name="continent"
    class="form_style"
  />
</div>


