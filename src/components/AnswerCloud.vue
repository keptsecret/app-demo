<template>
    <div id="container" style="margin:auto; width:80%">
        <p>Pick your answer:</p>
    </div>
</template>

<script>
export default {
    name: "AnswerCloud",

    props: [
        'choicesArray'
    ],

    data: function() {
        return {
            generated: ""
        }
    },

    methods: {
        showChoices: function() {
            var newdiv = document.createElement('div');
            newdiv.id = "cloud_div";
            document.getElementById('container').appendChild(newdiv);
            document.getElementById('cloud_div').disabled = false;

            this.choicesArray = ["word", "speak", "talk", "blah", "Answer"];
            this.choicesArray = this.shuffle(this.choicesArray);
            this.generated = "";
            
            this.generateCloud(this.choicesArray);
            document.getElementById('cloud_div').innerHTML = this.generated;

            for (var i = 0; i < this.choicesArray.length; i++) {
                let index = i.toString();
                console.log(index);
                document.getElementById(index).onclick = () => {
                    console.log(document.getElementById(index).innerHTML);
                    this.$emit("answer-clicked", document.getElementById(index).innerHTML)
                    document.getElementById('cloud_div').disabled = true;
                }
            }
        },

        generateCloud: function(array) {
            for (var i = 0; i < array.length; i++) {
                var color = this.getRandomColor();
                this.generated += "<span style=\"color:" + color + "\"><a id=\"" + i + "\" class=\"cloud\">" + array[i] + " </a></span>"
            }
        },

        getRandomColor: function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        shuffle: function(a) {
			var j, x, i;
			for (i = a.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = a[i];
				a[i] = a[j];
				a[j] = x;
			}
			return a;
		},
    },

    mounted: function() {
        this.showChoices();
    }

}
</script>

<style lang="scss" src="@/assets/styles/AnswerCloud.scss">