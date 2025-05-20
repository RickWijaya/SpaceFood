<script lang="ts">
    let {data} = $props()
    let search_input = $state("");
    search_input = data.searchValue
    let renderedPost = $state(data.posted?.recipes || []);
    let filteredPost = $state([...renderedPost]);
    let displayedPost = $state([]);
    let renderedPage = $state(1);
    let hasMorePosts = $state(true);
    let isLoading = $state(false);
    updateDisplayedPost();
    async function searchrecipe() {
        renderedPage = 1;
        isLoading = true;
        try {
            const res = await fetch(`http://localhost/spacefood/searchpost.php?searchvalue=${search_input}&offset=0`, {
                credentials: "include"
            });
            const newData = await res.json();
            
            renderedPost = newData.recipes || [];
            filteredPost = [...renderedPost];
            hasMorePosts = newData.recipes?.length >= 9;
            updateDisplayedPost();
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            isLoading = false;
        }
    }

    async function nextPage() {
        if (renderedPage * 9 >= renderedPost.length && hasMorePosts) {
            await loadMorePosts();
        }
        
        if (renderedPage * 9 < filteredPost.length) {
            renderedPage++;
            updateDisplayedPost();
        }
    }

    function previousPage() {
        if (renderedPage > 1) {
            renderedPage--;
            updateDisplayedPost();
        }
    }

    function updateDisplayedPost() {
        displayedPost = filteredPost.slice((renderedPage - 1) * 9, renderedPage * 9);
    }

    async function loadMorePosts() {
        if (isLoading) return;
        isLoading = true;
        
        try {
            const response = await fetch(`http://localhost/spacefood/searchpost.php?searchvalue=${search_input}&offset=${renderedPost.length}`, {
                credentials: "include"
            });
            const newData = await response.json();
            
            if (newData.recipes?.length > 0) {
                renderedPost = [...renderedPost, ...newData.recipes];
                filteredPost = [...renderedPost];
                hasMorePosts = newData.recipes.length >= 9;
            } else {
                hasMorePosts = false;
            }
        } catch (error) {
            console.error("Failed to load more posts:", error);
        } finally {
            isLoading = false;
        }
    }

    const reset = () => {
        search_input = "";
    };
</script>
<svelte:head>
  <title>Search Recipe</title>
</svelte:head>
<header class="mt-24 md:mt-0 md:ml-40 bg-white py-10 px-4">
  <div class="flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
    <p class="text-center font-bold text-3xl text-gray-800 mb-8">
      What do you want to cook today?
    </p>
    <div class="flex w-full max-w-2xl items-center gap-2 relative">
      <input
        id="eventSearch"
        type="text"
        bind:value={search_input}
        class="w-full rounded-full border border-gray-300 bg-white px-5 py-3 pr-12 text-sm text-gray-700 shadow-md outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-400"
        placeholder="Search recipe..."
      />
        <button
          onclick={reset}
          type="button"
          aria-label="Reset"
          
          class="p-2 rounded-full absolute right-32 md:right-32 top-1/2 -translate-y-1/2 hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="black"
            viewBox="0 -960 960 960"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
        </button>
      <button
        onclick={searchrecipe}
        type="button"
        class="flex-shrink-0 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full px-6 py-3 transition"
      >
        Search
      </button>
    </div>
  </div>
</header>
<main class="px-4 py-2 md:ml-40 bg-white">
  <div class="md:mt-20 mt-35 mb-20 grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
      {#if displayedPost.length > 0}
      {#each displayedPost as post}
        <a
          href={"/viewpost/" + post.recipe_id}
          class="bg-white hover:bg-gray-50 p-3 border border-gray-200 rounded-xl shadow-lg hover:shadow-md transition-shadow duration-300 block"
        >
          <img
            src={post.thumbnail_url}
            alt={post.title}
            class="w-full h-50 object-cover rounded-lg mb-2"
          />
          <div>
            <div class="flex justify-between">
              <h5 class="text-sm font-bold text-gray-800 mb-1 line-clamp-2">
                {post.title}
              </h5>
              <div class="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#11e2939"
                  ><path
                    d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
                  /></svg
                >
                <h5 class="text-sm font-bold text-gray-800 mb-1">
                  {post.duration} min
                </h5>
              </div>
            </div>
            <p class="text-xs text-gray-500 mb-2 line-clamp-2">
              {post.content}
            </p>
            <div class="flex items-center justify-between mt-2">
              <div class="flex">
                <img
                  src={post.publisher_profile_image}
                  alt={post.publisher_username}
                  class="w-5 h-5 rounded-full border border-gray-300"
                />
                <span class="ml-2 text-gray-700 text-xs font-light">
                  {post.publisher_username}
                </span>
              </div>
              <p class="text-gray-700 text-xs font-light">{post.created_at}</p>
            </div>
          </div>
        </a>
      {/each}
      {:else}
      <h1 class="col-span-3 text-center text-gray-500 text-xl">
              No recipes found
      </h1>
  {/if}
</div>

{#if displayedPost.length > 0}
<div class="flex justify-center mb-10 space-x-4">
    <button
        onclick={previousPage}
        class="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
        disabled={renderedPage === 1 || isLoading}
    >
        Previous
    </button>
    <button
        onclick={nextPage}
        class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        disabled={(!hasMorePosts && renderedPage * 9 >= filteredPost.length) || isLoading}
    >
        {isLoading ? 'Loading...' : 'Next'}
    </button>
</div>
{/if}
</main>