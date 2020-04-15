<script context="module">
  import { client, PAGES} from "../lib/apollo";
  import { gql } from "apollo-boost";

  export async function preload(page) {
    let { slug } = page.params;
    return {
      slug: slug,
      cache: await client.query({
        query: PAGES
      })
    };
  }
</script>

<script>
 import Bio from '../components/Bio.svelte'
   import Figure from '../components/Figure.svelte'

  import marked from 'marked';
  import { restore, query } from "svelte-apollo";
  export let cache;
  export let slug;

  restore(client, PAGES, cache.data);
  let pages= [];
  pages = cache.data.pages.filter(function(e) {
    return e.slug.toLowerCase() === slug.toLowerCase();
  });
  let page = pages[0];


</script>


<style>
  figure {
    float: right;
    margin: -3em -7em 2em 2em;
    max-width: 400px;
  }

  figure img {
    border-radius: 8px;
  }

  @media (max-width: 1020px) {
    figure {
      float: none;
      margin: 0 auto 2em;
    }
  }
</style>

<svelte:head>
  <title>{page.title} :: Brian Ketelsen</title>
</svelte:head>


<div class="container">
  <h1>{page.title}</h1>
  <Figure source='https://content.brian.dev{page.featured_image.url}' photo_credit={page.photo_credit} photo_credit_url={page.photo_credit_url}/>
    {@html marked(page.content)}
</div>