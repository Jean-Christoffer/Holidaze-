<script>
  export let steps = [];
  export let currentActive = 1;

  $: progressWidth = ((currentActive - 1) / (steps.length - 1)) * 100 + "%";
</script>

<div class="progress-container">
  <div class="progress" style="width: {progressWidth};"></div>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#each steps as step, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="circle {currentActive === i + 1 ? 'active' : ''}"
      data-title={step}
      on:click={() => (currentActive = i + 1)}
    >
      {i + 1}
    </div>
  {/each}
</div>

<style>
  .progress-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 10px;
    max-width: 350px;
    width: 100%;
    color: #85c4e6;
  }

  .progress-container::before {
    content: "";
    background-color: #e0e0e0;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: 0;
  }

  .progress {
    background-color: var(--background-color, #85c4e6);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    transition: width 0.4s ease;
  }

  .circle {
    background-color: #fff;
    color: #999;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #85c4e6;
    transition: border-color 0.4s ease;
    cursor: pointer;
    z-index: 5;
  }

  .circle.active {
    border-color: var(--background-color, #0077cc);
  }
</style>
