<script>
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal.vue";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
export default {
  components: { AuthenticatedLayout, ConfirmModal },
  data: () => {
    return {
      survey: null,
      showModal: false
    };
  },
  mounted() {
    this.getExamStatus();
  },
  methods: {
    async getExamStatus() {
      const studentId = localStorage.getItem("studentId");
      const result = await axios.get("http://localhost:8080/exam/status/" + studentId);
      
      if (result.data != null) {
        this.survey = result.data
      }
    },
    onClickStart() {
      this.showModal = true;
    },
    
    async confirmStart() {
      this.$router.push("/survey");
    },
  },
};
</script>
<template>
  <AuthenticatedLayout>
    <ConfirmModal
      v-if="showModal"
      title="Please confirm"
      @confirm="confirmStart()"
      @cancel="showModal = false"
    >
      You are going to start survey, the timer will be started and it will
      not be reverted.
    </ConfirmModal>
    <div class="w-[80%] mt-6 ml-6">
      <h1 class="text-[32px]">Welcome to Survey Portal</h1>
      <p v-if="survey">You have a survey in {{ survey.category.name }}</p>
      <p class="text-green-500 text-[22px]">
        <b>Note: </b>All the questions are mandatory
      </p>
      <button
        type="button"
        class="float-right pl-4 pr-4 pt-2 pb-2 bg-lime-700 rounded-md"
        @click="onClickStart()"
      >
        Start
      </button>
    </div>
  </AuthenticatedLayout>
</template>