<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import type { User } from "../../types/types";

  export let data: User | null;
  export let onClick:() => void;
  $: userData = data;

  let showMenu = false;
  function toggleShowMenu() {
    showMenu = !showMenu;
  }

</script>

<figure class="profile">
  <button on:click={toggleShowMenu}>
    <img alt="" src={userData?.avatar?.url} />
  </button>
  <div class="profile__info">
    <p class="profile__name"><strong>{userData?.name}</strong></p>
    <p class="profile__status">
      <em>{userData?.venueManager ? "Venuemanager" : "Valued customer"}</em>
    </p>
  </div>

  <Dropdown
    {showMenu}
    isVenueManager={userData?.venueManager}
    name={userData?.name}
    toggleMenu={toggleShowMenu}
    avatar={userData?.avatar?.url}
    onClick={onClick}
  />
</figure>

<style lang="scss">
  .profile {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    border: none;
    box-shadow: none;
    @media (max-width: 1100px) {
      gap: 0;
    }
    &__name,
    &__status {
      font-weight: normal;
      font-size: 16px;
      @media (max-width: 1100px) {
        display: none;
      }
    }

    button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 3px solid var(--text-color);
      background-color: var(--background-color);
      outline: none;
      overflow: hidden;
      margin: 0;
      padding: 0;
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
