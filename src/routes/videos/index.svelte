<script context="module">
  export async function preload(page) {
    return this.fetch("/youtube-recent.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        return { videos: data };
      });
  }
</script>

<script>

import moment from 'moment';
  export let videos;
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
  <title>Videos :: Brian Ketelsen</title>
</svelte:head>

<div class="container">
  <h1>Videos</h1>
  {#each videos as video, index}
    {#if index}
      <hr />
    {/if}
    <div class="post-item">
      <h2>
        <a  href="{video.url}">{video.title}</a>
      </h2>
     <p><a  href="{video.url}"><img alt={video.title} src={video.thumbnail.url}  /></a></p>
      <div class="post-item-footer">
        <span class="post-item-date">— {moment(video.date).format('MMMM Do, YYYY')}</span>
      </div>
    </div>
  {/each}
</div>
