<script lang="ts">
  export let onClick: () => void;
  export let isVenueManager = false;
  export let showMenu = false;
  export let name = "";
  export let avatar = "";
  export let toggleMenu: () => void;
</script>

<ul class={`settings ${showMenu ? "show" : "hide"}`}>
  <div class="mobile-menu">
    <button on:click={toggleMenu}></button>
    <div class="mobile-info">
      <div class="img-container">
        <img alt="" src={avatar} />
      </div>
      <li><p class="name">{name}</p></li>
      <li>
        <p class="status">
          <em>{isVenueManager ? "Venuemanager" : "Valued customer"}</em>
        </p>
      </li>
    </div>
  </div>
  <li><a href="/bookings">My bookings</a></li>
  {#if isVenueManager}
    <li><button id="modal3-trigger">Create venue</button></li>
    <li><a href="/venueBookings">Manage venues</a></li>
  {/if}
  <li><button on:click={onClick}>Edit profile</button></li>
  <li class="li-form">
    <form action="/logout" method="POST">
      <button type="submit">Logout</button>
    </form>
  </li>
</ul>

<style lang="scss">
  .settings {
    padding: 16px;
    border-radius: 8px;
    border: 3px solid black;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: red;
    height: auto;
    position: absolute;
    top: 80px;
    align-items: flex-start;
    opacity: 0;
    visibility: hidden;
    transition:
      visibility 0s linear 0.24s,
      opacity 0.24s linear,
      transform 0.24s ease-out;
    background-color: var(--btn-backround);
    box-shadow: var(--figure-border-shadow);
    width: max-content;
    @media (max-width: 1100px) {
      position: fixed;
      width: 100%;
      height: 100%;
      inset: 0;
      box-shadow: none;
      border: none;
      border-radius: 0;
      margin-top: 8px;
      z-index: 200;
    }
    &.show {
      visibility: visible;
      opacity: 1;
      transform: translateY(-8px);
      transition:
        opacity 0.24s linear,
        transform 0.24s ease-out;
    }

    a {
      text-decoration: none;
      color:black;
      font-weight: bold;
    }

    button {
      background: none;
      font-size: 16px;
      border: none;
      outline: none;
      font-family: "Courier Prime", monospace;
      color:black;
      font-weight: bold;
    }
  }
  .mobile-menu {
    display: none !important;
    text-decoration: none;
    color: var(--text-color);
    font-weight: bold;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    align-items: center;
    justify-items: center;
    @media (max-width: 1100px) {
      display: block !important;
    }
    button {
      position: absolute;
      right: 0px;
      &::after {
        content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" ><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="black" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" /></g></svg>');
        width: 20px;
        height: 20px;
      }
    }

    .name {
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .status {
      border-bottom: 3px solid black;
      padding-bottom: 10px;
      font-weight: normal;
    }
    .img-container {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid black;
      background-color: var(--background-color);
      outline: none;
      overflow: hidden;
      margin: 0;
      padding: 0;
      margin-bottom: 16px;
      img {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
        overflow: hidden;
      }
    }
  }
</style>
