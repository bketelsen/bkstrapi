<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`projects.json`).then(r => r.json()).then(projects => {
       return {projects};
		});
	}
</script>

<script>
  export let projects;
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
  <title>Projects :: Brian Ketelsen</title>
</svelte:head>

<div class="container">
  <h1>Projects</h1>
  {#await projects}
  <p>loading</p>
  {:then result}
  {#each projects as project,index }

    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2>
        <a rel=prefetch href="projects/{project.slug.toLowerCase()}">{project.title}</a>
      </h2>
      <p>{project.description}</p>
    </div>
  {/each}
  {/await}
</div>
