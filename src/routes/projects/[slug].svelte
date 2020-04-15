<script context="module">
  import { client, PROJECTS } from "../../lib/apollo";
  import { gql } from "apollo-boost";

  export async function preload(page) {
    let { slug } = page.params;
    return {
      slug: slug,
      cache: await client.query({
        query: PROJECTS
      })
    };
  }
</script>

<script>
  import Bio from '../../components/Bio.svelte'
  import marked from 'marked';
  import { restore, query } from "svelte-apollo";
  export let cache;
  export let slug;
  restore(client, PROJECTS, cache.data);
  let projects = [];
  projects = cache.data.projects.filter(function(e) {
    return e.slug.toLowerCase() === slug.toLowerCase();
  });
  let project = projects[0];
</script>

<style lang="scss">
 header {
    text-align: center;
  }

  header h1 {
    margin-bottom: 0.7em;
  }

  header p {
    color: #AAA;
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
  <title>{project.title}</title>
</svelte:head>

<header>
  <h1>{project.title}</h1>
  <hr />
</header>
<div class="container">
  <article class="content">

    <p><a href='{project.github}'>Repository</a></p>
    {@html marked(project.content)}
  </article>
  <hr />
  <Bio />
</div>