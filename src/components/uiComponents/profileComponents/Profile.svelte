<script lang="ts">
  import SnackBar from "../SnackBar.svelte";
  import ProfileTool from "./ProfileTool.svelte";
  import Modal from "./ProfileModal.svelte";
  import type { User } from "../../../types/types";

  export let data: User | null;

  $: userData = data;

  let bio = "";
  let avatar = "";
  let venueManager = false;

  const urlPattern = /^(http|https):\/\/[^ "]+$/;

  let urlError = "";

  $: {
    urlError = validateAvatar(avatar);
  }

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
      const response = await fetch("/api/auth/updateProfile", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();

      if (!data.success) {
        errorMessage = data.message;
        showSnackbar = true;
        bio = "";
        avatar = "";
        venueManager = false;
      }
      userData = data.result;
    } catch (err) {
      console.log(err);
    }
  }
  let showModal = false;

  function openModal() {
    showModal = true;
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    showModal = false;
    document.body.style.overflow = "auto";
  }
</script>

{#if showModal}
  <Modal onClick={closeModal}>
    <div class="form_area">
      <h4 class="title">UPDATE PROFILE</h4>
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
  </Modal>
{/if}
<ProfileTool data={userData} onClick={openModal} />

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
