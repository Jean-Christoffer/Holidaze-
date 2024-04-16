<script lang="ts">
  import type { User } from "../../../types/types";
  export let data: User | null;
</script>

<figure class="banner" style="background-image: url({data?.banner?.url});">
  <div class="banner__body">
    <div class="banner__avatar">
      <img alt="avatar" src={data?.avatar?.url} />
    </div>
    <article class="banner__info">
      <div class="banner__bio">
        <p class="banner__name"><strong>{data?.name}</strong></p>
        <p class="banner__status">
          <em>{data?.venueManager ? "Venuemanager" : "Valued customer"}</em>
        </p>
      </div>
    </article>
  </div>
</figure>

<style lang="scss">
  .banner {
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    background-color: #85c4e6;
    border-radius: 16px;
    &__body {
      padding: 8px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    &__avatar {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;
      border: 3px solid black;
      background-color: #f2d027;
      padding: 8px;
      box-shadow: 4px 4px 0px black;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
      }
    }
    &__bio {
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 18px;
      text-shadow: 1px 2px 0px rgb(255, 255, 255);
    }
    &__name{
        font-size: 19px;
        text-transform: uppercase;
        font-weight: bold;
    }
    &__status {
      font-weight: 600;
      color: black;
    }
  }
</style>
