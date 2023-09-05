<script setup>
import { computed } from 'vue';
import { useProductStore } from "../stores/store.js";
import { RouterLink } from 'vue-router';
const productStore = useProductStore();
const extraProducts = computed(() => productStore.getExtraProducts);
</script>

<template>
    <div class="products__extra">
        <h2>You may be interested in</h2>
        <div class="products__extra-content">
          <div class="extra__item" v-for="extraProduct in extraProducts" :key="extraProduct.id">
            <div class="extra__item-img">
              <RouterLink :to="`/productCard/${extraProduct.id}`" @click="openProduct(extraProduct.id)"></RouterLink>
              <img :src="extraProduct.thumbnail" alt="" />
            </div>
            <div class="extra__item-description">
              <h4>{{ extraProduct.description }}</h4>
              <p>$ {{ extraProduct.price }}</p>
            </div>
          </div>
        </div>
      </div>
</template>

<style lang="scss">
@import '../assets/scss/components/extraProducts.scss'
</style>