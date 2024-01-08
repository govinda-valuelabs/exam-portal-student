<script>
import axios from "axios";
export default {
  name: "QuestionCard",
  data: () => {
    return {
      loading: false,
      question: null,
      questionIndex: null,
      answer: null,
      timer: null,
      text: null,
      file: null,
      waitTime: 1000,
      feedback: {
        comment: null
      }
    };
  },
  mounted() {
    this.getQuestion();
    this.getAnswer();
    this.$nextTick(function () {
      this.getQuestionIndex();
    })
    this.getFeedback();
  },
  computed: {
    options() {
      let options = [];

      if (this.answer) {
        this.answer.option.forEach((o) => {
          options.push(o._id)
        })
      }

      return options;
    }
  },
  watch: {
    "$route.params.questionId": {
      handler: function (value) {
        this.getQuestion();
        this.getAnswer();
        this.getFeedback();
      },
    },
  },
  methods: {
    getQuestionIndex() {
      const self = this
      setTimeout(function () {
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
        const result = await axios.get("http://localhost:8080/question/" + id + '?studentId=' + studentId);
        if (result.status == 200 && result.data) {
          this.question = result.data;
          this.$nextTick(function () {
            this.getQuestionIndex();
          })
        }
        this.$emit('opened', { questionId: id })
      } catch (error) {
        console.log("Error ", error.message);
      }
    },
    async getAnswer() {
      const questionId = this.$route.params.questionId;
      const studentId = localStorage.getItem('studentId');
      try {
        const result = await axios.get("http://localhost:8080/answer/" + questionId + "/" + studentId);
        this.answer = result.data;
      } catch (error) {
        console.log("Error ", error.message);
      }
    },

    async onChangeOption(optionId, status) {
      const { questionId } = this.$route.params
      const studentId = localStorage.getItem('studentId');
      const type = this.question.type;
      const payload = { questionId, status, optionId, type };
      console.log('payload ', payload);
      try {
        const result = await axios.post('http://localhost:8080/attempt/' + studentId, payload);
        if (result) {
          this.$emit('answer', { questionId, status, optionId });
        }
      } catch (error) {
        console.log('Error ', message.error);
      }
    },
    async changeInputText() {
      if (this.text.trim() != '') {
        const answer = this.text.trim();
        const status = 'attempted';
        const studentId = localStorage.getItem('studentId');
        const question = this.$route.params.questionId;
        const type = 'text';
        if (this.answer) {
          await axios.patch('http://localhost:8080/answer/' + this.answer._id, { answer, status, studentId, question, type });
        } else {
          await axios.post('http://localhost:8080/answer', { answer, status, studentId, question, type })
        }
      }
    },
    async getFeedback() {
      const question = this.$route.params.questionId;
      const studentId = localStorage.getItem('studentId');
      const result = await axios.get('http://localhost:8080/feedback/' + question + '/' + studentId);
      if (result.data) {
        this.feedback = result.data;
      } else {
        this.feedback = {
          comment: null
        }
      }
    },
    async onFileChange(evt) {
      const attachment = evt.target.files[0];
      const fd = new FormData();
      const studentId = localStorage.getItem('studentId');
      const question = this.$route.params.questionId;
      fd.append('attachment', attachment);
      fd.append('studentId', studentId);
      fd.append('question', question);
      fd.append('status', 'attempted');

      const result = await axios.post('http://localhost:8080/attachment/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    },
    async submitFeedback() {
      const question = this.$route.params.questionId;
      const studentId = localStorage.getItem('studentId');
      this.feedback.student = studentId;
      this.feedback.question = question;
      this.feedback.type = this.question.type;
      if (this.feedback._id) {
        await axios.patch('http://localhost:8080/feedback/' + this.feedback._id, this.feedback);
      } else {
        const result = await axios.post('http://localhost:8080/feedback/', this.feedback);
      }
    }
  },
};
</script>
<template>
  <div v-if="question" class="container ml-6">
    <p class="font-semibold text-[22px]"> <span>{{ questionIndex }}</span> Question: {{ question.title }}</p>

    <div v-if="question.type == 'text'" class="options">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mt-2">
          <input :id="`option-${question.type}`" type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your answer" @blur="changeInputText()" :value="answer ? answer.answer : ''" />
        </div>
      </div>
    </div>
    <div v-if="['radio', 'checkbox', 'boolean'].includes(question.type)" class="options">
      <ul>
        <li v-for="(o, index) in question.options" :key="index">
          <div class="flex items-center mb-4 mt-4 ml-4">
            <input :id="`option-${o._id}`" :type="question.type == 'checkbox' ? 'checkbox' : 'radio'" :value="o._id"
              :checked="options.includes(o._id)" name="option" :key="Math.random() + 1"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="onChangeOption(o._id, 'attempted')" />
            <label :for="`option-${o._id}`" class="ms-2 text-sm font-medium text-black cursor-pointer">
              {{ o.value }}
            </label>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="question.attachment" class="attachment">
      <div class="mt-2">
        <input :id="`file-option-${question.type}`" type="file"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Choose File" @change="onFileChange" />
      </div>
    </div>
    <hr class="mb-6 mt-2">
    <div class="flex">
      <button v-if="!question.isFirst"
        class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded mr-6" @click="$emit('previous')">
        Prev
      </button>
      <button v-if="!question.isLast" class="bg-blue-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded ml-6"
        @click="$emit('next')">
        Next
      </button>
      <button v-if="question.isLast" type="button"
        class="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded ml-6"
        @click="$emit('submit')">Submit</button>
    </div>
    <hr class="mb-6 mt-2">
    <div class="feedback">
      <input :id="`feedback-${question._id}`" v-model="feedback.comment" type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write remark for this question" />
      <button v-if="feedback.comment" type="button"
        class="mt-2 bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2" @click="submitFeedback()">Submit
        Feedback</button>
    </div>
  </div>
</template>