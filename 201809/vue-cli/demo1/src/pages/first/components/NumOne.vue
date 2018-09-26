<template>
	<div class="first-num-one">
		<slot name="slot1"></slot>
		<h1>First Page:component1</h1>
		<slot name="slot2"></slot>
	</div>
</template>

<script>
export default {
	name: 'FirstNumOne'
}
</script>

<style scoped>
	h1 {
		font-size: 20px;
	}

	.first-num-one {
		border: 1px solid #ddd;
	}
</style>
