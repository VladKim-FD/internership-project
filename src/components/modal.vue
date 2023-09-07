<script setup>
import { computed, ref, onMounted } from "vue";
import { useProductStore } from "../stores/store.js";

const productStore = useProductStore();
const orderedProducts = computed(() => productStore.getOrderedProducts);
const discountSum = computed(() => productStore.getDiscountSum);
const totalSum = computed(() => productStore.getTotalSum);

// productStore.modalClose()
</script>

<template>
    <div class="modal">
        <div class="modal__block">
            <div class="modal__block-top">
                <img src="../assets/icons/popup-logo.svg" alt="">
            </div>
            <div class="modal__block-content">
                <h2>Order Details</h2>
                <div class="titles">
                    <h3>Products</h3>
                    <div class="titles-right">
                        <h3>Q-ty</h3>
                        <h3>Subtotal</h3>
                    </div>
                </div>
                <div class="ordered-products">
                    <div class="item" v-for="product in orderedProducts">
                    <img :src="product.thumbnail" alt="">
                    <div class="item-description">
                        <h4>{{ product.title }}</h4>
                        <p>{{ product.description }}</p>
                    </div>
                    <p class="quantity">(x {{ product.amount }})</p>
                    <p class="subtotal-sum">$ {{ product.totalSum }}</p>
                    </div>
                </div>
                <div class="sum-info">
                    <div class="discount">
                        <h5>Discount</h5>
                        <p>$ {{ discountSum }}</p>
                    </div>
                    <div class="total-sum">
                        <h5>Total</h5>
                        <p>$ {{ totalSum }}</p>
                    </div>
                </div>
            </div>
            <div class="icon-close" @click="productStore.modalClose()"></div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/components/modal.scss';
</style>