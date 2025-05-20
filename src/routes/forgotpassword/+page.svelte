<script lang="js">
    let uid = $state("");
    let username = $state("");
    let email = $state("");
    let password = $state("");
    let confirmPassword = $state("");
    let showIconPass = $state(false);
    let showIconConfPass = $state(false);
    let errorCode = $state([false, ""]);
    function togglePassword() {
        showIconPass = !showIconPass;
    }
    function toggleConfPassword() {
        showIconConfPass = !showIconConfPass;
    }
    // @ts-ignore
    async function submit(e) {
    e.preventDefault();
    
    // Clear previous errors
    errorCode = [false, ""];
    
    // Validation
    if (!username) {
        errorCode = [true, "Please input a username!"];
        return;
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorCode = [true, "Please input a valid email!"];
        return;
    }
    
    if (!uid || isNaN(uid) || Number(uid) <= 0) {
        errorCode = [true, "Please input a valid User ID!"];
        return;
    }
    
    if (password.length < 8) {
        errorCode = [true, "Password must be at least 8 characters!"];
        return;
    }
    
    if (password !== confirmPassword) {
        errorCode = [true, "Passwords do not match!"];
        return;
    }
    
    try {
        const res = await fetch("http://localhost/spacefood/changepassword.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username,
                email,
                password,
                uid: Number(uid),
            }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Failed to change password");
        }
        
        if (data.success) {
            alert("Password changed successfully! Please login again.");
            // Optional: Logout immediately
            await fetch("http://localhost/spacefood/logout.php", {
                method: "POST",
                credentials: "include"
            });
            window.location.href = "/login";
        } else {
            errorCode = [true, data.message];
        }
    } catch (error) {
        errorCode = [true, error.message];
        console.error("Password change error:", error);
    }
}
</script>
<svelte:head>
  <title>Change Password</title>
</svelte:head>
<div class="dark:bg-gray-900 dark:text-white bg:white">
    <main
        class="w-full min-h-screen flex items-center justify-center px-4 py-8"
    >
        <div class="w-full max-w-lg md:shadow-lg md:p-8 md:rounded-xl">
            <div class="text-center">
                <h1 class="text-2xl font-bold mb-3">
                    Forgot Password?
                </h1>
            </div>
            <form action="#" class="flex flex-col gap-4 mt-8">
                <div class="flex flex-col">
                    <label for="username" class="ml-2 mb-1 text-sm font-medium"
                        >Username</label
                    >
                    <input
                        bind:value={username}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Bob"
                        class="dark:bg-gray-800 bg-gray-200 px-4 py-2 rounded-full w-full"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="email" class="ml-2 mb-1 text-sm font-medium"
                        >Email</label
                    >
                    <input
                        bind:value={email}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email account"
                        class="dark:bg-gray-800 bg-gray-200 px-4 py-2 rounded-full w-full"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="uid" class="ml-2 mb-1 text-sm font-medium"
                        >User ID</label
                    >
                    <input
                        bind:value={uid}
                        type="number"
                        id="uid"
                        name="uid"
                        class="dark:bg-gray-800 bg-gray-200 px-4 py-2 rounded-full w-full"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label for="password" class="ml-2 mb-1 text-sm font-medium"
                        >Password</label
                    >
                    <div class="relative w-full">
                        <input
                            bind:value={password}
                            type={showIconPass ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            class="dark:bg-gray-800 peer h-full w-full rounded-full bg-gray-200 px-4 py-2"
                        />
                        <button
                            aria-label="reveal password"
                            class="opacity-50 absolute right-3 top-1/2 -translate-y-1/2 z-10 select-none rounded-full p-1 md:hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                            type="button"
                            onclick={togglePassword}
                        >
                            {#if showIconPass}
                                <svg
                                    id="svg1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#000000"
                                >
                                    <path
                                        d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                                    />
                                </svg>
                            {:else}
                                <svg
                                    id="svg2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#000000"
                                >
                                    <path
                                        d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"
                                    />
                                </svg>
                            {/if}
                        </button>
                    </div>
                </div>
                <div class="flex flex-col">
                    <label
                        for="confirmPassword"
                        class="ml-2 mb-1 text-sm font-medium"
                        >Confirm password</label
                    >
                    <div class="relative w-full">
                        <input
                            bind:value={confirmPassword}
                            type={showIconConfPass ? "text" : "password"}
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="Password"
                            required
                            class="dark:bg-gray-800 peer h-full w-full rounded-full bg-gray-200 px-4 py-2"
                        />
                        <button
                            aria-label="reveal password"
                            class="opacity-50 absolute right-3 top-1/2 -translate-y-1/2 z-10 select-none rounded-full p-1 md:hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                            type="button"
                            onclick={toggleConfPassword}
                        >
                            {#if showIconConfPass}
                                <svg
                                    id="svg1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#000000"
                                >
                                    <path
                                        d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
                                    />
                                </svg>
                            {:else}
                                <svg
                                    id="svg2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#000000"
                                >
                                    <path
                                        d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"
                                    />
                                </svg>
                            {/if}
                        </button>
                    </div>
                </div>
                {#if errorCode[0]}
                    <p class="text-red-400 text-center font-bold">
                        {errorCode[1]}
                    </p>
                {/if}
                <button
                    type="submit"
                    onclick={submit}
                    class="hover:bg-orange-600 duration-200 bg-orange-400 mt-4 text-white font-bold tracking-wide p-3 rounded-full w-full h-12"
                >
                    SUBMIT
                </button>
            </form>
            <div class="mt-30 text-center text-sm">
                <p class="font-bold">
                    Remember your password?
                    <a
                        href="/login"
                        class=" text-orange-400 font-semibold hover:underline"
                        >Login!</a
                    >
                </p>
            </div>
        </div>
    </main>
</div>
