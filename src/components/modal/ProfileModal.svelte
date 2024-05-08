<script lang="ts">
  export let visible = false;
  export let onClick: () => void;
</script>

<div class:visible>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="modal-overlay" on:click={onClick}></div>
  <div class="profile-modal">
    <button class="close-button" on:click={onClick}></button>
    <div class="profile-modal__content">
      <slot></slot>
    </div>
  </div>
</div>

<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .profile-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--modal-background-color);
    border-radius: 8px;
    padding: 0;
    z-index: 1000;
    max-width: 450px;
    width: 100%;
    padding: 20px;
    @media (max-width: 400px) {
      padding: 30px 10px;
    }
    &__content {
      padding: 30px;
      @media (max-width: 400px) {
        padding: 10px;
      }

      overflow: auto;
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    left: 10px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    &::after {
      content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="black" d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3.4 14L12 13.4L8.4 17L7 15.6l3.6-3.6L7 8.4L8.4 7l3.6 3.6L15.6 7L17 8.4L13.4 12l3.6 3.6z" /></svg>');
    }
  }

  .visible {
    display: block;
  }

  .visible .profile-modal {
    display: block;
  }

  .visible .modal-overlay {
    display: block;
  }
</style>
