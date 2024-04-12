<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Venues } from "../../types/types";
  import { gsap } from "gsap";
  import _ from "lodash";

  export let data: Venues;

  type MarqueeInstance = {
    marquee: HTMLElement | null;
    marqueeContent: HTMLElement | null;
    tween: GSAPTween | null;
    duration: number; 
    direction: number; 
  };

  let marquees: MarqueeInstance[] = [];

  const countries = [
    "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan",
    "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia",
    "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland",
    "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
  ];

  const slogans = [
  "DISCOVER YOUR DREAM SPOT!",
  "EXPERIENCE PARADISE WITH US!",
  "UNFORGETTABLE GETAWAYS AWAIT",
  "EXPLORE THE EXTRAORDINARY",
  "SEE THE WORLD IN STYLE!"
];

  function initMarquee(row: string, duration: number = 15, direction: number = 1) {
    const marquee: HTMLElement | null = document.querySelector(`[data-marquee="marquee${row}"]`);
    if (!marquee) return;

    const marqueeContent = marquee.firstElementChild as HTMLElement | null;
    if (!marqueeContent) return;

    const marqueeContentClone = marqueeContent.cloneNode(true);
    marquee.appendChild(marqueeContentClone);

    const instance: MarqueeInstance = {
      marquee,
      marqueeContent,
      tween: null,
      duration,
      direction
    };
    marquees.push(instance);
    playMarquee(instance);
  }

  function playMarquee(instance: MarqueeInstance) {
    let progress = instance.tween ? instance.tween.progress() : 0;
    instance.tween && instance.tween.progress(0).kill();

    const { marqueeContent, marquee, duration, direction } = instance;
    if (!marqueeContent || !marquee) return;

    const width: number = marqueeContent.offsetWidth;
    const gap: number = parseInt(getComputedStyle(marqueeContent).columnGap, 10);
    const distanceToTranslate = direction * (gap + width);

    instance.tween = gsap.fromTo(
      marquee.children,
      { x: 0 },
      { x: distanceToTranslate, duration, ease: "none", repeat: -1 }
    );
    instance.tween.progress(progress);
  }

  onMount(() => {
    initMarquee("1", 10, -1);
    initMarquee("2", 10, -1);
    initMarquee("3", 55, -1);
    window.addEventListener("resize", _.debounce(() => {
      marquees.forEach(instance => playMarquee(instance));
    }, 500));
  });

  onDestroy(() => {
    marquees.forEach(instance => {
      if (instance.tween) { 
        instance.tween.kill();
      }
    });
    window.removeEventListener("resize", () => {
      marquees.forEach(instance => playMarquee(instance));
    });
  });
</script>

<div class="wrapper">
  <div class="marquee" data-marquee="marquee1">
    <div class="marquee-content">
      {#each slogans as slogan}
        <p class="text">{slogan}</p>
      {/each}
    </div>
  </div>
  <div class="marquee" data-marquee="marquee2">
    <div class="marquee-content">
      {#each countries as country}
        <p class="tex t">{country}</p>
      {/each}
    </div>
  </div>
  <div class="marquee" data-marquee="marquee3">
    <div class="marquee-content">
      {#each data as images}
      <figure>
        <img  alt="" src={images.media[0].url}/>
      </figure>
   
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper{
    margin: 50px 0;
  }
  .marquee {
    display: flex;
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem 0;
    grid-column-gap: 1rem;
    mask-image: linear-gradient(
      90deg,
      transparent,
      #fff 20%,
      #fff 80%,
      transparent
    );
    .marquee-content {
      display: flex;
      min-width: 100%;
      justify-content: space-around;
      flex: 0 0 auto;
      grid-column-gap: 1rem;
      .text {
        font-size: 34px;
        font-style: italic;
      }
    }
    figure{
      width: 200px;
      height: 200px;
      &:not(:last-child){
        margin-right: 16px;
      }
      img{
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>
