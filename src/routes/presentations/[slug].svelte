<script context="module">
  export async function preload(page) {
        const { slug } = page.params;
        return {slug} ;
  }
</script>


<script>
  export let slug;
window.location.replace(`/slides/${slug}.html`);
</script>