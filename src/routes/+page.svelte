<script>
    import logo from "../lib/Logotextright.png"
    import welcome from "../lib/welcome.png"
</script>
<svelte:head>
    <title>Welcome to SpaceFood</title>
</svelte:head>
<div class="dark:bg-gray-900 dark:text-white bg-white min-h-screen flex items-center justify-center">
    <main class="px-7 py-2 w-full max-w-screen-lg">
        <div class="md:grid md:grid-cols-2 md:gap-4 w-full items-center">
            <div class="hidden md:flex justify-center items-center">
                <img src={welcome} alt="welcome-image" class="w-50 md:w-100 h-auto mx-auto">
            </div>
            <div class="md:dark:bg-gray-800 p-0 md:p-8 md:shadow-lg md:rounded-xl w-full max-w-md mx-auto">
                <div class="mb-4">
                    <div class="p-1 mb-3 dark:rounded dark:bg-white">
                        <img class="w-60 mx-auto" src={logo} alt="EventMaster">
                    </div>
                    <h1 class="mb-3 font-bold text-orange-400 text-center text-2xl tracking-tight">
                        Discover the <br>newest food recipe
                    </h1>
                    <p class="text-center opacity-75">Explore the existing recipe based on your interest</p>
                </div>
                <div class="w-full grid gap-4 grid-cols-1">
                    <a href="/login" class="hover:bg-orange-500 text-center px-1 shadow-lg py-3 bg-orange-400 dark:bg-orange-400 text-white rounded-xl font-bold dark:hover:bg-orange-600 duration-200">Login</a>
                    <a href="/register" class="hover:bg-gray-200 text-center px-1 py-3 dark:border-white border-black border-2 rounded-xl font-bold text-black dark:text-white duration-200 dark:hover:bg-gray-700">Register</a>
                </div>
            </div>
        </div>
    </main>
</div>
