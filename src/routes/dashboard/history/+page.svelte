<script lang="ts">
    let recipeToDelete = $state<string | null>(null);
    const props = $props();
    const posted = props.data.posted.posted
    let showDeleteModal = $state(false)
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        return `${day}`;
    };
    const formatMonth = (dateStr: string) => {
        const date = new Date(dateStr);
        const month = date.toLocaleString("default", { month: "short" });
        return `${month}`;
    };
    const deletePost = async () => {
        if (!recipeToDelete) return;
        
        try {
            const res = await fetch(`http://localhost/spacefood/deleterecipe.php`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: recipeToDelete })
            });
            
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || "Delete failed");
            
            alert("Recipe deleted successfully!");
            closeDeleteModal();
            window.location.reload();
        } catch (error) {
            console.error("Delete error:", error);
            alert(error.message);
        }
    };
    const openDeleteModal = (id: string) => {
        recipeToDelete = id;
        showDeleteModal = true;
        console.log(recipeToDelete)
    };
    const closeDeleteModal = () => {
        showDeleteModal = false;
        recipeToDelete = null;
    };
</script>
<svelte:head>
  <title>Your recipe</title>
</svelte:head>
{#if showDeleteModal}
<div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <p class="text-xl font-semibold mb-2">Are you sure want to delete the recipe?</p>
      <hr />
      <div class="my-4">
        <form action="">
          <div class="grid grid-cols-1">
            <div class="my-2">
            </div>
          </div>
        </form>
      </div>
      <div class="flex justify-between">
        <button
          onclick={closeDeleteModal}
          type="button"
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Close
        </button>
        <button
          onclick={deletePost}
          type="button"
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
{/if}
<main class="py-4 mt-16 mb-16 md:ml-40">
    {#if posted}
    <h1 class="text-2xl font-semibold text-gray-800 mb-4 px-4">Your Recipe</h1>
    <div class="w-full">
        <div class="w-full px-4 py-3">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {#each posted as yourPost}   
                <div class="flex md:shadow-lg md:rounded-lg p-2 md:p-4 border-b-1 border-gray-900/70 md:border-none md:hover:bg-gray-100 duration-200">
                    <div class="min-w-10 max-w-12 text-center">
                        <p class="text-xl font-medium">{formatDate(yourPost.created_at)}</p>
                        <p class="text-sm font-light">{formatMonth(yourPost.created_at)}</p>
                    </div>
                    <div class="ml-4 flex w-full justify-between">
                        <a href="/viewpost/{yourPost.recipe_id}">
                            <p class="text-xl">{yourPost.title}</p>
                            <div class="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="14px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="oklch(0.704 0.191 22.216)"
                                    ><path
                                        d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                                    /></svg
                                >
                                <p class="text-red-400 text-sm">{yourPost.like_count}</p>
                            </div>
                        </a>
                        <div class="flex items-center gap-2">
                            <button onclick={() => openDeleteModal(yourPost.recipe_id)} class="bg-red-400 rounded-full aspect-square w-9 h-9" aria-label="delete"><svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg></button>
                            <a href="edithistory/{yourPost.recipe_id}" class="flex items-center rounded-full aspect-square w-9 h-9 bg-orange-400" aria-label="edit"><svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/></svg></a>
                        </div>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
    {:else}
        <p>You have no Post</p>
    {/if}
    
</main>
