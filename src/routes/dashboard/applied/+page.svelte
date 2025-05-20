<script>
    export let data;
    const listed = data.favorite.favorites;
</script><svelte:head>
  <title>Favorite</title>
</svelte:head>
<main class="px-4 py-2 md:ml-40 bg-white ">
  <div class="mt-13 md:mt-0 mb-20 grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
    {#if listed}
      {#each listed as posts}
      <a
      href={"/viewpost/" + posts.recipe_id}
      class=" bg-white hover:bg-gray-50 p-3 border border-gray-200 rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 block"
    >
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img
        src={posts.thumbnail_url}
        alt="Event Image"
        class="w-full h-50 object-cover rounded-lg mb-2"
        />
      <div>
        <div class="flex justify-between">
          <h5 class="text-sm font-bold text-gray-800 mb-1 line-clamp-2">
            {posts.title}
          </h5>
          <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="24px" fill="#11e2939"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
            <h5 class="text-sm font-bold text-gray-800 mb-1">
              {posts.duration} Min
            </h5>
          </div>
        </div>
        <p class="text-xs text-gray-500  mb-2 line-clamp-2">
          {posts.content}
        </p>
        <div class="flex items-center justify-between mt-2">
          <div class="flex">
            <img
              src={posts.publisher_profile_image}
              alt="Publisher"
              class="w-5 h-5 rounded-full border border-gray-300"
            />
            <span class="ml-2 text-gray-700 text-xs font-light"
              >{posts.publisher_username}</span
            >
          </div>
          <p class="text-gray-700 text-xs font-light">{posts.created_at}</p>
        </div>
      </div>
    </a>
      {/each}
    {:else}
      <h1>No Post Available</h1>
    {/if}
  </div>
</main>