<script lang="ts">
  import SnackBar from "../helpers/SnackBar.svelte";

  let name = "";
  let email = "";
  let password = "";
  let bio = "";
  let avatar = "";
  let venueManager = false;
  let message = "";
  let isSuccess: boolean;
  let showSnackbar: boolean = false;

  const mailRegex = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  const nameRegex = /^[a-zA-Z0-9_]+$/;

  let nameError = "";
  let emailError = "";
  let passwordError = "";
  let urlError = "";

  let isDisabled: boolean = true;

  $: {
    nameError = validateName(name);
    emailError = validateEmail(email);
    passwordError = validatePassword(password);
    urlError = validateAvatar(avatar);
    isDisabled = Boolean(nameError || emailError || passwordError);
  }

  $: {
    if (showSnackbar) {
      setTimeout(() => {
        return (showSnackbar = false);
      }, 2500);
    }
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

  function validateEmail(email: string) {
    if (!mailRegex.test(email)) {
      return "Please enter a valid Noroff email address.";
    }
    return "";
  }

  function validatePassword(password: string) {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return "";
  }

  function validateAvatar(url: string) {
    if (!urlPattern.test(url)) {
      return "Please enter a valid url.";
    }
    return "";
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        toggleSnackBar(data?.message, false);
        name = "";
        email = "";
        password = "";
        bio = "";
        avatar = "";
        venueManager = false;
      }
      if (data.success) {
        toggleSnackBar("account created! logging you inn", true);
        setTimeout(() => {
          window.location.href = "/";
        }, 2500);
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="form_area">
  <h4 class="title">SIGN UP</h4>
  <form on:submit={submit} method="POST">
    <div class="form_group">
      <label for="name" class="sub_title">Name</label>
      <input
        type="text"
        name="name"
        bind:value={name}
        required
        class="form_style"
      />
      {#if nameError}
        <div class="error">{nameError}</div>
      {/if}
    </div>
    <div class="form_group">
      <label for="email" class="sub_title">Email</label>
      <input
        type="email"
        name="email"
        bind:value={email}
        required
        class="form_style"
      />
      {#if emailError}
        <div class="error">{emailError}</div>
      {/if}
    </div>
    <div class="form_group">
      <label for="password" class="sub_title">Password</label>
      <input
        type="password"
        name="password"
        bind:value={password}
        required
        class="form_style"
      />
      {#if passwordError}
        <div class="error">{passwordError}</div>
      {/if}
    </div>

    <div class="form_group">
      <label for="avatar" class="sub_title">Avatar</label>
      <input
        type="text"
        name="avatar"
        bind:value={avatar}
        required
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
      <button class="btn" disabled={isDisabled}>SIGN UP!</button>
      <p>
        Already have an Account? <a href="/login/" class="link">Sign in here!</a
        >
      </p>
    </div>
  </form>
  <SnackBar {message} show={showSnackbar} {isSuccess} {closeSnackBar} />
</div>

<style lang="scss">
  .form_area {
    position: relative;
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
    .btn-container {
      .btn {
        margin: 10px 30px 10px 30px;
      }
    }
  }
</style>
