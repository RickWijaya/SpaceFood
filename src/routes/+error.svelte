<script>
    import { page } from "$app/state";
    import error from "../lib/error.png"
    import "../main.css"
</script>
<main class="flex items-center justify-center min-h-screen px-4 py-8 bg-white">
    <div class="max-w-md text-center">
      <img src={error} alt="Error" class="w-64 mx-auto mb-6 opacity-60" />
  
      <h1 class="text-4xl font-bold text-red-600 mb-2">404</h1>
      <p class="text-lg text-gray-700 mb-6">
        {page.error?.message || "Something went wrong."}
      </p>
      <a class=" bg-orange-400 text-center rounded-full p-3 text-white w-50 font-bold" href="/dashboard">Go back</a>
    </div>
  </main>
  