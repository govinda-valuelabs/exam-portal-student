<script>
import axios from "axios";
import Toaster from '../components/Toaster.vue'
export default {
  name: "QuestionCard",
  components: { Toaster },
  data: () => {
    return {
      loading: false,
      question: null,
      questionIndex: null,
      answer: null,
      timer: null,
      text: null,
      file: {
        url: null
      },
      waitTime: 1000,
      feedback: {
        comment: null
      },
      toast: {
        show: false,
        type: 'success',
        message: 'File was removed successfully!'
      },
      preview: false,
      remove: false
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
    'toast.show': {
      handler: function(value) {
        if (value) {
          setTimeout(function() {
            this.toast.show = false;
          }, 3000);
        }
      } 
    }
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
        this.$emit('opened', { questionId: id });
        if (this.question.attachment) {
          this.getFile();
        }
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
      try {
        const result = await axios.post('http://localhost:8080/attempt/' + studentId, payload);
        if (result) {
          this.$emit('answer', { questionId, status, optionId });
        }
      } catch (error) {
        console.log('Error ', message.error);
      }
    },
    async changeInputText(evt) {
      const text = evt.target.value
      if (text.trim() != '') {
        const answer = text.trim();
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
      this.remove = true;
      const attachment = evt.target.files[0];
      const fd = new FormData();
      const studentId = localStorage.getItem('studentId');
      const question = this.$route.params.questionId;
      fd.append('attachment', attachment);
      fd.append('studentId', studentId);
      fd.append('question', question);

      const result = await axios.post('http://localhost:8080/file-upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (result.status == 201) {
        console.log('result doc ', result);
        this.file.url = 'http://localhost:8080/' + result._doc.path;
      }
    },
    async removeFile() {
      const studentId = localStorage.getItem('studentId');
      const question = this.$route.params.questionId;
      try {
        const result = await axios.post('http://localhost:8080/delete-attachment', {studentId, question});
        if (result.status) {
          this.toast.show = true;
          this.toast.type = 'success';
          this.toast.message = 'File was removed successfully!';
        }
      } catch (error) {
        
      }
    },
    async getFile() {
      const studentId = localStorage.getItem('studentId');
      const questionId = this.$route.params.questionId;
      const result = await axios.get('http://localhost:8080/get-attachment?studentId=' + studentId + '&questionId=' + questionId);
      if (result.status == 200 && result.data) {
        this.file.url = 'http://localhost:8080/' + result.data.path;
      }
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
    <Toaster v-if="toast.show" :type="toast.type" :message="toast.message" @close="toast.show = false"/>
    <p class="font-semibold text-[22px]"> <span>{{ questionIndex }}</span> Question: {{ question.title }}</p>

    <div v-if="question.type == 'text'" class="options">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div class="mt-2">
          <input
            :id="`option-${question.type}`"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your answer" @blur="changeInputText" :value="answer ? answer.answer : ''" />
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
      <div class="mt-2 flex">
        <input :id="`file-option-${question.type}`" type="file"
          class="text-sm"
          placeholder="Choose File" @change="onFileChange" />
          <button
            v-if="remove"
            type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm px-2 py-1 text-center me-2 mb-2"
            @click="removeFile()"
          >&times;</button>
      </div>
      <div v-if="file.url" class="mt-4">
        <img
          :src="file.url"
          class="attachment-file"
          alt="attachment"
          title="Click to remove file"
          @mouseenter="preview = true"
          @mouseleave="preview = false"
          @click="removeFile()"
        />
        <div v-if="preview">
          <img :src="file.url" alt="attachment-preview" class="attachment-preview" />
        </div>
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
        Remark</button>
    </div>
  </div>
</template>