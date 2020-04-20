<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
  import Bio from '../../components/Bio.svelte'
  import Figure from "../../components/PostFigure.svelte";
import marked from 'marked';
  import moment from 'moment';

export let post


</script>

<style>
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
  <title>{post.title}</title>
  <meta name="description" content="{post.excerpt}" />
  <!--<meta name="keywords" content="{post.metadata.keywords}"/>-->

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://brian.dev/blog/{post.slug}">
  <meta property="og:title" content="{post.title}">
  <meta property="og:description" content="{post.excerpt}">
  {#if post.image.url}
  <meta property="og:image" content="https://content.brian.dev{post.image.url}">
  {/if}

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://brian.dev/blog/{post.slug}">
  <meta property="twitter:title" content="{post.title}">
  <meta property="twitter:description" content="{post.excerpt}">
  {#if post.image.url}
  <meta property="twitter:image" content="https://content.brian.dev{post.image.url}">
  {/if}
</svelte:head>

<header>
  <p>{moment(post.published_at).format("MMMM Do, YYYY")}</p>
  <h1>{post.title}</h1>
  <hr />
</header>
<div class="container">

  <article class="content">
  <Figure
    source="https://content.brian.dev{post.image.url}"
    alt={post.title} />
    {@html marked(post.content)}
  </article>
  <hr />
  <Bio />
</div>
