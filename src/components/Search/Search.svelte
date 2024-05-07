<script lang="ts">
  import SearchResults from "./SearchResults.svelte";
  import { HolidazeGateWay } from "../../gateway/HolidazeGateway";
  import _ from "lodash";
  import { fade } from "svelte/transition";
  import { slide } from "svelte/transition";

  import type { Venue } from "../../types/types";

  let searchTerm: string = "";
  let data: Array<Venue>;

  export let isVisible: boolean;

  export let handleVisible: () => void;

  const holidazeGateWay = new HolidazeGateWay();

  const debounceFetch = _.debounce(async (query: string) => {
    if (query.trim() === "") {
      data = [];
    } else {
      const fetchedData = await holidazeGateWay.getVenues({ query: "" });
      const response = fetchedData?.data;
      data = Array.isArray(response) ? response : [response];
    }
  }, 500);

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const searchTerm = target.value;

    if (searchTerm.trim() === "") {
      debounceFetch.cancel();
      data = [];
    } else {
      debounceFetch(searchTerm);
    }
  }
  const fadeIn = {
    delay: 100,
    duration: 200,
  };

  const fadeOut = {
    delay: 0,
    duration: 100,
  };
</script>

{#if isVisible}
  <aside class="modal-container" in:fade={fadeIn} out:fade={fadeOut}>
    <div class="full-screen-container">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="overlay" on:click={handleVisible}></div>
      <div
        class="side-panel"
        out:slide={{ delay: 60, duration: 2000, axis: "x" }}
        class:expanded={isVisible}
      >
        <div class="panel-header">
          <button on:click={handleVisible} class="close-button">
            <svg
              fill="#000000"
              height="25px"
              width="25px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 1792 1792"
              xml:space="preserve"
            >
              <path
                d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4  c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1  c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"
              />
            </svg>
          </button>
          <h3 class="title">Search Holidaze</h3>
          <form class="search-form">
            <input
              type="text"
              on:input={handleChange}
              value={searchTerm}
              placeholder="search by title or location"
            />
          </form>
        </div>
        <div class="content-area">
          <div class="results-container">
            {#if data && data.length > 0}
              <SearchResults {data} />
            {:else if data && data.length < 1}
              <div class="no-results">
                <p>No results found</p>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </aside>
{/if}

<style lang="scss">
  svg {
    display: block;
  }
  .modal-container {
    z-index: 9999;

    .full-screen-container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .side-panel {
        background-color: var(--search-background-color);
        position: absolute;

        border-left: 3px solid var(--search-border-color);
        top: 0;
        right: 0;
        width: 400px;
        height: 100%;
        overflow: hidden;
        opacity: 1;
        transition: transform 2s ease-in-out;
        padding: 16px;

        &.expanded {
          transform: translateX(0);
        }
        @media (max-width: 500px) {
          width: 100vw;
          border-left: none;
        }
      }

      .panel-header {
        position: sticky;
        top: 0;
        padding: 8px;
        z-index: 10;

        .close-button {
          display: inline-block;
          text-transform: uppercase;
          align-content: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .title {
          padding-top: 12px;
          font-size: 30px;
          margin-bottom: 16px;
        }

        .search-form {
          display: flex;
          input {
            vertical-align: top;
            width: 87%;
            height: 40px;
            border: 3px solid black;
            outline: none;
            font-size: 1.1rem;
            line-height: 1.25rem;
            padding-left: 1rem;
            padding-right: 1rem;
            background-color: #f2d027;
            font-weight: bold;
          }
        }
      }

      .content-area {
        padding: 8px;
        overflow: auto;
        height: calc(100% - 150px);

        .results-container {
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;

          .results-button {
            text-align: left;
          }

          .no-results {
            margin-top: 16px;
            padding-left: 8px;
          }
        }
      }
    }
    .expanded {
      animation: showFromRight 0.35s ease-in-out forwards;
    }

    @keyframes showFromRight {
      0% {
        right: -50px;
        opacity: 0;
      }

      100% {
        opacity: 1;
        right: 0;
      }
    }
  }
</style>
