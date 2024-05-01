<script lang="ts">
  import { onMount } from "svelte";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

  let gsap;

  onMount(async () => {
    const module = await import("gsap");
    gsap = module.default;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".kicker-1",
        start: "top 90%",
        end: "top 20%",
        scrub: true,
      },
    });
    tl.to(".img-wrapper", {
      scale: 0,
      opacity: 0,
      rotateZ: -180,
    });
    tl.to(".img-1", {
      opacity: 0,
    });
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".kicker-2",
        start: "top 90%",
        end: "top 20%",
        scrub: true,
      },
    });
    tl2.to(".img-wrapper", {
      scale: 1,
      opacity: 1,
      rotateZ: 0,
    });
    tl2.to(".img-2", {
      opacity: 1,
    });
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".kicker-3",
        start: "top 100%",
        end: "top 20%",
        scrub: true,
      },
    });
    tl3.to(".img-wrapper", {
      scale: 1,
    });
    tl3.to(".img-2", {
      scale: 1,
      opacity: 0,
    });

    tl3.to(".img-3", {
      scale: 1,
      opacity: 1,
    });

    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".kicker-4",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
    });
    tl4.to(".img-3", {
      scale: 1,
      opacity: 0,
    });
  });

  const slogans = [
    "Driven by the Joy of Travel",
    "Discovering the World with Passion",
    "Fuelled by Wanderlust",
    "Adventures Await the Eager Explorer",
  ];
</script>

<article class="article">
  <h1>WHY TRUST US?</h1>
  <div>
    <figure class="img-wrapper">
      <img class="img-1" alt="" src="/kicker1.jpg" />
      <img class="img-2" alt="" src="/kicker2.jpg" />
      <img class="img-3" alt="" src="/kicker3.jpg" />
      <img class="img-4" alt="" src="/kicker4.gif" />
    </figure>
  </div>
  {#each slogans as slogan, idx}
    <div class={`kicker kicker-${idx + 1}`}>
      <figure>
        <p>{slogan}</p>
      </figure>
    </div>
  {/each}
</article>

<style lang="scss">
  .article {
    width: 100%;
    position: sticky;
    top: 0;
    text-align: center;
    h1 {
      font-size: 50px;
    }
    div {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: sticky;
      justify-content: center;
      top: 0;
      border: none;
      .img-wrapper {
        max-width: 600px;
        width: 100%;
        max-height: 600px;
        height: 100%;
        position: relative;
        img {
          user-select: none;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          position: absolute;
        }
      }
    }
    .kicker {
      max-width: 300px;
      height: 100vh;
      z-index: 5000;
      display: block;
      margin: 0 auto;
      figure {
        padding: 20px;
        background-color: #4889ff;
        font-weight: bold;
        text-transform: uppercase;
        p {
          color: black;
        }
      }
    }
    .img-1 {
      z-index: 10;
    }
    .img-2 {
      z-index: 5;
    }
    .img-3 {
      z-index: 4;
    }
    .img-4 {
      z-index: 3;
    }
  }
  @media (max-width: 500px) {
    .article {
      padding: 0 16px;
      h1 {
        font-size: 40px;
      }
    }
  }
</style>
