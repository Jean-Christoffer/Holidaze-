<script lang="ts">
  import type { Venue } from "../../../types/types";
  export let data: any;
</script>

{#each data as result}
  <a href={`/venues/${result.id}`}>
    <figure class="search-results__card">
      <div class="search-results__img-container">
        <img alt="" src={result?.media[0]?.url} />
      </div>
      <div class="search-results__body">
        <p class="search-results__title">{result.name}</p>
        <p class="search-results__location">
          <em>
            {data?.location?.city ??
              data?.location?.country ??
              data?.location?.continent ??
              "Mystery"}
          </em>
        </p>
      </div>
    </figure>
  </a>
{/each}

<style lang="scss">
  a {
    text-decoration: none;
  }
  .search-results__card {
    width: 90%;
    display: flex;
    align-items: top;
    font-weight: bold;
    gap: 8px;
    font-size: 24px;
    background-color: #f2d027;
    .search-results__location{
        font-size: 20px;
    }
    .search-results__img-container {
      width: 100px;
      height: 100px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }
</style>
