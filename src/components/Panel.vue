<template>
  <div class="panel">
    <div class="header">
      <button class="info" @click="info">?</button>

      <transition name="info-popup">
        <div id="info-box" class="modal" v-if="showInfo">
          <div class="modal-content">
            <span class="close" @click="closeInfo">&times;</span>
            <h1>How to play</h1>
            <p>1. Click the 'Reveal' button to show part of the image</p>
            <p>2. Make a guess of what the image shows</p>
            <p>You are playing against an AI, that will also guess what the image is</p>
            <h3>Be quick! The longer you take, the lower your score will be. Be careful though! Wrong answers give you no points</h3>
          </div>
        </div>
      </transition>

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
      showInfo: false,
    }
  },

  props: {
    headline: String,
    playerName: String,
    playerScore: Number,
  },

  methods: {
    info() {
      //document.getElementById('info-box').style.display = "block";
      this.showInfo = true;
    },

    closeInfo() {
      //document.getElementById('info-box').style.display = "none";
      this.showInfo = false;
    }
  }
};
</script>

<style lang="scss" src="@/assets/styles/Panel.scss"/>