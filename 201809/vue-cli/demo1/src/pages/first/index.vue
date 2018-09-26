<template>
	<div>
		<common-header></common-header>
		<first-num-one>
			<div name="slot1">1</div>
			<div name="slot2">2</div>
			<div>3</div>
		</first-num-one>
		<first-num-two></first-num-two>
	</div>
</template>

<script>
import CommonHeader from '../common/Header.vue'
import FirstNumOne from './components/NumOne.vue'
import FirstNumTwo from './components/NumTwo.vue'
export default {
	name: 'First',
	components: {
		CommonHeader: CommonHeader,
		FirstNumOne: FirstNumOne,
		FirstNumTwo: FirstNumTwo
	}
}
</script>

<style></style>
