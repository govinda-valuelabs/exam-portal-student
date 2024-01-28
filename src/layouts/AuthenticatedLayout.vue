<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
export default {
  components: { Header, Footer },
  name: "AuthenticatedLayout",
  data: () => {
    return {
      isLooged: false,
      events: [
        'load',
        'mousemove',
        'mousedown',
        'click',
        'scroll',
        'keypress'
      ],
      warnTimeout: null,
      logoutTimeout: null
    }
  },
  async mounted() {
    this.events.forEach(event => {
      window.addEventListener(event, this.resetTimeout);
    })
    this.setTimeout();
    try {
      const studentToken = localStorage.getItem("studentToken");
      const result = await axios.post("http://localhost:8080/student/is-logged", {
        token: studentToken,
      });
      if (result.status != 200) {
        this.$router.push("/login");
      } else {
        this.isLooged = true;
        localStorage.setItem('studentId', result.data.studentId);
        localStorage.setItem('name', result.data.name);
        localStorage.setItem('email', result.data.email);
      }

    } catch (error) {
      this.$router.push("/login");
    }
  },
  methods: {
    clearTimeout() {
      if (this.warnTimeout)
        clearTimeout(this.warnTimeout);

      if (this.logoutTimeout)
        clearTimeout(this.logoutTimeout);
    },

    setTimeout() {
      this.warnTimeout = setTimeout(this.warn, 14 * 60 * 1000);

      this.logoutTimeout = setTimeout(this.logout, 15 * 60 * 1000);
    },

    resetTimeout() {
      this.clearTimeout();
      this.setTimeout();
    },
    
    async logout() {
      const result = await axios.get('http://localhost:8080/student/logout');
      if (result.status == 200) {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('studentId');
        this.$router.push('/login');
      }
    },
    warn() {
      alert('You will be logged out automatically in 1 minute.');
    },
  }
};
</script>

<template>
  <Header />
  <div class="container flex h-screen w-[100%]">
    <slot />
  </div>
</template>
