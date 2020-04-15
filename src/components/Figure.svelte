<script>
    export let source;
    export let photo_credit_url;
    export let photo_credit;
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

<figure>
    <img src={source} alt={photo_credit}>
     <figcaption>Photo by <a href={photo_credit_url} target="_blank">{photo_credit}</a></figcaption>
</figure>