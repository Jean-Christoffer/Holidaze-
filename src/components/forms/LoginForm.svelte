<script lang="ts">
  import SnackBar from "../helpers/SnackBar.svelte";

  let password = "";
  let email = "";

  const mailRegex = /^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/;

  let emailError = "";
  let passwordError = "";

  let isDisabled: boolean = true;
  let message = "";
  let isSuccess: boolean;
  let showSnackbar: boolean = false;

  $: {
    emailError = validateEmail(email);
    passwordError = validatePassword(password);
    isDisabled = Boolean(emailError || passwordError);
  }

  $: {
    if (showSnackbar) {
      setTimeout(() => {
        return (showSnackbar = false);
      }, 2500);
    }
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
    showSnackbar = false;
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!data.success) {
        toggleSnackBar(data?.message, false);
        email = "";
        password = "";
      }
      if (data.success) {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  }
</script>

<div class="form_area">
  <h4 class="title">SIGN IN</h4>
  <form on:submit={submit} method="POST">
    <div class="form_group">
      <label for="email" class="sub_title">Email</label>
      <input
        type="email"
        name="email"
        id="email"
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
        id="password"
        bind:value={password}
        required
        class="form_style"
      />
      {#if passwordError}
        <div class="error">{passwordError}</div>
      {/if}
    </div>
    <div class="btn-container">
      <button class="btn" disabled={isDisabled}>SIGN IN!</button>
      <p>
        Dont have an Account? <a href="/register/" class="link"
          >Register Here!</a
        >
      </p>
    </div>
  </form>

  <SnackBar {message} show={showSnackbar} {isSuccess} {closeSnackBar} />
</div>
