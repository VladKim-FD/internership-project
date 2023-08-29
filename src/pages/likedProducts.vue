<script>
import navbar from '../components/navbar.vue';
import likedProducts from '../components/likedProducts.vue';
import footerVue from '../components/footer.vue';

export default {
    components: {
        navbar,
        likedProducts,
        footerVue
    }
}
</script>

<template>
    <navbar></navbar>
    <likedProducts></likedProducts>
    <footerVue></footerVue>
</template>
