<template>
    <div class="form">
        <el-radio v-model="radio" :label="true">备选项</el-radio>
        <el-radio v-model="radio" :label="false">备选项</el-radio>
    </div>
</template>
<script>
export default {
    name: 'HelloWorld',
    data() {
        return {
            radio: false
        }
    },
    methods: {

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
