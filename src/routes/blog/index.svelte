<script context="module">
  import { client, ARTICLES } from "../../lib/apollo";
  import { gql } from "apollo-boost";

  export async function preload() {
    return {
      cache: await client.query({
        query: ARTICLES
      })
    };
  }
</script>

<script>
  import { restore, query } from "svelte-apollo";
  import moment from "moment";
  import marked from "marked";

  export let cache;
  restore(client, ARTICLES, cache.data);

  // query a subset of the preloaded (the rest if for Account)
  const articles = query(client, { query: ARTICLES });
</script>

<style>
  h2,
  .post-item-footer {
    font-family: Rubik, sans-serif;
    font-weight: 700;
  }

  .post-item-date {
    color: #AAA;
    text-align: left;
    text-transform: uppercase;
    margin-right: 16px;
  }

  hr {
    margin: 60px auto;
  }
</style>

<svelte:head>
  <title>Blog :: Brian Ketelsen</title>
</svelte:head>

<div class="container">
  <h1>Blog</h1>

  {#await $articles}
    <p>loading</p>

  {:then result}
    {#each result.data.articles as article,index }
    {#if index}
      <hr />
    {/if}
      <div class="post-item">
        <h2>
          <a rel="prefetch" href="blog/{article.slug.toLowerCase()}">
            {article.title}
          </a>
        </h2>
        <p>
          {@html marked(article.excerpt)}
        </p>
        <div class="post-item-footer">
          <span class="post-item-date">
            — {moment(article.published_at).format('MMMM Do, YYYY')}
          </span>
        </div>
      </div>
    {/each}
  {/await}
</div>
