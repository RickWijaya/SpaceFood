<script lang="ts">
  //variable
  let stepbystep = $state([""]);
  let name = $state("");
  let desc = $state("");
  let duration = $state("");
  let image;
  let ingredient = $state([{ name: "", amount: "", unit: "pc" }]);
  const addIngredient = () => {
    ingredient.push({ name: "", amount: "", unit: "pc" });
  };
  const resetIngredient = () => {
    ingredient = [{ name: "", amount: "", unit: "pc" }];
  };
  const getFormattedIngredients = () => {
    const formatted: Record<string, string> = {};
    ingredient.forEach((i) => {
      if (i.name) {
        formatted[i.name] = `${i.amount}${i.unit}`;
      }
    });
    return formatted;
  };
  const addStep = () => {
    stepbystep.push("");
  };
  const resetAll = () => {
    ingredient = [{ name: "", amount: "", unit: "pc" }];
    stepbystep = [""];
    name = "";
    desc = "";
    duration = "";
  };
  const resetStep = () => {
    stepbystep = [""];
  };
  const getFormattedStep = () => {
  return stepbystep.filter(step => step.trim() !== "");
};
  let uploadURL = $state("");
  const displayPreview = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      uploadURL = URL.createObjectURL(target.files[0]);
      image = target.files[0];
    }
  };
  const upload = async (e: Event) => {
  e.preventDefault();
  try {
    ingredient.forEach(ing => {
      if(Number(ing.amount) < 1){
        errors.push('Please make sure the ingredient more than 1')
      }
      if(ing.name === ''){
        errors.push('Please make sure the ingredient name not empty')
      }
    });
    const errors = [];
    if (!name) errors.push("Title is required");
    if (!desc) errors.push("Description is required");
    if (!duration) errors.push("Duration is required");
    if (!image) errors.push("Image is required");
    if (ingredient.length < 1 || !ingredient[0].name) errors.push("At least one ingredient is required");
    const hasSteps = stepbystep.some(step => step.trim() !== "");
    if (!hasSteps) errors.push("At least one step is required");
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    const formData = new FormData();
    formData.append("title", name);
    formData.append("description", desc);
    formData.append("duration", duration);
    formData.append("image", image);
    formData.append("ingredients", JSON.stringify(getFormattedIngredients()));
    formData.append("steps", JSON.stringify(getFormattedStep()));
    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const res = await fetch("http://localhost/spacefood/postrecipe.php", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Upload failed with status " + res.status);
    }
    alert(`Upload successful! Recipe ID: ${data.recipe_id}`);
    resetAll();
  } catch (error) {
    alert(error.message);
  }
};

</script>
<svelte:head>
  <title>Add your recipe!</title>
