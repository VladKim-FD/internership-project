<template>
    <navbar></navbar>
    <headerVue></headerVue>
    <mainVue></mainVue>
    <footerVue></footerVue>
</template>

<script>
import navbar from '../components/navbar.vue';
import headerVue from '../components/header.vue';
import mainVue from '../components/main.vue';
import footerVue from '../components/footer.vue';
export default {
    components: {
        navbar,
        headerVue, 
        mainVue, 
        footerVue
    }
}
</script>

<style lang="scss">

</style>