<script context="module">
  export async function preload(page) {
    return this.fetch("/presentations.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        return { presentations: data };
      });
  }
</script>

<script>

import moment from 'moment';
  export let presentations;
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
  <title>Presentations :: Brian Ketelsen</title>
</svelte:head>

<div class="container">
  <h1>Presentations</h1>
  {#each presentations as pres, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2>
        <a  href="/slides/{pres.slug}.html">{pres.title}</a>
      </h2>
      <div class="post-item-details">
        <p>{pres.description}</p>
      </div>

      <div class="post-item-location">
        <a href={pres.event_url}>{pres.event_name}: {pres.event_location}</a>
      </div>
      <div class="post-item-footer">
        <span class="post-item-date">— {moment(pres.date).format('MMMM Do, YYYY')}</span>
      </div>
    </div>
  {/each}
</div>
