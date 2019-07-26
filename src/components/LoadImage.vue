<template>
	<div>
		<div id="image_container" class="load_image">
			<canvas id="canvas" ref="canvas" class="canvas"></canvas>
		</div>
		<div style="margin-right: 10px">
			<button class="reveal" v-if="showButton" id="input" @click="buttonClicked(confirm)">Reveal</button>
		</div>
		
	</div>
</template>

<script>
import image from "@/assets/1.jpg"
import { setTimeout } from 'timers';

export default {
	name: "LoadImage",

	props: [
		'selectionPercent'
	],

	data: function() {
		return {
			ctx: null,
			img: null,
			imgData: null,
			confirm: true,
			showButton: true,
			seconds: 0,
			file: null,
		};
	},

	methods: {

		buttonClicked: function(confirm) {

			document.getElementById('image_container').style.width = '100%';

			var ctx = canvas.getContext('2d');
			var length = localStorage.getItem("length");
			var randIndex = Math.floor(Math.random() * length);
			var img = new Image();

			var choice = "image" + randIndex;
			this.file = localStorage.getItem(choice);
			var imgPercent = this.selectionPercent;
            
			img.src = this.file;
			
			img.onload = function() {
				// scale the image down if it is too large
				var scaleRatio = 1;
				if (img.width > 800) scaleRatio = 800 / img.width;
				if (img.height > 1000) scaleRatio = 1000 / img.height;
				
				canvas.width = img.width * scaleRatio;
				canvas.height = img.height * scaleRatio;

				var drawWidth = img.width * imgPercent;
				var drawHeight = img.height * imgPercent;
				var imgClipStartX = Math.floor(Math.random() * img.width * (1-imgPercent));
				var imgClipStartY = Math.floor(Math.random() * img.height * (1-imgPercent));				

				var imgPositionX = ((canvas.width-img.width) / 2 + (imgClipStartX)) * scaleRatio;
				var imgPositionY = ((canvas.height-img.height) / 2 + (imgClipStartY)) * scaleRatio;
				
				ctx.clearRect(0, 0, img.width, img.height);
				ctx.drawImage(img, imgClipStartX, imgClipStartY, drawWidth, drawHeight, imgPositionX, imgPositionY, drawWidth*scaleRatio, drawHeight*scaleRatio);
			}
			//var confirm = true;

			this.$emit("img-revealed", confirm);
			this.showButton = false;
		},

		resetCanvas: function() {
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, 3000, 3000);
			canvas.width = 3000;
			canvas.height = 500;
			document.getElementById('image_container').style.width = 0;
			this.showButton = true;
		},

		showFullImage: function() {
			//document.getElementById('image_container').style.height = 0;

			var ctx = canvas.getContext('2d');
			var img = new Image();
			img.src = this.file;

			img.onload = function() {
				var scaleRatio = 1;
				if (img.width > 800) scaleRatio = 800 / img.width;
				if (img.height > 1000) scaleRatio = 1000 / img.height;
				
				canvas.width = img.width * scaleRatio;
				canvas.height = img.height * scaleRatio;

				ctx.clearRect(0, 0, img.width, img.height);
				ctx.drawImage(img, 0, 0, img.width * scaleRatio, img.height * scaleRatio);
			}

			//document.getElementById('image_container').style.height = 'auto';
			
		}

	},

	mounted: function() {
		this.ctx = canvas.getContext("2d");
		this.img = new Image();
	}
};
</script>

<style lang="scss" src="@/assets/styles/LoadImage.scss"/>