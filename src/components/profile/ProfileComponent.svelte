<script lang="ts">
  import SnackBar from "../helpers/SnackBar.svelte";
  import ProfileTool from "./ProfileTool.svelte";
  import Modal from "../modal/ProfileModal.svelte";
  import type { User } from "../../types/types";

  export let data: User | null;

  $: userData = data;

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
  let message = "";
  let showSnackbar: boolean;
  let showModal: boolean;
  let isSuccess: boolean;

  $: {
    if (showSnackbar) {
      setTimeout(() => {
        return (showSnackbar = false);
      }, 2500);
    }
  }
  function closeSnackBar() {
    showSnackbar = false;
  }
  function toggleSnackBar(snackBarMessage: string, success: boolean) {
    message = snackBarMessage;
    isSuccess = success;
    return (showSnackbar = !showSnackbar);
  }

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/updateProfile", {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();

      if (!data.success) {
        errorMessage = data.message;
        toggleSnackBar(errorMessage, false);
        avatar = "";
        venueManager = false;
      }
      userData = data.result;
      toggleSnackBar("Profile updated!", true);
      avatar = "";
      venueManager = false;
    } catch (err) {
      console.log(err);
    }
  }

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

      <SnackBar {message} show={showSnackbar} {isSuccess} {closeSnackBar} />
    </div>
  </Modal>
{/if}
<ProfileTool data={userData} onClick={openModal} />

<style lang="scss">
  .form_area {
    position: relative;
    box-shadow: 20px 25px 2px var(--form-border-color);
    @media (max-width: 400px) {
      box-shadow: 8px 9px 2px var(--form-border-color);
    }
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
