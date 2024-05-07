<script lang="ts">
  export let venueId: string;
  async function submit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const response = await fetch("/api/deleteVenue", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return (window.location.href = "/venueBookings");
    } catch (err) {
      console.log(err);
    }
  }
</script>

<form on:submit={submit}>
  <div class="btn-container delte-btn">
    <button class="btn">Delete booking</button>
    <input value={venueId} type="hidden" name="venueid"/>
  </div>
</form>

<style lang="scss">
  .delte-btn {
    position: absolute;
    bottom:50px;
    right: 16px;
    button {
      padding: 15px;
      margin: 30px auto;
      width: 100%;
      font-size: 15px;
      background: #d93843;
      border-radius: 30px;
      font-weight: 800;
      border: 3px solid black;
      box-shadow: 5px 5px 0px 0px var(--border-color);
    }
  }
</style>
