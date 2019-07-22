<template>
	<div class="load_image">
		<img :src="image">		
	</div>
</template>

<script>
import image from "../assets/golf_ball.png"

export default {
	data: function() {
		return {image: image}
	}
};
</script>

<style lang="scss"></style>