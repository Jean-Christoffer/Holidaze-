<script lang="ts">
  export let message = "";
  export let show: boolean = false;
  export let isSuccess: boolean = true;
  export let status: string = "";
  $: {
    if ((show = true)) {
      setTimeout(() => {
        return (show = false);
      }, 3500);
    }
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <figure class={isSuccess ? "alert success" : "alert error"} role="alert">
    <strong class="font-bold"
      >{isSuccess ? "Success!" : "Something went wrong"}</strong
    >
    <span class="block sm:inline">{message}.</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class="close-button" on:click={() => (show = !show)}>
      <svg
        class="fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        />
      </svg>
    </span>
  </figure>
{/if}

<style lang="scss">
  @mixin border-radius($radius) {
    border-radius: $radius;
  }
  figure {
    max-width: 350px;
    width: min(100%, 400px);
    margin-left: 16px;
    border: 3px solid black;
  }
  $success-colors: (
    bg: #d4edda,
    text: #155724,
    close-btn: #28a745,
  );

  $error-colors: (
    bg: #f8d7da,
    text: #721c24,
    close-btn: #dc3545,
  );

  .alert {
    @include border-radius(0.375rem);
    padding: 1rem 1rem;
    position: relative;
    animation-duration: 0.3s;
    animation-delay: 0.25s;

    &.success {
      background: map-get($success-colors, bg);
      color: map-get($success-colors, text);

      .close-button {
        color: map-get($success-colors, close-btn);
      }
    }

    &.error {
      background: map-get($error-colors, bg);
      color: map-get($error-colors, text);

      .close-button {
        color: map-get($error-colors, close-btn);
      }
    }

    strong {
      font-weight: bold;
    }

    span {
      display: block;
    }

    .close-button {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 1rem;
      background: none;
      border: none;
      cursor: pointer;

      svg {
        fill: currentColor;
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
</style>
