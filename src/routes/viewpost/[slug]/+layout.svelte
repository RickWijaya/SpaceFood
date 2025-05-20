<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { LayoutData } from '../$types';
    import logo from "$lib/Logo.png"
    let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<header class="print:hidden">
    <div class="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <a href="/dashboard" aria-label="dashboard" class="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
          <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/>
        </svg>
      </a>
      <div class="flex items-center space-x-3">
        <img class="w-10 h-10" src={logo} alt="logo" />
        <p class="text-xl font-semibold tracking-wide text-gray-800">SPACEFOOD</p>
      </div>
    </div>
    
  </header>
{@render children()}