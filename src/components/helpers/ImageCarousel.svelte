<script lang="ts">
  import { register } from "swiper/element/bundle";
  import type { Media } from "../../types/types";

  export let images: Media[];

  register();
</script>

<div>
  <swiper-container
    navigation={true}
    pagination={{
      hideOnClick: false,
      clickable: true,
    }}
    slides-per-view={1}
  >
    {#each images as image}
      <swiper-slide class="img-container">
        <img src={image.url} alt="" />
      </swiper-slide>
    {/each}
  </swiper-container>
</div>

<style lang="scss">
  .img-container {
    width: 100%;
    max-width: 700px;
    height: 390px;

    position: relative;
    border-bottom: 3px solid black;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }
  swiper-container {
    --swiper-pagination-color: #f2d027;
    --swiper-navigation-color: #f2d027;
  }
</style>
