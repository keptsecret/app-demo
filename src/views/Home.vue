<template>
  <div class="home">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossorigin='anonymous'>

    <div align="right">
      <button class="reload" @click='reload()'><i class='fa fa-repeat'></i></button>
      <button class="reload" @click='resetup()'><i class='fas fa-sign-out-alt'></i></button>
    </div>
    <main>
      <Panel
        class="demo-panel"
        :headline="headline"
        ref="Panel"
      >

        <!-- Component showing the image and image pieces -->
        <div>
          <div><LoadImage ref="img_canvas" @img-revealed="passSubmit" :selection-percent="selectionPercent" :next-image="showNext"></LoadImage></div>
          <div id="alertTime" ref="alertTime" style="display: none; position: absolute; left: calc(50% - 50px); bottom: calc(50% - 100px); background: transparent; width: 100px; height: 200px; font-size: 100px; color: red; font-weight: bolder"><h1></h1></div>
        </div>

        <div>
          <p ref="timer" v-if="enableSubmit()"><time>เวลา: 10</time></p>
        </div>

        <!-- Settings are no longer used
        <transition name="slide">
          <div class="modal" v-if="showSettings"> 
            <div class="modal-content">
              <span class="close" @click="function() {showSettings = false;}">&times;</span>
              <h1>Settings <span><i class='fas fa-cog'></i></span></h1>
              <p style="display:inline-block; padding: 10px">Select the percent of image to be revealed:</p>
              <select v-model="selectionPercent">
                <option v-for="option in options" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
        </transition>
        -->

        <!-- Component showing player info and answers -->
        <transition name="slide">
          <div style="display: flex; margin-top: 20px" v-if="enableSubmit()">
            <div style="flex: 1; margin-right: 20px; margin-left: 10px">
              <p style="text-align:center; font-size:60px; margin:0px; color: #2f40ac"><b>{{playerName}}</b></p>
              <p style="font-size:60px; margin:0px; text-align: center; color: #6328b8"><b>AI</b></p>
            </div>

            <div v-if="enableSubmit()" style="flex: 1; margin-left: 20px; margin-right: 10px;">
              <AnswerCloud ref="answers" @answer-clicked="submit" v-if="enableSubmit()" :choices-array="choices"></AnswerCloud>
              <br>
              <br>
              <br>
              <Reset v-if="showNext" @call-reset="resetAll" style="float: right; margin: 10px;"></Reset>
            </div>
          </div>
        </transition>

        <!-- Component showing results -->
        <transition name="results-popup">
          <div class="modal" v-if="showResults">
            <div class="modal-content">
              <h1>ผลเกมส์</h1>
              <h2 v-if="winStatus == 0">คุณคือผู้ชนะ!</h2>
              <h2 v-if="winStatus == 1">พยายามใหม่...</h2>
              <h2 v-if="winStatus == 2">คุณแพ้แล้ว :(</h2>
              <p>คุณตอบว่า <span style="color: red">{{answer}}</span></p>
              <p>AI ตอบว่า <span style="color: blue">{{AIanswer}}</span></p>
              <p v-if="showNext">คำตอบที่ถูกคือ <span style="font-weight:bolder">{{realAnswer}}</span></p>
              <button ref="close" @click="closeResults()" v-if="showNext">โชว์ภาพเต็ม</button>
              <button ref="try_again" @click="tryAgain()" v-if="!showNext">ตอบใหม่</button>
            </div>
          </div>
        </transition>
        
      </Panel>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Panel from '@/components/Panel.vue'
import LoadImage from '@/components/LoadImage.vue'
//import Form from '@/components/Form.vue'
import Reset from '@/components/Reset.vue'
import AnswerCloud from '@/components/AnswerCloud.vue'

function initialState() {
  return {
    headline: "แฟนพันธุ์แท้ \"อาหารไทย\"",
    answer: "",
    confirm: false,
    message: "",
    AIanswer: "AI's answer",
    realAnswer: "Answer ",
    winStatus: 1,
    playerName: "",
    playerScore: 0,
    AIscore: 0,
    seconds: 10,
    time: null,
    showResults: false,
    showSettings: false,
    showNext: false,
    selectionPercent: 0.2,
    choices: ["word", "speak", "talk", "blah", "Answer", "water", "food", "air", "things"],
    options: [
      {text: "20", value: 0.2},
      {text: "40", value: 0.4},
      {text: "60", value: 0.6},
      {text: "80", value: 0.8}
    ]
  }
}

export default {
  name: "home",

  components: {
    Panel,
    LoadImage,
    //ßForm,
    Reset,
    AnswerCloud
  },

  data() {
    return initialState();
  },

  methods: {
    submit: function (answer) {
      this.answer = answer;

      window.clearInterval(this.time); // stops the timer
      this.showResults = true;
      this.showNext = false;

      if (this.answer == this.realAnswer) {
        this.winStatus = 0;
        this.showNext = true;
        this.calculateScore(); // calculate the score
        return 0;
      }
      
      if (this.selectionPercent >= 0.6) {
        this.winStatus = 2;
        this.showNext = true;
      } else {
        this.winStatus = 1;
        this.selectionPercent += 0.2;
      }

    },

    passSubmit: function(confirm) {
      console.log(confirm);
      this.confirm = confirm;
      document.getElementById('alertTime').style.display = 'block';
      this.showNext = false;
      this.timer(); // starts the timer
    },

    enableSubmit: function() {
      //this.showNext = false;
      return this.confirm;
    },

    resetAll: function() {
      var tempName = this.playerName;
      var tempScore = this.playerScore;
      var tempNext = this.showNext;
      this.$refs.img_canvas.resetCanvas();
      document.getElementById('alertTime').innerHTML = "";
      Object.assign(this.$data, initialState());
      this.playerName = tempName;
      this.playerScore = tempScore;
      this.showNext = tempNext;
    },

    tick: function() {
      this.seconds--;
      this.$refs.timer.textContent = "เวลา: " + this.seconds;
      if (this.seconds <= 5) {
        this.$refs.alertTime.innerHTML = this.seconds;
        var audio = new Audio("http://www.soundjay.com/button/beep-07.wav");
        audio.play();
        }
      if (this.seconds === 0) {
        //this.$refs.form.handleClick(this.$refs.form.answer);
        var audio = new Audio("http://www.soundjay.com/button/beep-01a.wav");
        audio.play();
        this.submit("");
        }
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
      document.getElementById('alertTime').style.display = 'none';
    },

    reload: function() {
      window.location.reload();
    },

    openSettings: function() {
      this.showSettings = true;
    },

    applySettings: function() {
      this.showSettings = false;
      console.log(this.selectionPercent)
      this.$refs.img_canvas.selectionPercent = this.selectionPercent;
    },

    tryAgain: function() {
      this.showResults = false;
      this.$refs.img_canvas.buttonClicked();
      this.$refs.alertTime.innerHTML = "";
      this.confirm = true;
      this.seconds = 10;
      this.enableSubmit();
    }

  },

  mounted() {
    const options = {title: 'ลงชื่อผู้เล่น', okLabel: 'ถัดไป', size: 'sm'};
      this.$dialogs.prompt('ลงชื่อ:', options)
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
  font-size: 24px; 
  font-weight: bolder;
  margin-top: 10px;

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

