<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
export default {
  name: 'Finished',
  components: { AuthenticatedLayout },
  data: () => {
    return {
      started: false,
    };
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="w-[80%] mt-6 ml-6">
      <h1 class="text-[32px]"><b>Exam has been completed! </b></h1>
    </div>
  </AuthenticatedLayout>
</template>