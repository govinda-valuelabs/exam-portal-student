<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios'

export default {
  name: 'Finished',
  components: { AuthenticatedLayout, ckeditor: CKEditor.component },
  data: () => {
    return {
      editor: ClassicEditor,
      review: {
        comment: ''
      },
      editorConfig: {
        height: 300
      }
    };
  },
  mounted() {
    this.getReview();
  },
  methods: {
    async getReview() {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        this.$router.push('/login');
      }
      try {
        const result = await axios.post('http://localhost:8080/review/' + studentId);
        if (result.status == 200) {
          this.review = result.data
        }
      } catch (error) {
        console.log('Error ', error.message);
      }
    },
    async submitReview() {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        this.$router.push('/login');
      }
      try {
        const result = await axios.post('http://localhost:8080/review', {student: studentId, comment: this.review.comment });
        this.getReview()
      } catch (error) {
        console.log('Error ', error.message);
      }
    }
  }
};
</script>
<template>
  <AuthenticatedLayout>
    <div class="w-[80%] mt-6 ml-auto">
      <h1 class="text-[32px]"><b>Exam has been completed! </b></h1>
      <div class="w-full">
        <label for="type" class="text-sm font-medium leading-6 text-gray-900">Write your feedback about the survey</label>
        <div class="mt-2 mb-4">
          <ckeditor :editor="editor" v-model="review.comment" :config="editorConfig" />
          <button type="button" class="mt-2 bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2"
            @click="submitReview()">Submit
            Feedback</button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>