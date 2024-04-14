<script lang="ts">
  import DarkmodeButton from "./uiComponents/DarkmodeButton.svelte";
  const routes = [
    {
      name: "Contact",
      route: "/contact/",
    },
    {
      name: "Login",
      route: "/login/",
    },
    {
      name: "Venues",
      route: "/venues/",
    },
  ];
</script>

<header class="header">
  <nav class="header__nav">
    <DarkmodeButton />
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
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    &__nav {
      padding: 16px;
      display: flex;
      justify-content: space-between;
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
