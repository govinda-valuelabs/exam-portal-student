<script>
import axios from 'axios';
export default {
  name: "QuestionList",
  props: {
    questions: {
      type: Array || Object,
      default: () => [],
    },
    exam: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    '$route.params.questionId': {
      handler: function(value) {
        this.openQuestion(value);
        this.getClass(value);
      }
    },
    exam: function(value) {
      this.getClass(value);
    }
  },
  mounted() {
    this.getClass(this.exam)
  },
  methods: {
    async openQuestion(questionId) {
      const studentId = localStorage.getItem('studentId');
      const result = await axios.post('http://localhost:8080/attempt/' + studentId, { questionId, status: 'opened', optionId: '' });
    },

    async getClass(value) {
      for (let q in value.questions) {
        const question = value.questions[q]
        const route = document.getElementById(`route-${question.questionId}`);
        let cls = 'bg-blue-800';
        if (route) {
          route.classList.remove('bg-blue-800', 'bg-green-800', 'bg-fuchsia-600');

          if (question.status == 'opened') {
            cls = 'bg-orange-600'
          }
  
          if (question.status == 'attempted') {
            cls = 'bg-fuchsia-600'
          }
          
          if (this.$route.params.questionId == question.questionId) {
            route.classList.add('bg-green-800');
          } else {
            route.classList.add(cls);
          }
          
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
        <ul class="flex text-center flex-wrap text-[22px]">
          <li v-for="(q, i) in questions" :key="i">
            <router-link
              :id="`route-${q._id}`"
              :to="`/exam/${q._id}`"
              :class="`inline-block  m-2 w-16 h-16 rounded-md cursor-pointer items-center pt-3 ${q.cls} ${$route.params.questionId == q._id ? 'active-question bg-green-800' : ''}`"
              >{{ parseInt(i) + 1 }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>