
<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  

 const articles = writable(false);



  onMount(async () => {
    const { default: ApolloClient, gql, ...rest } = await import(
      "apollo-boost"
    );

    const ARTICLES = gql`
      {
        articles(where: { publications: { id: 1 } }) {
          id
          slug
		  title
		  excerpt
		  published_at
          category {
            name
            slug
          }
          image {
            url
          }
          content
        }
      }
    `;

    const client = new ApolloClient({
      uri: "https://content.brian.dev/graphql"
    });

    const a1 = await client.query({
      query: ARTICLES
    });
    articles.set(a1.data.articles);
    console.log($articles);
  });
</script>

<style>
  h1 {
    text-align: left;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 4rem 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }
</style>

<svelte:head>
  <title>Blog :: Brian Ketelsen</title>
</svelte:head>


<div class="container">
  <h1>Blog</h1>

{#if $articles}
  {#each $articles as post, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2>
        <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
      </h2>
      <p>{post.excerpt}</p>
      <div class="post-item-footer">
        <span class="post-item-date">— {post.published_at}</span>
      </div>
    </div>
  {/each}

{:else}

  <p>loading...</p>
{/if}

</div>
