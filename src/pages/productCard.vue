<template>
    <div>
        <navbar></navbar>
        <productCard></productCard>
        <footerVue></footerVue>
    </div>
</template>

<script>
import navbar from '../components/navbar.vue';
import footerVue from '../components/footer.vue';
import productCard from '../components/productCard.vue';
export default {
    components: {
        navbar,
        footerVue,
        productCard
    }
}
</script>