<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import marked from 'marked';
  import Bio from "../../components/Bio.svelte";
 import readingTime from 'reading-time';

  const article = writable(false);
  const md = writable(false);
  const reading = writable(false);

  onMount(async () => {
    const { default: ApolloClient, gql, ...rest } = await import(
      "apollo-boost"
    );

    const ARTICLES = gql`
      query Article($slug: String!){
        articles(where: { slug: $slug, publications: { id: 1 } }) {
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
      query: ARTICLES,
      variables: { slug: "Byobu-on-WSL" }
    });

    article.set(a1.data.articles[0]);
    md.set(marked($article.content));
    reading.set(readingTime($md));

    console.log($article);
  });
</script>

<style>
  header {
    text-align: center;
  }

  header h1 {
    margin-bottom: 0.7em;
  }

  header p {
    color: #aaa;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: 600;
  }

  header hr {
    min-width: 100px;
    width: 30%;
  }
</style>

<svelte:head>
  <title>{$article.title} :: Brian Ketelsen</title>
</svelte:head>

{#if $article}
    <header>
      <p>{$article.published_at} ~ {$reading.text}</p>
      <h1>{$article.title}</h1>
      <hr />
    </header>
    <div class="container">
      <article class="content">
        {@html $md}
      </article>
      <hr />
      <Bio />
    </div>
{:else}
  <p>loading...</p>
{/if}
