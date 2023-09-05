<script>
import navbar from '../components/navbar.vue';
import footerVue from '../components/footer.vue';
import productCheckout from '../components/productCheckout.vue';
export default{
    components: {
        navbar,
        footerVue,
        productCheckout
    }
}
</script>

<template>
<navbar></navbar>
<productCheckout></productCheckout>
<footerVue></footerVue>
</template>