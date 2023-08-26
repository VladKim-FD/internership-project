<template>
    <div>
        <navbar></navbar>
        <productCardInfo></productCardInfo>
        <footerVue></footerVue>
    </div>
</template>

<script>
import navbar from '../components/navbar.vue';
import footerVue from '../components/footer.vue';
import productCardInfo from '../components/productCardInfo.vue';
export default {
    components: {
        navbar,
        footerVue,
        productCardInfo
    }
}
</script>