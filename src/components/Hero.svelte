<script lang="ts">
  import Button from "./uiComponents/CTA.svelte";
</script>

<section class="hero">
  <article class="hero__article">
    <h1>Holidaze</h1>
    <figure>
      <img src="../../public/test.jpg" alt="" />
    </figure>
    <h2>Well, what are you waiting for?</h2>
    <p>
      Discover the ultimate getaway with Holidaze, your new go-to accommodation
      booking site. From cozy cottages to luxury resorts, Holidaze offers unique
      stays for every traveler. Start your adventure today and create
      unforgettable memories with Holidaze!
    </p>
    <div>
      <Button text="See Venues!" action="/venues/" />
    </div>
  </article>
</section>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat+Subrayada:wght@400;700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

  .hero {
    height: auto;
    margin: 50px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__article {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, fit-content(100%));
      h1 {
        font-family: "Montserrat Subrayada", sans-serif;
        font-size: 128px;
        grid-column: 1/3;
        grid-row: 1;
        text-align: center;
        margin-bottom: 30px;
      }
      h2 {
        font-family: "Montserrat", sans-serif;
        font-size: 64px;
        max-width: 546px;
        grid-row: 2;
        grid-column: 2;
      }
      p {
        font-family: "Courier Prime", monospace;
        font-size: 20px;
        max-width: 524px;
        grid-row: 3;
        grid-column: 2;
      }
      div{
        grid-row: 4;
        grid-column: 2;
        max-width: 200px;
      }
      figure {
        max-width: 320px;
        height: 413px;
        overflow: hidden;
        border-radius: 16px;
        transform: rotate(-3deg);
        grid-column: 1;
        grid-row: 2/5;
        justify-self: center;
        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
</style>
