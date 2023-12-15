<script>
import axios from "axios";
export default {
  name: "QuestionCard",
  data: () => {
    return {
      loading: false,
      question: null,
      questionIndex: null
    };
  },
  mounted() {
    this.getQuestion();
    this.$nextTick(function() {
      this.getQuestionIndex();
    })
  },
  watch: {
    "$route.params.questionId": {
      handler: function (value) {
        this.getQuestion();
      },
    },
  },
  methods: {
    getQuestionIndex() {
      const self = this
      setTimeout(function() {
        const box = document.querySelector('.active-question');
        if (box) {
          self.questionIndex = box.innerHTML + '.'
        }
      }, 10)
    },
    async getQuestion() {
      const id = this.$route.params.questionId;
      const studentId = localStorage.getItem('studentId');
      try {
        const result = await axios.get("http://localhost:8080/exam/question/" + id + '?studentId=' + studentId);
        if (result.status == 200 && result.data) {
          this.question = result.data;
          this.$nextTick(function() {
            this.getQuestionIndex();
          })
        }
        this.$emit('opened', {questionId: id})
      } catch (error) {
        console.log("Error ", error.message);
      }
    },
    async onChangeOption(optionId, status) {
      const { questionId } = this.$route.params
      const studentId = localStorage.getItem('studentId');
      try {
        const result = await axios.post('http://localhost:8080/attempt/' + studentId, { questionId, status, optionId });
        if (result) {
          this.$emit('answer', {questionId, status, optionId});
        }
      } catch (error) {
        console.log('Error ', message.error);
      }
    },
    async submit() {
      try {
        const studentId = localStorage.getItem('studentId');
        const result = await axios.post('http://localhost:8080/exam/submit', {studentId});
        if (result) {
          this.$router.push('/finished');
          console.log('result ', result);
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    }
  },
};
</script>
<template>
  <div v-if="question" class="container ml-6">
    <p class="font-semibold text-[22px]"> <span>{{ questionIndex }}</span> Question: {{ question.title }}</p>
    <div class="options">
      <ul>
        <li v-for="(o, index) in question.options" :key="index">
          <div class="flex items-center mb-4 mt-4 ml-4">
            <input
              v-if="question.selected == o._id"
              :checked="true"
              :id="`option-${o._id}`"
              type="radio"
              :value="o._id"
              name="option"
              :key="Math.random()"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="onChangeOption(o._id, 'attempted')"
            />
            <input
              v-else
              :id="`option-${o._id}`"
              type="radio"
              :value="o._id"
              name="option"
              :key="Math.random() + 1"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="onChangeOption(o._id, 'attempted')"
            />
            <label
            :for="`option-${o._id}`"
              class="ms-2 text-sm font-medium text-black cursor-pointer"
              >{{ o.value }}</label
            >
          </div>
        </li>
      </ul>
        <hr class="mb-6 mt-2">
        <div class="flex">
          <button v-if="!question.isFirst" class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded mr-6" @click="$emit('previous')">
            Prev
          </button>
          <button v-if="!question.isLast" class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded ml-6" @click="$emit('next')">
            Next
          </button>
          <button v-if="question.isLast" type="button" class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded ml-6" @click="submit()">Submit</button>
        </div>
    </div>
  </div>
</template>