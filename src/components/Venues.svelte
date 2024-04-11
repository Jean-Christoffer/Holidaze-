<script>
    export let data
    let venues
    $:venues = data.data
</script>

<figure>
{#if data}
    {#each venues as block}
      <article class="venue">
        <div class="venue__img-container">
          <img src={block.media[0].url} alt="" />
        </div>
        <div>
          <h3>{block.name}</h3>
          <p>{block.description}</p>
          <p>{block.price}</p>
        </div>
      </article>
    {/each}

{/if}
</figure>

<style lang="scss">
    .venue{
        max-width: 300px;
        background-color: white;
        &__img-container{
            width: 300px;
            height: 150px;
            img{
                height: 100%;
                width: 100%;
                display: block;
                object-fit: cover;
                object-position: center;
            }

        }
    }
</style>
