<template>
  <div class="home">
     <div align="left">
      <button @click="resetup()">Set up app again</button>
     </div>
    <main>
      <Panel
        class="demo-panel"
        headline="App demo"
        :player-name="playerName"
        :player-score="playerScore"
        ref="Panel"
      >

        <LoadImage ref="img_canvas" @img-revealed="passSubmit"></LoadImage>

        <div>
          <p ref="timer" v-if="enableSubmit()"><time>Timer: 0s</time></p>
        </div>

          <div style="display: flex; margin-top: 20px">
            <div style="flex: 1; margin-right: 20px; margin-left: 10px">
              <template>
                <Form
                  v-if="enableSubmit()"
                  @button-clicked="submit"
                />
              </template>
            </div>

            <div v-if="enableSubmit()" style="flex: 1; margin-left: 20px; margin-right: 10px;">
              <p><b>AI Answer</b></p>
              <label>{{AIanswer}}</label>
            </div>
          </div>

        <div>
          <div>
            <label id="output" v-if="enableSubmit()" style="float:left; margin: 10px"></label>
          </div>
        
          <div>
            <Reset v-if="submittedAnswers()" @call-reset="resetAll" style="float:right; margin: 10px"></Reset>
          </div>
        </div>
        
      </Panel>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Panel from '@/components/Panel.vue'
import LoadImage from '@/components/LoadImage.vue'
import Form from '@/components/Form.vue'
import Reset from '@/components/Reset.vue'

function initialState() {
  return {
    answer: "",
    confirm: false,
    message: "",
    AIanswer: "AI's answer",
    playerName: "",
    playerScore: 0,
    seconds: 0,
    time: null
  }
}

export default {
  name: "home",

  components: {
    Panel,
    LoadImage,
    Form,
    Reset
  },

  data() {
    return initialState();
  },

  methods: {
    submit: function (answer) {
      document.getElementById("output").innerHTML = "Your answer: " + answer;
      this.answer = answer;
      this.message = "You answered: \"" + this.answer + "\" - and the AI answered: \"" + this.AIanswer + "\"";
      const options = {title: 'Result', size: 'sm'};
      this.$dialogs.alert(this.message, options)
      .then(res => {
      console.log(res)});
      console.log(this.answer.length);
      window.clearInterval(this.time); // stops the timer
      this.calculateScore(); // calculate the score
    },

    submittedAnswers: function() {
      return this.answer.length !== 0;
    },

    passSubmit: function(confirm) {
      console.log(confirm);
      this.confirm = confirm;
      this.timer(); // starts the timer
    },

    enableSubmit: function() {
      return this.confirm;
    },

    resetAll: function() {
      var tempName = this.playerName;
      var tempScore = this.playerScore;
      this.$refs.img_canvas.resetCanvas();
      Object.assign(this.$data, initialState());
      this.playerName = tempName;
      this.playerScore = tempScore;
    },

    tick: function() {
      this.seconds++;
			this.$refs.timer.textContent = "Time: " + this.seconds + "s";
    },

    timer: function() {
      this.time = window.setInterval(this.tick, 1000);
    },

    calculateScore: function() {
      var score = (30-this.seconds) * 10;
      if (score < 0) {
        score = 0;
      }
      this.playerScore += score;
    },

    resetup: function() {
      localStorage.clear();
      window.clearInterval(this.time); // stops the timer
      this.$router.push('/?redirect=' + this.$route.path);
    }

  },

  mounted() {
    const options = {title: 'Player Name', okLabel: 'Continue', size: 'sm'};
      this.$dialogs.prompt('Please enter your name:', options)
      .then(res => {
        this.playerName = res.value; // {value: 'user input', ok: true|false|undefined}
      });
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  background: #d3e4ed;

  display: flex;
  flex-direction: column;
}

html,
body {
  overflow: hidden;
  height: 100%;
  position: static;
  @media only screen and (min-width: 812px) {
    overflow: auto;
  }
}

h2 {
  font-size: 2rem;
}

.submit-btn {
  display: inline-block;
  font-weight: bold;
  height: 48px;
  padding: 5px 10px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;

  background-color: #4EB599;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border-radius: 3px;
  border: 1px solid transparent;

  &:disabled {
    background: #37333c;
    opacity: 0.65;
  }
}
</style>

