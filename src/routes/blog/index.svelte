<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
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
<script>
  import marked from 'marked';
  import moment from 'moment';
  export let posts;
</script>

<svelte:head>
  <title>Blog :: Brian Ketelsen</title>
</svelte:head>

<div class="container">
  <h1>Blog</h1>

  {#await posts}
    <p>loading</p>

  {:then result}
    {#each posts as article,index }
    {#if index}
      <hr />
    {/if}
      <div class="post-item">
        <h2>
          <a rel="prefetch" href="blog/{article.slug.toLowerCase()}">
            {article.title}
          </a>
        </h2>
        <p>{@html marked(article.excerpt)}
        </p>
        <div class="post-item-footer">
          <span class="post-item-date">
            — {moment(article.date).format('MMMM Do, YYYY')}
          </span>
        </div>
      </div>
    {/each}
  {/await}
</div>
