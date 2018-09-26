<template>
<div>
  <common-header></common-header>
  <home-num-one></home-num-one>
  <home-num-two></home-num-two>
</div>
</template>

<script>
import CommonHeader from '../common/Header.vue'
import HomeNumOne from './components/NumOne.vue'
import HomeNumTwo from './components/NumTwo.vue'
export default {
  name: 'Home',
  components: {
    CommonHeader: CommonHeader,
    HomeNumOne: HomeNumOne,
    HomeNumTwo: HomeNumTwo
  }
}
</script>

<style></style>
