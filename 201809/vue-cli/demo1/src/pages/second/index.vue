<template>
<div>
  <second-num-one></second-num-one>
  <second-num-two></second-num-two>
</div>
</template>

<script>
import SecondNumOne from './components/NumOne.vue'
import SecondNumTwo from './components/NumTwo.vue'
export default {
  name: 'Second',
  components: {
    SecondNumOne: SecondNumOne,
    SecondNumTwo: SecondNumTwo
  }
}
</script>

<style></style>
