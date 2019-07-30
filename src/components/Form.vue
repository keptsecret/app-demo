<template>
  <form @submit.prevent="handleClick(answer)">
    <p style="text-align:center; font-size:60px; margin:0px"><b>{{playerName}}</b></p>
    <Input
      placeholder="Type your answer here"
      type="input"
      validation="required"
      v-model="answer"
    />
    <button
      class="submit-btn"
      type="button"
      @click="handleClick(answer)"
      >
      SUBMIT
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

  props: [
    'playerName'
  ],

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