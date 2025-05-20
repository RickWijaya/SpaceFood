<script>
    import noProfile from "$lib/image.png"
// @ts-nocheck
  const props = $props();
  let copyModal = $state(false);
  let reportModal = $state(false);
  let readMoreDesc = $state(false);
  const toggleDesc = () => {
    readMoreDesc = !readMoreDesc;
  };
  let commentContent = $state("");
  let reportContent = $state("");
  // @ts-ignore
  let yourComment = $state([]);
  let saved = $state(props.data.viewData.favorited);
  let liked = $state(props.data.viewData.liked);
  let logged = $state(props.data.viewData.logged);
  const recipeInfo = props.data.viewData.recipe;
  const author = props.data.viewData.author;
  const ingredients = props.data.viewData.ingredients;
  const steps = props.data.viewData.steps;
  const comment = props.data.viewData.comments;
  const accountInfo = props.data.viewData.UserInfo;
  let likeCount = $state(props.data.viewData.like_count);
  let copied = $state(false);
  let loginModal = $state(false);
  // frontend function
  const printRecipe = () => {
    print();
  };
  const showCopyLink = () => {
    copyModal = !copyModal;
    copied = false;
  };
  const showReportModal = () => {
    reportModal = !reportModal;
  }
  const closeLoginModal = () => {
    loginModal = false;
  };
  const uploadReport = async () => {
    if (!logged) {
      loginModal = true;
      return;
    }
    try {
      const response = await fetch(
        `http://localhost/spacefood/report.php?id=${recipeInfo.recipe_id}&reason=${encodeURIComponent(reportContent)}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        alert("Reported Post")
        reportModal = false
      } else {
        alert(data.error);
        reportModal = false
      }
    } catch (error) {
      alert(error)
      reportModal = false
    }
  }
  const uploadcomment = async () => {
    if (!logged) {
      loginModal = true;
      return;
    }
    try {
      const response = await fetch(
        `http://localhost/spacefood/addcomment.php?id=${recipeInfo.recipe_id}&comment=${encodeURIComponent(commentContent)}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.success) {
        const commentData = {
          name: accountInfo.username,
          commented: commentContent,
          profile: accountInfo.profile_image_url,
          date: data.created_at,
        };
        yourComment.push(commentData);
        commentContent = "";
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error uploading comment:", error);
    }
  };

  const likePost = async () => {
    if (!logged) {
      loginModal = true;
      return;
    }
    try {
      const response = await fetch(
        `http://localhost/spacefood/likerecipe.php?id=${recipeInfo.recipe_id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        liked = !liked;
        likeCount = Number(likeCount) || 0;
        likeCount += liked ? 1 : -1;
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  const savePost = async () => {
    if (!logged) {
      loginModal = true;
      return;
    }
    try {
      const response = await fetch(
        `http://localhost/spacefood/favorite.php?id=${recipeInfo.recipe_id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        saved = !saved;
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };
</script>
<svelte:head>
  <title>{recipeInfo.title}</title>
</svelte:head>
{#if copyModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <p class="text-xl font-semibold mb-2">Share with Friends!</p>
      <hr />
      <div class="my-4">
          <div class="grid grid-cols-1">
            <div class="my-2">
              <p>Copy link below</p>
              <button
                class="bg-orange-100 p-2 rounded-lg flex justify-between w-full"
                onclick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  copied = true;
                  alert("Copied");
                }}
              >
                <p class={copied ? "opacity-25" : ""}>{window.location.href}</p>
                <svg
                  class={copied ? "opacity-25" : ""}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                  ><path
                    d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"
                  /></svg
                >
              </button>
            </div>
          </div>
      </div>
      <div class="flex justify-between">
        <button
          onclick={showCopyLink}
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}
{#if reportModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <p class="text-xl font-semibold mb-2">Report recipe</p>
      <hr />
      <div class="my-4">
        <form action="" method="post">
          <div class="grid grid-cols-1">
            <div class="my-2 grid-cols-1 grid">
                <label for="reason">Description</label>
                <textarea maxlength="200" minlength="30" bind:value={reportContent} name="reason" id="reason" class="w-full mt-1 text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3"
                placeholder="Enter your reason"></textarea>
                <p class="text-end text-xs opacity-75">{reportContent.length}/200</p>  
            </div>
          </div>
        </form>
      </div>
      <div class="flex justify-between">
        <button
          onclick={showReportModal}
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Close
        </button>
        <button
          onclick={uploadReport}
          class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Report
        </button>
      </div>
    </div>
  </div>
{/if}
{#if loginModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <p class="text-xl font-semibold mb-2">Lets Login first!</p>
      <hr />
      <div class="my-4">
        <form action="">
          <div class="grid grid-cols-1">
            <div class="my-2">
              <p>Click link below to Login page!</p>
            </div>
          </div>
        </form>
      </div>
      <div class="flex justify-between">
        <a
          href="/login"
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
          >LOGIN</a
        >

        <button
          onclick={closeLoginModal}
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}
<main class="bg-gray-50">
  <div>
    <div class="block md:flex print:flex">
      <div class="mt-1">
        <img
          class="aspect-square w-full print:w-50 print:h-50 print:rounded-lg print:mx-4 md:w-150 h-50 md:h-100 rounded-none md:rounded-xl m-0 md:mx-4 object-cover"
          src={recipeInfo.thumbnail_url}
          alt="title"
        />
      </div>
      <div class="pb-4 bg-white w-full">
        <div class="flex flex-col justify-between min-h-full">
          <div>
            <div>
              <div class="pt-4 mx-4">
                <h1 class="text-2xl font-bold text-gray-700">
                  {recipeInfo.title}
                </h1>
              </div>
            </div>
            <div>
              <div class=" mt-2 mx-4">
                <div class="flex">
                  <img
                    src={author.profile_image_url ? author.profile_image_url : noProfile}
                    alt="author pictute"
                    class="aspect-square border-1 rounded-full object-cover w-10"
                  />
                  <div class="ml-2">
                    <h1 class="text-sm">{author.username}</h1>
                    <h1 class="text-[10px] opacity-50">
                      {recipeInfo.created_at}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="hidden md:block mt-4 print:block">
              <p class="mx-4">
                {#if recipeInfo?.content.length > 300}
                  {@html recipeInfo?.content
                    .slice(0, 300)
                    .trim()
                    .replace(/\s+$/, "")}
                  {#if readMoreDesc}
                    {@html recipeInfo?.content.slice(300)}
                  {/if}
                  <button
                    onclick={toggleDesc}
                    class="mx-auto flex mt-4 text-gray-500 focus:outline-none"
                    >{readMoreDesc ? "Hide" : "Read more"}</button
                  >
                {:else}
                  {recipeInfo?.content}
                {/if}
              </p>
            </div>
          </div>
          <div class="hidden md:block print:hidden">
            <div class="flex justify-between mx-4 mt-4 gap-4">
              <div class="flex gap-4">
                {#if liked}
                  <button
                    type="button"
                    onclick={likePost}
                    class="opacity-50 flex rounded-lg p-2 font-bold text-white bg-red-600 border-2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#ffffff"
                      class="mr-2"
                      ><path
                        d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z"
                      /></svg
                    >{likeCount}</button
                  >
                {:else}
                  <button
                    type="button"
                    onclick={likePost}
                    class="opacity-50 flex rounded-lg p-2 font-bold text-red-600 border-red-600 border-2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e7000b"
                      class="mr-2"
                      ><path
                        d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
                      /></svg
                    >
                    {likeCount}</button
                  >
                {/if}
                {#if saved}
                  <button
                    type="button"
                    onclick={savePost}
                    class="opacity-50 flex rounded-lg p-2 font-bold text-white bg-orange-400 border-orange-400 border-2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#ffffff"
                      ><path
                        d="M180.78-91.17v-662.05q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h386.44q44.3 0 75.15 30.85 30.85 30.85 30.85 75.15v662.05L480-219.09 180.78-91.17Zm106-161L480-334.78l193.22 82.61v-501.05H286.78v501.05Zm0-501.05h386.44-386.44Z"
                      /></svg
                    >Save Recipe</button
                  >
                {:else}
                  <button
                    type="button"
                    onclick={savePost}
                    class="opacity-50 flex rounded-lg p-2 font-bold text-orange-400 border-orange-400 border-2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#ff8904"
                      ><path
                        d="M180.78-91.17v-662.05q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h386.44q44.3 0 75.15 30.85 30.85 30.85 30.85 75.15v662.05L480-219.09 180.78-91.17Zm106-161L480-334.78l193.22 82.61v-501.05H286.78v501.05Zm0-501.05h386.44-386.44Z"
                      /></svg
                    >Save Recipe</button
                  >
                {/if}
              </div>
              <div class="flex gap-4">
                <button
                  onclick={showCopyLink}
                  class="flex rounded-lg p-2 font-bold text-gray-400 border-gray-400 border-2"
                  aria-label="share"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#99a1af"
                    ><path
                      d="M682.23-60.78q-57.32 0-97.4-39.95-40.09-39.94-40.09-97.01 0-5.43 2.43-22.91L285.39-372.78q-17.69 14.43-39.77 22.65-22.08 8.22-47.32 8.22-57.3 0-97.41-40.24t-40.11-97.72q0-57.48 40.11-97.85t97.41-40.37q25.13 0 47.83 8.5t40.96 23.5l259.52-151q-1.44-5.87-1.65-12.08-.22-6.22-.22-12.53 0-57.3 40.12-97.41t97.43-40.11q57.32 0 97.41 40.12 40.08 40.12 40.08 97.44 0 57.31-40.11 97.4t-97.41 40.09q-26.47 0-49.62-9.07-23.16-9.06-41.42-25.19L333.96-509.7q2 7.6 2.5 14.65.5 7.05.5 15.33 0 8.29-.79 15.92-.78 7.63-2.78 15.19l256.7 148.74q18.26-16.7 41.78-26.33 23.51-9.63 50.39-9.63 57.3 0 97.41 40.24t40.11 97.72q0 57.48-40.12 97.28-40.12 39.81-97.43 39.81Zm-.32-100.35q15.66 0 26.59-10.7t10.93-26.52q0-15.82-10.85-26.48-10.85-10.65-26.88-10.65-15.56 0-26.09 10.94-10.52 10.93-10.52 26.24 0 15.3 10.58 26.23 10.59 10.94 26.24 10.94ZM198.35-442.26q15.82 0 27.04-10.82 11.22-10.81 11.22-26.8t-11.22-26.92q-11.22-10.94-27.04-10.94-15.82 0-26.52 10.82-10.7 10.81-10.7 26.8t10.7 26.92q10.7 10.94 26.52 10.94Zm483.91-282.26q15.31 0 25.96-10.59t10.65-26.24q0-15.65-10.59-26.58-10.59-10.94-26.24-10.94-15.65 0-26.58 10.85-10.94 10.85-10.94 26.89 0 15.56 11.22 26.08 11.22 10.53 26.52 10.53Zm.57 526.22ZM198.87-480Zm483.39-281.7Z"
                    /></svg
                  >Share Recipe</button
                >
                <button
                  onclick={printRecipe}
                  class="flex rounded-lg p-2 font-bold text-black border-black border-2"
                  aria-label="share"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    ><path
                      d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z"
                    /></svg
                  >Print Recipe</button
                >
                <button
                  onclick={showReportModal}
                  class="flex rounded-lg p-2 font-bold bg-red-600 border-red-600 border-2"
                  aria-label="share"
                  ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg></button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mx-4 bg-gray-100 p-3 rounded-xl mt-4 block md:hidden print:hidden"
      >
        <p>
          {#if recipeInfo?.content.length > 40}
            {@html recipeInfo?.content.slice(0, 40).trim().replace(/\s+$/, "")}
            {#if readMoreDesc}
              {@html recipeInfo?.content.slice(40)}
            {/if}
            <button
              onclick={toggleDesc}
              class="mx-auto flex mt-4 text-gray-500 focus:outline-none"
              >{readMoreDesc ? "Hide" : "Read more"}</button
            >
          {:else}
            {recipeInfo?.content}
          {/if}
        </p>
      </div>
    </div>
    <div class="bg-white p-2 mt-4 block md:hidden print:hidden">
      <div class=" flex mx-4 justify-between">
        {#if liked}
          <button
            type="button"
            onclick={likePost}
            class="opacity-50 flex rounded-lg p-2 font-bold text-white bg-red-600 border-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
              class="mr-2"
              ><path
                d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z"
              /></svg
            >{likeCount}</button
          >
        {:else}
          <button
            type="button"
            onclick={likePost}
            class="opacity-50 flex rounded-lg p-2 font-bold text-red-600 border-red-600 border-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e7000b"
              class="mr-2"
              ><path
                d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
              /></svg
            >
            {likeCount}</button
          >
        {/if}
        {#if saved}
                  <button
                    type="button"
                    onclick={savePost}
                    class="opacity-50 flex rounded-lg p-2 font-bold text-white bg-orange-400 border-orange-400 border-2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#ffffff"
                      ><path
                        d="M180.78-91.17v-662.05q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h386.44q44.3 0 75.15 30.85 30.85 30.85 30.85 75.15v662.05L480-219.09 180.78-91.17Zm106-161L480-334.78l193.22 82.61v-501.05H286.78v501.05Zm0-501.05h386.44-386.44Z"
                      /></svg
                    >Save Recipe</button
                  >
                {:else}
                  <button
                    type="button"
                    onclick={savePost}
                    class="opacity-50 flex rounded-lg p-2 font-bold text-orange-400 border-orange-400 border-2"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#ff8904"
                      ><path
                        d="M180.78-91.17v-662.05q0-44.3 30.85-75.15 30.85-30.85 75.15-30.85h386.44q44.3 0 75.15 30.85 30.85 30.85 30.85 75.15v662.05L480-219.09 180.78-91.17Zm106-161L480-334.78l193.22 82.61v-501.05H286.78v501.05Zm0-501.05h386.44-386.44Z"
                      /></svg
                    >Save Recipe</button
                  >
                {/if}
        <div class="flex gap-4 print:hidden">
          <button
            onclick={showCopyLink}
            class="rounded-lg p-2 font-bold border-gray-400 border-2"
            aria-label="share"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#99a1af"
              ><path
                d="M682.23-60.78q-57.32 0-97.4-39.95-40.09-39.94-40.09-97.01 0-5.43 2.43-22.91L285.39-372.78q-17.69 14.43-39.77 22.65-22.08 8.22-47.32 8.22-57.3 0-97.41-40.24t-40.11-97.72q0-57.48 40.11-97.85t97.41-40.37q25.13 0 47.83 8.5t40.96 23.5l259.52-151q-1.44-5.87-1.65-12.08-.22-6.22-.22-12.53 0-57.3 40.12-97.41t97.43-40.11q57.32 0 97.41 40.12 40.08 40.12 40.08 97.44 0 57.31-40.11 97.4t-97.41 40.09q-26.47 0-49.62-9.07-23.16-9.06-41.42-25.19L333.96-509.7q2 7.6 2.5 14.65.5 7.05.5 15.33 0 8.29-.79 15.92-.78 7.63-2.78 15.19l256.7 148.74q18.26-16.7 41.78-26.33 23.51-9.63 50.39-9.63 57.3 0 97.41 40.24t40.11 97.72q0 57.48-40.12 97.28-40.12 39.81-97.43 39.81Zm-.32-100.35q15.66 0 26.59-10.7t10.93-26.52q0-15.82-10.85-26.48-10.85-10.65-26.88-10.65-15.56 0-26.09 10.94-10.52 10.93-10.52 26.24 0 15.3 10.58 26.23 10.59 10.94 26.24 10.94ZM198.35-442.26q15.82 0 27.04-10.82 11.22-10.81 11.22-26.8t-11.22-26.92q-11.22-10.94-27.04-10.94-15.82 0-26.52 10.82-10.7 10.81-10.7 26.8t10.7 26.92q10.7 10.94 26.52 10.94Zm483.91-282.26q15.31 0 25.96-10.59t10.65-26.24q0-15.65-10.59-26.58-10.59-10.94-26.24-10.94-15.65 0-26.58 10.85-10.94 10.85-10.94 26.89 0 15.56 11.22 26.08 11.22 10.53 26.52 10.53Zm.57 526.22ZM198.87-480Zm483.39-281.7Z"
              /></svg
            ></button
          ><button
                  onclick={showReportModal}
                  class="flex rounded-lg p-2 font-bold bg-red-600 border-red-600 border-2"
                  aria-label="share"
                  ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg></button
                >
        </div>
      </div>
    </div>
    <div
      class="md:bg-white md:grid md:grid-cols-2 min-h-40 mt-8 print:grid-cols-2 print:grid"
    >
      <div class="bg-white">
        <div class="mt-4 mx-4 p-2">
          <div class="flex justify-between">
            <h1 class="text-xl font-bold text-gray-700">Ingredient</h1>
            <div class="flex text-sm opacity-75 mt-1 md:hidden print:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="##99a1af"
                ><path
                  d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
                /></svg
              >
              <p class="ml-1 text-sm">{recipeInfo?.duration} Min</p>
            </div>
          </div>
          <div>
            {#each ingredients as { name, quantity }, i}
              <div class="flex mb-2 py-1.5">
                <p
                  class="aspect-square w-7 h-7 flex justify-center items-center text-center bg-gray-700 text-white rounded-full"
                >
                  {i + 1}
                </p>
                <p class="ml-2 my-auto">{quantity} {name}</p>
              </div>
              <hr class="opacity-25" />
            {/each}
          </div>
        </div>
      </div>
      <div class="bg-white mt-4">
        <div class="mx-4 p-2">
          <div class="flex justify-between">
            <p class="text-gray-700 font-bold text-xl">Step by step</p>
            <div class="hidden text-sm opacity-75 mt-1 md:flex print:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="##99a1af"
                ><path
                  d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"
                /></svg
              >
              <p class="ml-1 text-sm">{recipeInfo?.duration} Min</p>
            </div>
          </div>
          {#each steps as { step_number, instruction }}
            <div class="flex mb-2 py-1.5">
              <p
                class="aspect-square w-7 h-7 flex justify-center items-center text-center bg-gray-700 text-white rounded-full"
              >
                {step_number}
              </p>
              <p class="my-auto ml-2">{instruction}</p>
            </div>
            <hr class="opacity-25" />
          {/each}
        </div>
      </div>
    </div>
    <div class="bg-white mt-4 print:hidden">
      <div class="mx-4 p-2">
        <p class="text-gray-700 font-bold text-xl">Comment</p>
        <div
          class="mt-4 flex items-center border border-gray-300 rounded-full px-2 py-1 w-full max-w-md md:max-w-full"
        >
          <input
            bind:value={commentContent}
            type="text"
            placeholder="Write a comment..."
            class="flex-1 h-8 px-3 text-sm focus:outline-none rounded-full"
          />
          <button
            onclick={uploadcomment}
            aria-label="send comment"
            class="bg-gray-400 hover:bg-gray-500 rounded-full p-2 ml-2"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#ffffff"
            >
              <path
                d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
              />
            </svg>
          </button>
        </div>
        <div class="mt-4">
          {#if yourComment}
            {#each yourComment as { name, commented, profile, date }}
              <div class="flex flex-col mb-4">
                <div class="flex justify-between items-start">
                  <div class="flex items-center">
                    <img
                      src={profile ? profile : noProfile}
                      class="w-7 h-7 object-cover rounded-full border-1"
                      alt="{name}'s profile picture"
                    />
                    <p class="text-sm ml-2 font-semibold">{name}</p>
                  </div>
                  <p class="text-sm text-gray-500">Just now</p>
                </div>
                <p class="mt-1 text-sm text-gray-700">{commented}</p>
              </div>
            {/each}
          {/if}
          {#if comment}
          {#each comment || [] as { content, created_at, username, profile_image_url }}
            <div class="flex flex-col mb-4">
              <div class="flex justify-between items-start">
                <div class="flex items-center">
                  <img
                    src={profile_image_url ? profile_image_url : noProfile}
                    class="w-7 h-7 object-cover rounded-full border-1"
                    alt="{username}'s profile picture"
                  />
                  <p class="text-sm ml-2 font-semibold">{username}</p>
                </div>
                <p class="text-sm text-gray-500">{created_at}</p>
              </div>
              <p class="mt-1 text-sm text-gray-700">{content}</p>
            </div>
          {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>