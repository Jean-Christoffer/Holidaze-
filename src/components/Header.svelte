<script lang="ts">
  import DarkmodeButton from "./uiComponents/DarkmodeButton.svelte";
  import Search from "./uiComponents/Search/Search.svelte"

  let isVisible = false
  
  const routes = [
    {
      name: "Venues",
      route: "/venues/",
    },
    {
      name: "Contact",
      route: "/contact/",
    },
    {
      name: "Login",
      route: "/login/",
    },
  ];
  $: if (typeof window !== 'undefined') {
      if (isVisible) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  function handleActive(){
        isVisible = !isVisible
    }
</script>

<header class="header">
  <nav class="header__nav">
    <div class="header__nav__tool-wrapper">
    <DarkmodeButton />
      <button on:click={handleActive} class="search-btn">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="25px" width="25px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve">
          <style type="text/css">
            .st0{fill:#000000;}
          </style>
          <g>
            <path class="st0" d="M376.324,312.508c49.638-78.774,40.238-184.326-28.306-252.871c-79.507-79.515-208.872-79.515-288.388,0   c-79.507,79.516-79.507,208.873,0,288.379c68.536,68.544,174.115,77.935,252.88,28.306l135.668,135.676L512,448.186   L376.324,312.508z M296.543,296.542c-51.121,51.139-134.308,51.139-185.439,0c-51.121-51.121-51.112-134.299,0.009-185.43   c51.122-51.121,134.309-51.13,185.43-0.008C347.665,162.243,347.665,245.421,296.543,296.542z"/>
          </g>
          </svg>
      </button>
      <Search isVisible={isVisible} handleVisible={handleActive}/>
    </div>
    <ul class="header__nav__ul">
      {#each routes as route}
        <li class="header__nav__ul__li">
          <a href={route.route}>{route.name}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  .search-btn{
    padding: 0 16px;
    border-left: none;
  }
  svg{
    display: block;
  }
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    &__nav {
      padding: 16px;
      display: flex;
      justify-content: space-between;
      &__tool-wrapper{
        display: flex;
        align-content: center;
      }
      &__ul {
        list-style: none;
        display: flex;
        align-items: center;
        position: relative;
        li {
          position: relative;
          padding-right: 16px;
        }
        a {
          text-decoration: none;
          font-family: "Courier Prime", monospace;
          font-weight: bold;
          font-size: 24px;
        }
      }
    }
  }
</style>
