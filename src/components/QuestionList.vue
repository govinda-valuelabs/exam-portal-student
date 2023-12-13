<script>
export default {
  name: "QuestionList",
  props: {
    questions: {
      type: Array,
      default: () => [],
    },
  },
  methods:  {
    getClass() {
      let cls = 'bg-green-800';
      return cls;
    }
  }
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
              :to="`/exam/${q._id}`"
              :class="`inline-block  m-2 w-16 h-16 rounded-md cursor-pointer items-center pt-3 ${getClass()}`"
              >{{ parseInt(i) + 1 }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>