<template>
<div>
  <first-num-one></first-num-one>
  <first-num-two></first-num-two>
</div>
</template>

<script>
import FirstNumOne from './components/NumOne.vue'
import FirstNumTwo from './components/NumTwo.vue'
export default {
  name: 'First',
  components: {
    FirstNumOne: FirstNumOne,
    FirstNumTwo: FirstNumTwo
  }
}
</script>

<style></style>
