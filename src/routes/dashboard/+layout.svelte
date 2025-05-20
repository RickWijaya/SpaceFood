<script lang="ts">
    import type { Snippet } from "svelte";
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";
    import { derived } from "svelte/store";
  import logo from "../../lib/Logotextright.png"
    import "../../main.css";
    import { onMount } from "svelte";
    import { user } from "../../lib/store/user"
    import { get } from "svelte/store";
    let { data, children }: { data: LayoutData; children: Snippet } = $props();
    const currentPath = derived(page, ($page) => $page.url.pathname);
    onMount(() => {
        user.set(data.user)
    })
</script>
<div>
    <nav
        class="  bg-gray-50 z-10 w-40 fixed top-0 left-0 h-screen border-r border-gray-300 shadow-md md:flex flex-col items-start py-4 space-y-4 hidden"
    ><div class="hidden md:flex mx-auto space-x-3">
        <img src={logo} alt="Logo" class="w-30 object-contain" />
      </div>
        <a
            aria-label="home"
            href="/dashboard"
            class="p-3 flex justify-center {$currentPath === '/'
                ? 'border-b-2 border-blue-600'
                : ''}"
        >
            {#if $currentPath === "/dashboard"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff8904"
                    ><path
                        d="M180-140v-450l300-225.77L780-590v450H556.15v-267.69h-152.3V-140H180Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-orange-400">Home</p>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    ><path
                        d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-black">Home</p>
            {/if}
        </a>
        <a
            aria-label="history"
            href="/dashboard/history"
            class="p-3 flex justify-center {$currentPath === '/history'
                ? 'border-b-2 border-blue-600'
                : ''}"
        >
            {#if $currentPath === "/dashboard/history" || /^\/dashboard\/edithistory\/\d+$/.test($currentPath)}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff8904"
                    ><path
                        d="M212.31-100q-29.92 0-51.12-21.19Q140-142.39 140-172.31v-447.92q-17.61-9.08-28.81-25.81Q100-662.77 100-684.62v-103.07q0-29.92 21.19-51.12Q142.39-860 172.31-860h615.38q29.92 0 51.12 21.19Q860-817.61 860-787.69v103.07q0 21.85-11.19 38.58-11.2 16.73-28.81 25.81v447.92q0 29.92-21.19 51.12Q777.61-100 747.69-100H212.31Zm-40-572.31h615.38q5.39 0 8.85-3.46t3.46-8.85v-103.07q0-5.39-3.46-8.85t-8.85-3.46H172.31q-5.39 0-8.85 3.46t-3.46 8.85v103.07q0 5.39 3.46 8.85t8.85 3.46Zm195.38 249.62h224.62V-480H367.69v57.31Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-orange-400">
                    Your Post
                </p>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    ><path
                        d="M212.31-100q-29.92 0-51.12-21.19Q140-142.39 140-172.31v-447.92q-17.61-9.08-28.81-25.81Q100-662.77 100-684.62v-103.07q0-29.92 21.19-51.12Q142.39-860 172.31-860h615.38q29.92 0 51.12 21.19Q860-817.61 860-787.69v103.07q0 21.85-11.19 38.58-11.2 16.73-28.81 25.81v447.92q0 29.92-21.19 51.12Q777.61-100 747.69-100H212.31ZM200-612.31v438.08q0 6.15 4.42 10.19 4.43 4.04 10.97 4.04h532.3q5.39 0 8.85-3.46t3.46-8.85v-440H200Zm-27.69-60h615.38q5.39 0 8.85-3.46t3.46-8.85v-103.07q0-5.39-3.46-8.85t-8.85-3.46H172.31q-5.39 0-8.85 3.46t-3.46 8.85v103.07q0 5.39 3.46 8.85t8.85 3.46Zm195.38 249.62h224.62V-480H367.69v57.31ZM480-386.15Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-black">Your Post</p>
            {/if}
        </a>
        <a
            aria-label="add post"
            href="/dashboard/add"
            class="p-3 flex justify-center {$currentPath === '/add'
                ? 'border-b-2 border-blue-600'
                : ''}"
        >
            {#if $currentPath === "/dashboard/add"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff8904"
                    ><path
                        d="M450-290h60v-160h160v-60H510v-160h-60v160H290v60h160v160ZM140-140v-680h680v680H140Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-orange-400">Post</p>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    ><path
                        d="M450-290h60v-160h160v-60H510v-160h-60v160H290v60h160v160ZM140-140v-680h680v680H140Zm60-60h560v-560H200v560Zm0 0v-560 560Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-black">Post</p>
            {/if}
        </a>
        <a
            aria-label="account"
            href="/dashboard/applied"
            class="p-3 flex justify-center {$currentPath === '/applied'
                ? 'border-b-2 border-blue-600'
                : ''}"
        >
            {#if $currentPath === "/dashboard/applied"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff8904"
                    ><path
                        d="M423.23-331.08 692.15-600 650-642.15 423.23-415.38l-114-114-42.15 42.15 156.15 156.15ZM212.31-140q-29.83 0-51.07-21.24Q140-182.48 140-212.31v-535.38q0-29.83 21.24-51.07Q182.48-820 212.31-820h178q3.77-33.31 29.08-56.65 25.3-23.35 60.8-23.35T541-876.65q25.31 23.34 28.69 56.65h178q29.83 0 51.07 21.24Q820-777.52 820-747.69v535.38q0 29.83-21.24 51.07Q777.52-140 747.69-140H212.31ZM480-786.15q13 0 21.5-8.5t8.5-21.5q0-13-8.5-21.5t-21.5-8.5q-13 0-21.5 8.5t-8.5 21.5q0 13 8.5 21.5t21.5 8.5Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-orange-400">Favorite</p>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    ><path
                        d="M423.23-331.08 692.15-600 650-642.15 423.23-415.38l-114-114-42.15 42.15 156.15 156.15ZM212.31-140q-29.92 0-51.12-21.19Q140-182.39 140-212.31v-535.38q0-29.92 21.19-51.12Q182.39-820 212.31-820h178q3.77-33.31 29.08-56.65Q444.69-900 480-900q35.69 0 61 23.35 25.31 23.34 28.69 56.65h178q29.92 0 51.12 21.19Q820-777.61 820-747.69v535.38q0 29.92-21.19 51.12Q777.61-140 747.69-140H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM480-786.15q13 0 21.5-8.5t8.5-21.5q0-13-8.5-21.5t-21.5-8.5q-13 0-21.5 8.5t-8.5 21.5q0 13 8.5 21.5t21.5 8.5ZM200-200v-560 560Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-black">Favorite</p>
            {/if}
        </a>
        <a
            aria-label="account"
            href="/dashboard/profile"
            class="p-3 flex justify-center {$currentPath === '/profile'
                ? 'border-b-2 border-blue-600'
                : ''}"
        >
            {#if $currentPath === "/dashboard/profile"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ff8904"
                    ><path
                        d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-orange-400">Profile</p>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000000"
                    ><path
                        d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                    /></svg
                >
                <p class="font-medium text-lg ml-1 text-black">Profile</p>
            {/if}
        </a>
    </nav>

    <nav
        class="md:hidden bg:white z-10 h-12 fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-300 shadow-md flex justify-around items-center flex-col md:flex-row"
    >
        <div class="grid grid-cols-5 w-full">
            <a
                aria-label="home"
                href="/dashboard"
                class="p-3 flex justify-center {$currentPath === '/'
                    ? 'border-b-2 border-blue-600'
                    : ''}"
            >
                {#if $currentPath === "/dashboard"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ff8904"
                        ><path
                            d="M180-140v-450l300-225.77L780-590v450H556.15v-267.69h-152.3V-140H180Z"
                        /></svg
                    >
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        ><path
                            d="M240-200h133.85v-237.69h212.3V-200H720v-360L480-740.77 240-560v360Zm-60 60v-450l300-225.77L780-590v450H526.15v-237.69h-92.3V-140H180Zm300-330.38Z"
                        /></svg
                    >
                {/if}
            </a>
            <a
                aria-label="history"
                href="/dashboard/history"
                class="p-3 flex justify-center {$currentPath === '/history'
                    ? 'border-b-2 border-blue-600'
                    : ''}"
            >
                {#if $currentPath === "/dashboard/history"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ff8904"
                        ><path
                            d="M212.31-100q-29.92 0-51.12-21.19Q140-142.39 140-172.31v-447.92q-17.61-9.08-28.81-25.81Q100-662.77 100-684.62v-103.07q0-29.92 21.19-51.12Q142.39-860 172.31-860h615.38q29.92 0 51.12 21.19Q860-817.61 860-787.69v103.07q0 21.85-11.19 38.58-11.2 16.73-28.81 25.81v447.92q0 29.92-21.19 51.12Q777.61-100 747.69-100H212.31Zm-40-572.31h615.38q5.39 0 8.85-3.46t3.46-8.85v-103.07q0-5.39-3.46-8.85t-8.85-3.46H172.31q-5.39 0-8.85 3.46t-3.46 8.85v103.07q0 5.39 3.46 8.85t8.85 3.46Zm195.38 249.62h224.62V-480H367.69v57.31Z"
                        /></svg
                    >
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        ><path
                            d="M212.31-100q-29.92 0-51.12-21.19Q140-142.39 140-172.31v-447.92q-17.61-9.08-28.81-25.81Q100-662.77 100-684.62v-103.07q0-29.92 21.19-51.12Q142.39-860 172.31-860h615.38q29.92 0 51.12 21.19Q860-817.61 860-787.69v103.07q0 21.85-11.19 38.58-11.2 16.73-28.81 25.81v447.92q0 29.92-21.19 51.12Q777.61-100 747.69-100H212.31ZM200-612.31v438.08q0 6.15 4.42 10.19 4.43 4.04 10.97 4.04h532.3q5.39 0 8.85-3.46t3.46-8.85v-440H200Zm-27.69-60h615.38q5.39 0 8.85-3.46t3.46-8.85v-103.07q0-5.39-3.46-8.85t-8.85-3.46H172.31q-5.39 0-8.85 3.46t-3.46 8.85v103.07q0 5.39 3.46 8.85t8.85 3.46Zm195.38 249.62h224.62V-480H367.69v57.31ZM480-386.15Z"
                        /></svg
                    >
                {/if}
            </a>
            <a
                aria-label="add post"
                href="/dashboard/add"
                class="p-3 flex justify-center {$currentPath === '/add'
                    ? 'border-b-2 border-blue-600'
                    : ''}"
            >
                {#if $currentPath === "/dashboard/add"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ff8904"
                        ><path
                            d="M450-290h60v-160h160v-60H510v-160h-60v160H290v60h160v160ZM140-140v-680h680v680H140Z"
                        /></svg
                    >
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        ><path
                            d="M450-290h60v-160h160v-60H510v-160h-60v160H290v60h160v160ZM140-140v-680h680v680H140Zm60-60h560v-560H200v560Zm0 0v-560 560Z"
                        /></svg
                    >
                {/if}
            </a>
            <a
                aria-label="account"
                href="/dashboard/applied"
                class="p-3 flex justify-center {$currentPath === '/applied'
                    ? 'border-b-2 border-blue-600'
                    : ''}"
            >
                {#if $currentPath === "/dashboard/applied"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ff8904"
                        ><path
                            d="M423.23-331.08 692.15-600 650-642.15 423.23-415.38l-114-114-42.15 42.15 156.15 156.15ZM212.31-140q-29.83 0-51.07-21.24Q140-182.48 140-212.31v-535.38q0-29.83 21.24-51.07Q182.48-820 212.31-820h178q3.77-33.31 29.08-56.65 25.3-23.35 60.8-23.35T541-876.65q25.31 23.34 28.69 56.65h178q29.83 0 51.07 21.24Q820-777.52 820-747.69v535.38q0 29.83-21.24 51.07Q777.52-140 747.69-140H212.31ZM480-786.15q13 0 21.5-8.5t8.5-21.5q0-13-8.5-21.5t-21.5-8.5q-13 0-21.5 8.5t-8.5 21.5q0 13 8.5 21.5t21.5 8.5Z"
                        /></svg
                    >
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        ><path
                            d="M423.23-331.08 692.15-600 650-642.15 423.23-415.38l-114-114-42.15 42.15 156.15 156.15ZM212.31-140q-29.92 0-51.12-21.19Q140-182.39 140-212.31v-535.38q0-29.92 21.19-51.12Q182.39-820 212.31-820h178q3.77-33.31 29.08-56.65Q444.69-900 480-900q35.69 0 61 23.35 25.31 23.34 28.69 56.65h178q29.92 0 51.12 21.19Q820-777.61 820-747.69v535.38q0 29.92-21.19 51.12Q777.61-140 747.69-140H212.31Zm0-60h535.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-535.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H212.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v535.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM480-786.15q13 0 21.5-8.5t8.5-21.5q0-13-8.5-21.5t-21.5-8.5q-13 0-21.5 8.5t-8.5 21.5q0 13 8.5 21.5t21.5 8.5ZM200-200v-560 560Z"
                        /></svg
                    >
                {/if}
            </a>
            <a
                aria-label="account"
                href="/dashboard/profile"
                class="p-3 flex justify-center {$currentPath === '/profile'
                    ? 'border-b-2 border-blue-600'
                    : ''}"
            >
                {#if $currentPath === "/dashboard/profile"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#ff8904"
                        ><path
                            d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                        /></svg
                    >
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                        ><path
                            d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                        /></svg
                    >
                {/if}
            </a>
        </div>
    </nav>
    <div class="grid grid-rows-[auto,1fr,auto] min-h-screen">
        <main class="overflow-y-auto">
            {@render children()}
        </main>
    </div>
</div>
