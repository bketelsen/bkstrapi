<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { page: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>


<script>
  import Bio from "../components/Bio.svelte";
  import Figure from "../components/Figure.svelte";

export let page;

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
  <Figure
    source="https://content.brian.dev{page.image.url}"
    photo_credit={page.image.credit}
    photo_credit_url={page.image.credit_url} />
  {@html page.html}
</div>
