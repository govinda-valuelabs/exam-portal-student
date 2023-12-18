<script>
import { isProxy, toRaw } from 'vue'
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
      randomKey: Math.random()
    };
  },
  mounted() {
    this.getExamStatus();
    this.getQuestions();
  },
  methods: {
    checkAnswer(evt) {
      this.getExamStatus();
    },
    async getExamStatus() {
      const studentId = localStorage.getItem("studentId");
      const result = await axios.get(
        "http://localhost:8080/exam/status/" + studentId
      );
      if (result.status == 200 && result.data) {
        this.exam = result.data;
        this.interval = setInterval(this.checkRemainingTime, 1000);
      } else {
        this.$router.push('/');
      }
    },
    checkRemainingTime() {
      const currentTime = Date.now("Asia/Kolkata");
      const examTime = new Date(this.exam.startTime).valueOf();
      let milliseconds = currentTime - examTime;

      if (milliseconds > this.exam.limit) {
        clearInterval(this.interval);
        this.submit();
      }
      const remainingSeconds = this.exam.limit - milliseconds;
      this.remainingTime = this.msToTime(remainingSeconds);
    },

    async submit() {
      try {
        const result = await axios.patch('http://localhost:8080/exam/' + this.exam._id, {endTime: Date.now('Asia/Kolkata')});
        if (result) {
          this.$router.push('/finished');
          console.log('result ', result);
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
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
        this.questions = isProxy(result.data) ? toRaw(result.data) : result.data;
        for (let q in this.questions) {
          this.questions[q].cls = 'bg-gray-500';
        }
        this.$router.push('/exam/' + this.questions[0]._id);
      }
      this.randomKey = Math.random();
    },
    onClickPrevious() {
      const id = this.$route.params.questionId;
      let questions = toRaw(this.questions)
      for (let q in questions) {
        let index = parseInt(q);
        if (questions[index]._id == id && questions[index - 1]) {
          this.$router.push({name: 'examquestion', params: { questionId: questions[index - 1]._id }});
          break;
        } 
      }
    },
    onClickNext() {
      const id = this.$route.params.questionId;
      let questions = toRaw(this.questions)
      for (let q in questions) {
        let index = parseInt(q);
        if (questions[index]._id == id && questions[index + 1]) {
          this.$router.push({name: 'examquestion', params: { questionId: questions[index + 1]._id }});
          break;
        } 
      }
    }
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
        <question-list v-if="exam" :questions="this.questions || []" :exam="exam" :key="randomKey"/>
        <div class="question">
          <router-view @answer="checkAnswer" @opened="getExamStatus()" @previous="onClickPrevious()" @next="onClickNext()" @submit="submit()"></router-view>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>