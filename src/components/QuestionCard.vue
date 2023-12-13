<script>
import axios from "axios";
export default {
  name: "QuestionCard",
  data: () => {
    return {
      loading: false,
      question: null,
    };
  },
  mounted() {
    this.getQuestion();
  },
  watch: {
    "$route.params.questionId": {
      handler: function (value) {
        console.log("questionId value ", value);
      },
    },
  },
  methods: {
    async getQuestion() {
      const id = this.$route.params.questionId;
      try {
        const result = await axios.get("http://localhost:8080/question/" + id);
        if (result.status == 200 && result.data) {
          this.question = result.data;
        }
      } catch (error) {
        console.log("Error ", error.message);
      }
    },
  },
};
</script>
<template>
  <div v-if="question" class="container ml-6">
    <p class="font-semibold text-[22px]">Question: {{ question.title }}</p>
    <div class="options">
      <ul>
        <li v-for="(o, index) in question.options" :key="index">
          <div class="flex items-center mb-4 mt-4 ml-4">
            <input
              :id="`option-${o._id}`"
              type="radio"
              :value="o.value"
              name="option"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
            :for="`option-${o._id}`"
              class="ms-2 text-sm font-medium text-black"
              >{{ o.value }}</label
            >
          </div>
        </li>
      </ul>
      <div class="inline-flex">
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Prev
        </button>
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Next
        </button>
      </div>
    </div>
  </div>
</template>