<template>
  <div class="panel">
    <div class="header">
      <button class="info" @click="info">i</button>
      <h2 class="headline">{{ headline }}</h2>
      <div style="margin-right: 10px">
        <div style="float: left">
          <label>{{playerName}}</label>
        </div>
        <div style="float: left; clear:left">
          <label>Score: {{playerScore}}</label>
        </div>
      </div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",

  data: function() {
    return {
      message: "Click the 'Reveal' button to show part of the image. Enter your guess in the box below and press submit. Be quick! The longer you take, the lower your score will be"
    }
  },

  props: {
    headline: String,
    playerName: String,
    playerScore: Number,
  },

  methods: {
    info() {
      const options = {title: 'How to play', size: 'lg'}
      this.$dialogs.alert(this.message, options)
      .then(res => {
      console.log(res)
    })
    }
  }
};
</script>

<style lang="scss" src="@/assets/styles/Panel.scss"/>