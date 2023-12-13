<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import axios from "axios";
import QuestionList from '../components/QuestionList.vue';
export default {
  name: "Exam",
  components: { AuthenticatedLayout, QuestionList },
  data: () => {
    return {
      questions: [],
      exam: null,
      remainingTime: "00:20:00",
      interval: null,
    };
  },
  mounted() {
    this.getExamStatus();
    this.getQuestions();
  },
  methods: {
    async getExamStatus() {
      const studentId = localStorage.getItem("studentId");
      const result = await axios.get(
        "http://localhost:8080/exam/status/" + studentId
      );
      if (result.status == 200 && result.data) {
        this.exam = result.data;
        this.interval = setInterval(this.checkRemainingTime, 1000);
      }
    },
    checkRemainingTime() {
      const currentTime = Date.now("Asia/Kolkata");
      const examTime = new Date(this.exam.startTime).valueOf();
      let milliseconds = currentTime - examTime;

      if (milliseconds > this.exam.limit) {
        clearInterval(this.interval);
      }
      const remainingSeconds = this.exam.limit - milliseconds;
      this.remainingTime = this.msToTime(remainingSeconds);
    },

    msToTime(duration) {
      let seconds = Math.floor((duration / 1000) % 60);
      let minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return hours + ":" + minutes + ":" + seconds;
    },
    async getQuestions() {
      const result = await axios.get("http://localhost:8080/exam/question");
      if (result.status == 200 && result.data) {
        this.questions = result.data;
      }
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="mt-6 ml-6">
      <p class="text-green-500 text-[22px]">
        <b>Remaining Time: {{ remainingTime }}</b>
      </p>
      <div class="flex">
        <question-list :questions="this.questions || []" />
        <div class="question">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>