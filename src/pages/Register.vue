<script>
import axios from 'axios';
import GuestLayout from '../layouts/GuestLayout.vue';
export default {
  name: 'Register',
  components: { GuestLayout },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      empty: false
    };
  },
  methods: {
    async submitForm() {
      if (this.name === '' || this.email === '' || this.password === '') {
        this.empty = true;
        return;
      } else {
        this.empty = false;
        try {
          const result = await axios.post('http://localhost:8080/user', { name: this.name, email: this.email, password: this.password });
          console.log('result ', result);
          if (result.status == 201) {
            this.$router.push('/signin');
          }
          this.name = '';
          this.email = '';
          this.password = '';
        } catch (error) {
          console.log('Error ' + error.message);
        }
      }
    }
  }
};
</script>
<template>
  <GuestLayout class="sign-up">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold text-center">Sign Up</h1>
      <form class="mt-8" @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block mb-2">Name</label>
          <input type="text" id="name" v-model="name" class="w-full px-4 py-2 border border-gray-300 rounded" required placeholder="Enter your name">
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input type="email" id="email" v-model="email" class="w-full px-4 py-2 border border-gray-300 rounded" required placeholder="Enter email">
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <input type="password" id="password" v-model="password" class="w-full px-4 py-2 border border-gray-300 rounded"
            required placeholder="Enter password">
        </div>
        <div v-if="empty" class="mb-4">
          <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
            role="alert">
            <span class="font-medium">Warning !</span> Please fill the required field.
          </div>
        </div>
        
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </button>
        <p class="mb-1 float-right">Already have an account? <router-link class="text-blue-500" to="/signin">Sign in</router-link>.</p>
      </form>
    </div>
  </GuestLayout>
</template>

