<template lang="html">
    <div class="common-header">
        <router-link :to="{ name: 'HomePage', params: {} }">Home</router-link>
        <router-link :to="{ name: 'FirstPage', params: {} }">First</router-link>
        <router-link :to="{ name: 'SecondPage', params: {} }">Second</router-link>
    </div>
</template>

<script>
export default {
	name: 'CommonHeader'
}
</script>

<style lang="css" scoped>
</style>
