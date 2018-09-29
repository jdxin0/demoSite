<template lang="html">
    <div class="common-header">
        <router-link v-bind:to="{ name: 'HomePage', query: {num:1} }">Home</router-link>
        <router-link v-bind:to="{ name: 'FirstPage', query: {num:2} }">First</router-link>
        <router-link v-bind:to="{ name: 'SecondPage', query: {num:3} }">Second</router-link>
    </div>
</template>

<script>
export default {
	name: 'CommonHeader'
}
</script>

<style lang="css" scoped>
</style>
