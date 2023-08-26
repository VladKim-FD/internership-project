<script>
import navbar from '../components/navbar.vue';
import footerVue from '../components/footer.vue';
import shoppingCart from '../components/shoppingCart.vue';
export default {
    components: {
        navbar,
        footerVue,
        shoppingCart
    }
}
</script>

<template>
    <div>
        <navbar></navbar>
        <shoppingCart></shoppingCart>
        <footerVue></footerVue>
    </div>
</template>

