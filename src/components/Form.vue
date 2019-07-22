<template>
  <form @submit.prevent="handleClick(answer)">
    <Input
      placeholder="Type your answer here"
      type="input"
      label="Answer"
      validation="required"
      v-model="answer"
    />
    <button
      class="submit-btn"
      type="button"
      @click="handleClick(answer)"
      >
      Submit
    </button>
  </form>
</template>

<script>
import Input from "./Input.vue";

export default {
  name: "Form",
  components: {
    Input
  },

  data() {
    return {
      answer: ""
    };
  },

  computed: {
    isEnabled: function() {
      return !!Object.values(this.inputs).every(Boolean);
    }
  },

  methods: {
    handleClick: function(answer) {
      this.$emit("button-clicked", answer)
    }
  }
};
</script>

<style lang="scss" src="@/assets/styles/Form.scss"></style>