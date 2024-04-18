<script lang="ts">
  import SnackBar from "../uiComponents/SnackBar.svelte";


  let bio = "";
  let avatar = "";
  let venueManager = false;
  let banner = "";

  // Regex patterns
  const urlPattern = /^(http|https):\/\/[^ "]+$/;

  // Error messages
  let urlError = "";
  let bannerError = "";
  ("");

  // Reactive statements for error checking
  $: {
    urlError = validateAvatar(avatar);
    bannerError = validateAvatar(banner);
  }

  // Validation functions

  function validateAvatar(url: string) {
    if (!urlPattern.test(url)) {
      return "Please enter a valid url.";
    }
    return "";
  }
  let errorMessage = "";
  let showSnackbar: boolean;

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    showSnackbar = false;
 
    try {
    
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/update", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        errorMessage = data.message;
        showSnackbar = true;
        bio = "";
        avatar = "";
        banner = "";
        venueManager = false;
      }
      window.location.href = "/profile";
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="form_area">
  <h4 class="title">SIGN IN</h4>
  <form on:submit={submit}>
    <div class="form_group">
      <label for="bio" class="sub_title">Bio</label>
      <input type="text" name="bio" bind:value={bio} class="form_style" />
    </div>
    <div class="form_group">
      <label for="avatar" class="sub_title">Avatar</label>
      <input
        type="text"
        name="avatar"
        bind:value={avatar}
       
        class="form_style"
      />
      {#if urlError}
        <div class="error">{urlError}</div>
      {/if}
    </div>
    <div class="form_group">
      <label for="banner" class="sub_title">Banner</label>
      <input
        type="text"
        name="banner"
        bind:value={banner}
  
        class="form_style"
      />
      {#if bannerError}
        <div class="error">{bannerError}</div>
      {/if}
    </div>
    <div class="form_group venueManager">
      <label for="venueManager" class="sub_title">Venuemanager</label>
      <input
        type="checkbox"
        name="venueManager"
        bind:checked={venueManager}
        class="venuemanager"
      />
    </div>
    <div class="btn-container">
      <button class="btn">Update!</button>
    </div>
  </form>
  {#if showSnackbar}
    <SnackBar message={errorMessage} show={true} isSuccess={false} />
  {/if}
</div>

<style lang="scss">
  .form_area {
    .form_group {
      margin: 5px 20px;
      &.venueManager {
        flex-direction: row;
        align-items: center;
        gap: 16px;
        input {
          display: block;
          height: 20px;
          width: 20px;
          margin-top: 6px;
        }
      }
    }
  }
</style>
