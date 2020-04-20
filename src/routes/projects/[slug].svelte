<script context="module">

	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`projects/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { project: data };
		} else {
			this.error(res.status, data.message);
		}
	}

</script>

<script>
  import Bio from '../../components/Bio.svelte'
  import marked from 'marked';
  export let project;
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