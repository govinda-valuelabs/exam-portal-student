<script>
import axios from 'axios';
export default {
  name: "QuestionList",
  props: {
    questions: {
      type: [Array, Object],
      default: () => [],
    },
    exam: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      answers: [],
    }
  },
  watch: {
    '$route.params.questionId': {
      handler: function(value) {
        this.openQuestion(value);
        this.getAnswers()
      }
    }
  },
  mounted() {
    this.getAnswers();
    this.getClass(this.exam)
  },
  methods: {
    async getAnswers() {
      const studentId = localStorage.getItem('studentId');
      const result = await axios.post('http://localhost:8080/answer/' + studentId);
      if (result) {
        this.answers = result.data
      }
      for (let q in this.questions) {
        this.getClass(this.questions[q]);
      }
    },
    async openQuestion(questionId) {
      const studentId = localStorage.getItem('studentId');
      const result = await axios.post('http://localhost:8080/attempt/' + studentId, { questionId, status: 'opened', optionId: '' });
    },

    async getClass(question) {
      const route = document.getElementById(`route-${question._id}`);
      const answer = this.answers.find((a) => a.question == question._id);
      let cls = 'bg-gray-500';
      if (route) {
        route.classList.remove('bg-gray-500', 'bg-green-500', 'bg-fuchsia-500');

        if (answer?.status == 'opened') {
          cls = 'bg-orange-500'
        }

        if (answer?.status == 'attempted') {
          cls = 'bg-green-500'
        }
        
        if (this.$route.params.questionId == question.questionId) {
          route.classList.add('bg-blue-500');
        } else {
          route.classList.add(cls);
        }
      }
    },
  },
};
</script>
<template>
  <div
    class="flex flex-col side-h-screen bg-white shadow shadow-bottom-none w-3/12 pl-5"
  >
    <div class="space-y-3">
      <div class="flex items-center mt-4">
        <h2 class="text-xl font-bold text-center">Questions</h2>
      </div>
      <div class="flex-1">
        <ul class="flex text-center flex-wrap text-[16px]">
          <li v-for="(q, i) in questions" :key="i">
            <router-link
              :id="`route-${q._id}`"
              :to="`/survey/${q._id}`"
              :class="`inline-block m-1 w-12 h-12 rounded-md cursor-pointer items-center pt-3 ${q.cls} ${$route.params.questionId == q._id ? 'active-question' : ''}`"
              >{{ parseInt(i) + 1 }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>