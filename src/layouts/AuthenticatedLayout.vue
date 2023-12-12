<script>
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';
export default {
  components: {Header, Sidebar, Footer},
  name: 'AuthenticatedLayout'
}
</script>

<template>
  <Header />
  <div class="container flex">
    <div class="sidebar mr-4">
      <Sidebar />
    </div>
    <slot />
  </div>
  <Footer />
</template>
