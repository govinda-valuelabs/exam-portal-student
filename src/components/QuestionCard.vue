<script>
import axios from 'axios';
export default {
  name: 'QuestionCard',
  data: () => {
    return {
      loading: false,
      question: null
    }
  },
  computed: {
    questionId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async getQuestion() {
      const id = this.questionId();
      try {
        const result = await axios.get('http://localhost:8080/question/' + id);
        if (result.status == 200 && result.data) {
          this.question = result.data;
        }
      } catch (error) {
        console.log('Error ' , error.message);
      }
    }
  }
}
</script>
<template>
  
</template>