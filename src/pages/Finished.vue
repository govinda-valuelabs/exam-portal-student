<script>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'

export default {
  name: 'Finished',
  components: { AuthenticatedLayout },
  data: () => {
    return {
      editor: ClassicEditor,
      review: {
        comment: ''
      },
      editor: null
    }
  },
  mounted() {
    const self = this
    this.getReview();
    this.editor = new FroalaEditor('#editor', {
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
      imageUploadMethod: 'POST',
      imageUploadURL: 'http://localhost:8080/image-upload',
      events: {
        'image.inserted': function (response) {
          self.review.comment = document.querySelector('.fr-element.fr-view').innerHTML;
      },
      }
    });
    
    setTimeout(function() {
      document.querySelector('.fr-element.fr-view').innerHTML = self.review.comment
      document.querySelector('.fr-element.fr-view').addEventListener('keyup', self.onChangeComment)
      document.querySelector('.fr-element.fr-view').addEventListener('paste', self.onChangeComment)
    }, 1000)
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
    onChangeComment(evt) {
      this.review.comment = evt.target.innerHTML;
      console.log('evt.target.innerHTML ', evt.target.innerHTML);
    },
    async submitReview() {
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        this.$router.push('/login');
      }
      try {
        const result = await axios.post('http://localhost:8080/review', { student: studentId, comment: this.review.comment });
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
          <textarea name="editor" id="editor"></textarea>
          <button type="button" class="mt-2 bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-1 px-2"
            @click="submitReview()">Submit
            Feedback</button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>