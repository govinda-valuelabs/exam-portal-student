<template>
  <div class="flex">
    <div class="flex flex-col side-h-screen p-3 bg-white shadow shadow-bottom-none w-60">
      <div class="space-y-3">
        <div class="flex items-center">
          <h2 class="text-xl font-bold">Dashboard</h2>
        </div>
        <div class="flex-1">
          <ul class="pt-2 pb-4 space-y-1 text-sm">
            <li class="rounded-sm">
              <router-link to="/" class="flex items-center p-2 space-x-3 rounded-md">
                
                <span>Home</span>
              </router-link>
            </li>
            <li class="rounded-sm">
              <router-link
                to="/login"
                class="flex items-center p-2 space-x-3 rounded-md"
              >
                

                <span>Users</span>
              </router-link>
            </li>
            
            <li class="rounded-sm">
              <router-link to="#" class="flex items-center p-2 space-x-3 rounded-md">

                <span>Logout</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
};
</script>