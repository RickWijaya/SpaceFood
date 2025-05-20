<script>
    import { fade } from "svelte/transition";
    let { type , message } = $props()
    import "../main.css"
  </script>
  
<notifaction class="z-[1000] flex items-center" transition:fade={{ duration: 2000 }}>
    {message}
</notifaction>