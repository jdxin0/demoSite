<template>
	<div>
		<common-header></common-header>
		<second-num-one></second-num-one>
		<second-num-two></second-num-two>
	</div>
</template>

<script>
import CommonHeader from '../common/Header.vue'
import SecondNumOne from './components/NumOne.vue'
import SecondNumTwo from './components/NumTwo.vue'
export default {
	name: 'Second',
	components: {
		CommonHeader: CommonHeader,
		SecondNumOne: SecondNumOne,
		SecondNumTwo: SecondNumTwo
	}
}
</script>

<style></style>
