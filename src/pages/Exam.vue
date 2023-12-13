<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import QuestionList from "../components/QuestionList.vue";
import axios from 'axios';
export default {
  name: "Exam",
  components: { AuthenticatedLayout, QuestionList },
  data: () => {
    return {
      questions: [],  
      exam: null,
      remainingTime: null
    }
  },
  mounted() {
    this.getExamStatus();
    this.getQuestions();
  },
  methods: {
    async getExamStatus() {
      const studentId = localStorage.getItem("studentId");
      const result = await axios.get("http://localhost:8080/exam/status/" + studentId);
      if (result.status == 200) {
        this.exam = result.data;
      }
    },
    async getQuestions() {
      const result = await axios.get("http://localhost:8080/exam/question");
      if (result.status == 200 && result.data) {
        this.questions = result.data;
      }
    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="w-[80%] mt-6 ml-6">
      <h1 class="text-[32px]">Welcome to Exam Portal</h1>
      <p class="text-green-500 text-[22px]">
        <b>Note: </b>All the questions are mandatory
      </p>
      <router-link
        to="/exam"
        class="float-right pl-4 pr-4 pt-2 pb-2 bg-lime-700 rounded-md"
        >Exam</router-link
      >
    </div>
  </AuthenticatedLayout>
</template>