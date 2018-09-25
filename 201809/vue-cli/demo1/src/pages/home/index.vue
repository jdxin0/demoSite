<template>
<div>
  <home-num-one></home-num-one>
  <home-num-two></home-num-two>
</div>
</template>

<script>
import HomeNumOne from './components/NumOne.vue'
import HomeNumTwo from './components/NumTwo.vue'
export default {
  name: 'Home',
  components: {
    HomeNumOne: HomeNumOne,
    HomeNumTwo: HomeNumTwo
  }
}
</script>

<style></style>
