<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
export default {
  components: { Header, Footer },
  name: "AuthenticatedLayout",
  async mounted() {
    try {
      const studentToken = localStorage.getItem("studentToken");
      const result = await axios.post("http://localhost:8080/student/is-logged", {
        token: studentToken,
      });
      if (result.status != 200) {
        this.$router.push("/login");
      } else {
        localStorage.setItem('studentId', result.data.studentId);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('email', result.data.email);
      }
      
    } catch (error) {
      this.$router.push("/login");
    }
  },
};
</script>

<template>
  <Header />
  <div class="container flex h-screen w-[100%]">
    <slot />
  </div>
</template>
