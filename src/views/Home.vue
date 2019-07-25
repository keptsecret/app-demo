<template>
  <div class="home">
     <div align="left">
      <button class="reload" style="" @click="resetup()">&#8635;</button>
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

        <transition name="slide">
          <div style="display: flex; margin-top: 20px" v-if="enableSubmit()">
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
        </transition>

        <transition name="results-popup">
          <div class="modal" v-if="showResults">
            <div class="modal-content">
              <h1>Results</h1>
              <p>You answered <span style="color: red">{{answer}}</span></p>
              <p>Computer answered <span style="color: blue">{{AIanswer}}</span></p>
              <button ref="close" @click="closeResults()">Show full picture</button>
            </div>
          </div>
        </transition>

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
    time: null,
    showResults: false
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
      
      // code for modal !!!!!
      this.showResults = true;
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
    },

    closeResults: function() {
      this.showResults = false;
      this.$refs.img_canvas.showFullImage();
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

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(-50px)
}

.slide-enter-active, .slide-leave-active {
  transition: all .5s ease;
}

.results-popup-enter, .results-popup-leave-to {
  opacity: 0;
  transform: scale(0.5)
}

.results-popup-enter-active, .results-popup-leave-active {
  transition: all .1s;
}

.reload {
  color: #aaaaaa; 
  background-color: transparent; 
  border: none; 
  font-size: 30px; 
  font-weight: bolder;
  margin: auto;

  &:focus, &:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
}

.modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 10px solid #15a57f;
  border-radius: 5px;
  width: 60%;

  p {
    color: black;
  }
  
  h1 {
    color: #128C6C;
  }

  h3 {
    color: red;
  }
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover, &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>

