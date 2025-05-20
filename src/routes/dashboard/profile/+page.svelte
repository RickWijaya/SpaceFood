<script>
  // @ts-nocheck
  import profilePic from "$lib/image.png";
  const { data } = $props();
  const user = data.user;
  let uploadURL = $state(user.profile_picture);
  let showEditModal = $state(false);
  const editModal = () => {
    showEditModal = true;
  };
  const closeModal = () => {
    showEditModal = false;
  };
  let username = $state(user.name);
  let updateUserName = $state(user.name);
  let updatePassword = $state("");
  let updateConfPassword = $state("");
  let showLogoutModal = $state(false);
  let userprofile_picture = $state(user.profile_picture)
  const updateAccount = () => {};
  const logoutModal = () => {
    showLogoutModal = !showLogoutModal;
  };
  const logout = async () => {
    try {
      const response = await fetch("http://localhost/spacefood/logout.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        user.set(null);
        document.location.reload();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const updatename = async () => {
    try {
      const response = await fetch("http://localhost/spacefood/updateusername.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newusername: updateUserName })
      });
      const data = await response.json();
      if (data.success) {
      alert(data.success);
      username = updateUserName
    } else if (data.Error || data.error) {
      alert(data.Error || data.error); 
    }
    } catch (error) {
      console.log("Change username failed",error)
    }

  };
  let imageFile = null;
  let uploadError = null;
  let isUploading = false;
  
  const displayPreview = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        uploadError = 'Only JPG and PNG images are allowed';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        uploadError = 'Image must be less than 5MB';
        return;
      }
      imageFile = file;
      uploadError = null;
      uploadURL = URL.createObjectURL(file);
    }
  };
  const updateProfilePicture = async () => {
    if (!imageFile) {
      uploadError = 'Please select an image first';
      return;
    }
    isUploading = true;
    uploadError = null;
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch("http://localhost/spacefood/updateprofile.php", {
        method: "POST",
        credentials: "include",
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update profile picture');
      }
      alert("Profile Changed please reload the page")
      userprofile_picture = data.imageUrl;
      showEditModal = false;
    } catch (error) {
      uploadError = error.message;
    } finally {
      isUploading = false;
    }
  };
</script>
<svelte:head>
  <title>Profile</title>
</svelte:head>
{#if showEditModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-2">
        <p class="text-xl font-semibold">Edit account</p>
        <div class="my-auto">
          <button
            aria-label="close"
            onclick={closeModal}
            class="rounded-full aspect-square p-2 bg-gray-100 mx-auto hover:bg-gray-200 duration-200"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
              ><path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
              /></svg
            >
          </button>
        </div>
      </div>
      <hr />
      <div class="my-4">
        <form action="">
          <div class="grid grid-cols-1">
            <div class="my-2">
              <label for="username">Username</label>
              <div class="flex gap-4">
                <input
                  bind:value={updateUserName}
                  class="bg-gray-200 px-3 py-2 rounded-full w-full"
                  type="text"
                  name="username"
                  id="username"
                />
                <button
                  class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
                  type="button"
                  onclick={updatename}>Update</button
                >
              </div>
            </div>
            <hr class="my-2 opacity-20" />
            <div class="my-2">
              <label for="username">Profile picture</label>
              <div class="grid grid-cols-1 gap-4">
                <div class="grid grid-cols-1">
                  <input
                    required
                    accept="image/png, image/gif, image/jpeg"
                    onchange={displayPreview}
                    class="block md:w-100 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />
                  {#if uploadURL}
                    <img
                      class="aspect-square md:w-100 md:h-100 w-50 h-50 object-cover border-2"
                      src={uploadURL}
                      alt="preview"
                    />
                  {/if}
                </div>
                <button
                  class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
                  type="button"
                  onclick={updateProfilePicture}>Update Picture</button
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}
{#if showLogoutModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-screen h-screen"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <p class="text-xl font-semibold mb-2">Are you sure want to logout?</p>
      <hr />
      <div class="my-4">
        <div class="grid grid-cols-1">
          <div class="my-2">
            <p>There still awesome thing here</p>
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <button
          onclick={logoutModal}
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          No
        </button>
        <a
          onclick={logout}
          href="/login"
          class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-600"
          >Yes</a
        >
      </div>
    </div>
  </div>
{/if}
<main class="mt-20 md:mt-0 md:ml-40 bg-gray-50 min-h-screen py-6 px-4">
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center bg-gray-50 p-6 rounded-2xl shadow-md">
      <img
        src={userprofile_picture ? userprofile_picture : profilePic}
        alt="User Profile"
        class="w-20 h-20 object-cover rounded-full border-2 border-orange-300 shadow"
      />
      <div class="ml-4 flex-1">
        <h2 class="text-xl font-semibold text-gray-800">{username}</h2>
        <p class="text-sm text-gray-500">UID: <span>{user.id}</span></p>
      </div>
      <button
        onclick={editModal}
        class="hidden md:inline-block px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-full text-sm font-medium transition duration-200"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            ><path
              d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
            /></svg
          >
          <p class="ml-2">Edit Account</p>
        </div>
      </button>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-md space-y-1">
      <h3 class="text-lg font-medium text-gray-800 mb-2">Account</h3>
      <p class="text-gray-700">@Gmail</p>
      <p class="text-sm text-gray-400">{user.email}</p>

      <button
        onclick={editModal}
        class="mt-4 inline-block md:hidden px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-full text-sm font-medium transition duration-200"
      >
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
            ><path
              d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
            /></svg
          >
          <p class="ml-2">Edit Account</p>
        </div>
      </button>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h3 class="text-lg font-medium text-gray-800">Preference</h3>

      <div class="flex items-center justify-between">
        <label for="Language" class="text-gray-700">Language</label>
        <select
          name="Language"
          class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="en">English</option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <label for="mode" class="text-gray-700">Appearence</label>
        <select
          name="mode"
          class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="en">Light</option>
        </select>
      </div>

      <button
        onclick={logoutModal}
        class="flex items-center text-red-500 hover:text-red-600 transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path
            d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
          />
        </svg>
        <span class="ml-2">Logout</span>
      </button>
      <a href="/forgotpassword">Forgot Password?</a>
    </div>
  </div>
</main>