</svelte:head>
<main class="py-4 mt-16 mb-16 md:ml-40 md:mt-0 bg-white">
  <div class="min-h-screen bg-white">
    <div class="max-w-md md:max-w-full mx-auto bg-white px-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-4">Post Recipe</h1>
      <hr />
      <form action="#" method="post">
        <div class="space-y-4 mt-4">
          <div class="my-2">
            <div class="gird grid-cols-1 md:grid-cols-2">
              <div>
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="file_input">Upload file</label
                >
                <input
                  required
                  accept="image/png, image/gif, image/jpeg"
                  onchange={displayPreview}
                  class="block md:w-100 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </div>
  
              {#if uploadURL}
                <img
                  class="aspect-square w-100 h-100 object-cover border-2"
                  src={uploadURL}
                  alt="preview"
                />
              {/if}
            </div>
          </div>
          <div class="md:grid block md:grid-cols-2 md:gap-8">
            <div class="my-2">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Recipe for</label
              >
              <input
                required
                bind:value={name}
                id="name"
                type="text"
                class="w-full text-xs mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter recipe name"
              />
            </div>

            <div class="my-2">
              <label
                for="duration"
                class="block text-sm font-medium text-gray-700"
                >Duration minute</label
              >
              <input
                required
                bind:value={duration}
                id="duration"
                type="number"
                class="w-full text-xs mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="10"
              />
            </div>
          </div>
          <div class="my-2">
            <label for="desc" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <div>
              <textarea
                required
                minlength="30"
                maxlength="200"
                bind:value={desc}
                id="desc"
                class="w-full mt-1 text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows="3"
                placeholder="Enter your recipe description"
              ></textarea>
              <p class="text-end text-xs opacity-75">{desc.length}/200</p>
            </div>
          </div>
          <div class="md:grid block md:grid-cols-2 md:gap-8">
            <div class="my-2">
              <label for="ingredient">Ingredient</label>
              {#each ingredient as ing, i}
                <div class="flex md:gap-4">
                  <div class="flex">
                    <p
                      class=" aspect-square w-7 h-7 flex justify-center items-center text-center bg-gray-700 text-white rounded-full m-auto mr-3"
                    >
                      {i + 1}
                    </p>
                    <input
                      required
                      bind:value={ingredient[i].name}
                      id="step"
                      type="text"
                      class="rounded-r-none md:rounded w-35 md:w-76 mt-1 text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                      placeholder="Apple"
                    />
                  </div>
                  <div class="flex">
                    <input
                      required
                      bind:value={ingredient[i].amount}
                      min="1"
                      id="step"
                      type="number"
                      class="rounded-none w-full mt-1 text-xs px-3 py-2 border md:rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                      placeholder="1"
                    />
                    <select
                      name="type"
                      id="type"
                      class="rounded-l-none w-20 md:w-40 mt-1 text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                      ><option value="pc">Pc (Piece)</option>
                      <option value="Large">large</option>
                      <option value="Small">small</option>
                      <optgroup label="proccessed">
                        <option value="chopped">Chopped</option>
                        <option value="stalks">stalks</option>
                        <option value="sliced">sliced</option>
                      </optgroup>
                      <optgroup label="Metric Units">
                        <option value="g">Gram</option>
                        <option value="l">Liter</option>
                      </optgroup>
                      <optgroup label="Imperial Units">
                        <option value="tsp">Teaspoon (Tsp)</option>
                        <option value="tbsp">Tablespoon (Tbsp)</option>
                        <option value="cup">Cup</option>
                        <option value="gallon">Gallon</option>
                        <option value="pint">Pint</option>
                        <option value="pound">Pound</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
              {/each}
              <div class="flex justify-between my-4">
                <button
                  onclick={addIngredient}
                  type="button"
                  class="flex items-center bg-orange-400 hover:bg-orange-600 transition-colors duration-200 text-white font-medium text-sm px-3 md:px-4 py-3 md:py-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path
                      d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                    />
                  </svg>
                  <span class="ml-2">Add Ingredient</span>
                </button>
                <button
                  onclick={resetIngredient}
                  type="button"
                  class="flex items-center hover:bg-gray-700 text-black border-1 border-gray-700 transition-colors duration-200 hover:text-white font-medium text-sm px-3 md:px-4 py-3 md:py-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    ><path
                      d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"
                    /></svg
                  >
                  <span class="ml-2">Reset</span>
                </button>
              </div>
            </div>
            <div class="my-2">
              <label for="step">Step by Step</label>
              {#each stepbystep as step, i}
                <div class="flex">
                  <p
                    class="aspect-square w-7 h-7 flex justify-center items-center text-center bg-gray-700 text-white rounded-full m-auto mr-3"
                  >
                    {i + 1}
                  </p>
                  <input
                    required
                    id="step"
                    type="text"
                    class="w-full mt-1 text-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
                    placeholder="Cut the apple"
                    bind:value={stepbystep[i]}
                  />
                </div>
              {/each}
              <div class="flex justify-between my-4">
                <button
                  onclick={addStep}
                  type="button"
                  class="flex items-center bg-orange-400 hover:bg-orange-600 transition-colors duration-200 text-white font-medium text-sm px-3 md:px-4 py-3 md:py-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path
                      d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                    />
                  </svg>
                  <span class="ml-2">Add more step</span>
                </button>
                <button
                  type="button"
                  onclick={resetStep}
                  class="flex items-center hover:bg-gray-700 text-black border-1 border-gray-700 transition-colors duration-200 hover:text-white font-medium text-sm px-3 md:px-4 py-3 md:py-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    ><path
                      d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"
                    /></svg
                  >
                  <span class="ml-2">Reset</span>
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div class="my-16 grid grid-cols-2 w-[80%] mx-auto">
            <button
              onclick={upload}
              type="submit"
              class=" bg-orange-400 text-white py-2 rounded-l-full font-semibold hover:bg-orange-600 transition duration-200"
            >
              Upload
            </button>
            <button
              onclick={resetAll}
              type="button"
              class=" text-gray-700 py-2 rounded-r-full font-semibold hover:bg-gray-700 hover:text-white border-2 border-gray-700 transition duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</main>
