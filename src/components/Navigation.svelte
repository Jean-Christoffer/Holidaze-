<script lang="ts">
  import Search from "./Search/Search.svelte";

  export let user: string = "";

  let isVisible = false;
  let isUser: boolean;

  $: user ? (isUser = true) : (isUser = false);

  const routes = [
    {
      name: "Venues",
      route: "/venues/",
    },
  ];

  function handleActive() {
    isVisible = !isVisible;
    isVisible
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }
  let showMenu = false;

  function toggleNavbar() {
    showMenu = !showMenu;
    showMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }
</script>

<nav class="nav">
  <!-- svelte-ignore a11y-positive-tabindex -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    tabindex="2"
    class="overlay {showMenu ? 'nav-active' : 'nav-not-active'}"
    on:click={toggleNavbar}
    role="button"
    aria-roledescription="clickoverlay to exit menu"
  ></div>
  <div class="overlay hidden"></div>
  <button on:click={toggleNavbar} class="flex hamburger-container">
    <div
      class="hamburger {showMenu ? 'nav-active' : 'nav-not-active'}"
      aria-controls="nav"
      aria-expanded="false"
      role="button"
      aria-label="Toggle navigation menu"
    >
      <span class="line top"></span>
      <span class="line middle"></span>
      <span class="line bottom"></span>
    </div>
  </button>
  <ul class={showMenu ? "nav__ul nav-active" : " nav__ul nav-not-active"}>
    <button on:click={handleActive} class="search-btn search-mobile">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        height="25px"
        width="25px"
        version="1.1"
        id="_x32_"
        viewBox="0 0 512 512"
        xml:space="preserve"
      >
        <style type="text/css">
          .st0 {
            fill: #000000;
          }
        </style>
        <g>
          <path
            class="st0"
            d="M376.324,312.508c49.638-78.774,40.238-184.326-28.306-252.871c-79.507-79.515-208.872-79.515-288.388,0   c-79.507,79.516-79.507,208.873,0,288.379c68.536,68.544,174.115,77.935,252.88,28.306l135.668,135.676L512,448.186   L376.324,312.508z M296.543,296.542c-51.121,51.139-134.308,51.139-185.439,0c-51.121-51.121-51.112-134.299,0.009-185.43   c51.122-51.121,134.309-51.13,185.43-0.008C347.665,162.243,347.665,245.421,296.543,296.542z"
          />
        </g>
      </svg>
    </button>
    {#each routes as route}
      <li class="nav__ul__li">
        <a href={route.route}>{route.name}</a>
      </li>
    {/each}
    {#if !isUser}
      <li class="nav__ul__li">
        <a href="/login" class="text-gray-800 hover:text-gray-400">Login</a>
      </li>
    {/if}
  </ul>
  <button on:click={handleActive} class="search-btn search-desktop">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      height="25px"
      width="25px"
      version="1.1"
      id="_x32_"
      viewBox="0 0 512 512"
      xml:space="preserve"
    >
      <style type="text/css">
        .st0 {
          fill: #000000;
        }
      </style>
      <g>
        <path
          class="st0"
          d="M376.324,312.508c49.638-78.774,40.238-184.326-28.306-252.871c-79.507-79.515-208.872-79.515-288.388,0   c-79.507,79.516-79.507,208.873,0,288.379c68.536,68.544,174.115,77.935,252.88,28.306l135.668,135.676L512,448.186   L376.324,312.508z M296.543,296.542c-51.121,51.139-134.308,51.139-185.439,0c-51.121-51.121-51.112-134.299,0.009-185.43   c51.122-51.121,134.309-51.13,185.43-0.008C347.665,162.243,347.665,245.421,296.543,296.542z"
        />
      </g>
    </svg>
  </button>
  <Search {isVisible} handleVisible={handleActive} />
</nav>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  .nav {
    display: flex;
    align-items: center;
    font-family: "Courier Prime", monospace;
    font-weight: bold;
    font-size: 24px;
    position: relative;
    margin-right: 20px;
    @media (max-width: 1100px) {
      margin-right: 0;
    }

    &__ul {
      display: flex;
      list-style: none;
      gap: 16px;
      align-items: center;
      .search-mobile {
        display: none;
      }
    }
    a {
      text-decoration: none;
    }
    button {
      border: none;
      background: none;
      text-decoration: none;
      font-family: "Courier Prime", monospace;
      font-weight: bold;
      font-size: 24px;
    }
    .search-btn {
      font-size: 24px;
      margin: 0px 5px 5px 16px;
      svg path {
        fill: var(--text-color);
      }
      @media (max-width: 1100px) {
        &.search-desktop {
          display: none;
        }
        &.search-mobile {
          display: block;
          margin: 50px 0 0 0;
        }
      }
    }
    @media (max-width: 1100px) {
      &__ul {
        flex-direction: column;
        position: fixed;
        background-color: var(--search-background-color);
        align-items: start;
        justify-content: top;
        right: 0;
        top: 0;
        bottom: 0;
        left: 50%;
        text-align: right;
        padding: min(30vh, 2rem);
        gap: 2rem;
        transform: translateX(100%);
        transition: 0.4s ease-in-out;
        border-left: 3px solid var(--search-border-color);
        box-shadow: 4px 4px 0px black;
        &.nav-active {
          transform: translateX(0%);
        }
      }
    }
  }
  .line {
    width: 23px;
    height: 3px;
    background: var(--text-color);
    display: block;
    margin: 5px 0;
    position: relative;
  }
  .hamburger-container {
    z-index: 200;
  }
  .hamburger {
    background: transparent;
    border: none;
  }
  /*Hamburger menu Animation*/

  .hamburger .line {
    transition:
      0.6s,
      opacity 0.2s;
    transform-origin: center;
  }
  .hamburger.nav-active .top {
    transform: rotate(45deg) translate(8px, 7px);
  }
  .hamburger.nav-active .bottom {
    transform: rotate(-45deg) translate(4px, -3.5px);
  }
  .hamburger.nav-active .middle {
    opacity: 0;
  }
  @media (min-width: 1100px) {
    .hamburger-container {
      display: none;
    }
  }
  .overlay {
    background: black;
    opacity: 0.6;
    position: fixed;
    display: none;
    transition: 0.3s ease;
    z-index: 0;
  }
  .overlay.nav-active {
    display: block;
    pointer-events: all;
    transition-delay: 0s;
    cursor: pointer;
    z-index: 0;
    inset: 0;
  }
</style>
