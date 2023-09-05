<script setup>
import { computed, ref, onMounted } from "vue";
import { useProductStore } from "../stores/store.js";
// import modal from "./modal.vue";
import formVue from "./form.vue";


const productStore = useProductStore();
const countries = ref([]);
const phoneCodes = ref([]);
const modalOpen = ref(false);

onMounted(async () => {
    await productStore.getCountries();
    await productStore.getPhoneCodes();
    countries.value = productStore.countries;
    countries.value.sort(function (a, b) {
        if (a.name['common'] < b.name['common']) {
            return -1;
        }
        if (a.name['common'] > b.name['common']) {
            return 1;
        }
        return 0;
    }
    )

    phoneCodes.value = productStore.phoneCodes;
});

const orderedProducts = computed(() => productStore.getOrderedProducts);
const subTotalSum = computed(() => productStore.getSubTotalSum);
const discountSum = computed(() => productStore.getDiscountSum);
const totalSum = computed(() => productStore.getTotalSum);

// open and close modal

let body = app.parentElement;

function openModal() {
    modalOpen.value = true;
    console.log(modalOpen);
    if(body.classList.contains('active')){
    body.classList.remove('active')
  }else{
    body.classList.add('active')
  }
}

function closeModal() {
    modalOpen.value = false;
    console.log(modalOpen);
    if(body.classList.contains('active')){
    body.classList.remove('active')
  }else{
    body.classList.add('active')
  }
}
</script>

<template>
    <div class="container">
        <div class="links">
            <RouterLink :to="`/`" class="first-link">Home /</RouterLink>
            <RouterLink :to="`/productCheckout`">Payment and Delivery</RouterLink>
        </div>
    </div>
    <div class="container checkout__content">
        <formVue></formVue>
        <!-- <div class="checkout__content-left">
            <h2>Billing Address</h2>
            <form action="">
                <div class="name-inputs">
                    <label for="">
                        First Name *
                        <input type="text">
                    </label>
                    <label for="">
                        Last Name *
                        <input type="text">
                    </label>
                </div>
                <div class="location-inputs">
                    <label for="" class="country-select">
                        Country / Region *
                        <select name="" id="">
                            <option selected class="first-option">Select a country / region</option>
                            <option v-for="country in countries">{{ country.name['common'] }}</option>
                        </select>
                    </label>
                    <label for="">
                        Town / City *
                        <input type="text">
                    </label>
                </div>
                <div class="address-inputs">
                    <label for="">
                        Street Address *
                        <input type="text" placeholder="House number and street name">
                    </label>
                    <label for="" class="extra-address">
                        <input type="text" placeholder="Appartment, suite, unit, etc. (optional)">
                    </label>
                </div>
                <div class="contact-inputs">
                    <label for="">
                        Email address *
                        <input type="email" name="" id="">
                    </label>
                    <div class="phone-inputs">
                        <p>Phone Number *</p>
                        <div class="phone-code">
                            <select name="" id="">
                                <option value="" v-for="phoneCode in phoneCodes">{{ phoneCode !== undefined ? phoneCode :
                                    null }}
                                </option>
                            </select>
                            <input type="text" class="phone-input">
                        </div>
                    </div>
                </div>
                <div class="different-address">
                    <input type="checkbox" id="checkbox">
                    <label for="checkbox"> Ship to a different address?</label>
                </div>
                <label for="" class="other-notes">
                    Order notes (optional) *
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </label>
            </form>
        </div> -->
        <div class="checkout__content-right">
            <h2>Your Order</h2>
            <div class="right-titles">
                <h3>Products</h3>
                <h3>Subtotal</h3>
            </div>
            <div class="ordered-items">
                <div class="item" v-for="product in orderedProducts">
                    <img :src="product.thumbnail" alt="">
                    <div class="item-description">
                        <h4>{{ product.title }}</h4>
                        <p>{{ product.description }}</p>
                    </div>
                    <div class="order-description">
                        <p class="count">(x{{ product.amount }})</p>
                        <p class="subtotal-sum">$ {{ product.totalSum }}</p>
                    </div>
                </div>
            </div>
            <div class="order-info">
                <div class="subtotal-sum">
                    <h4>Subtotal</h4>
                    <p>$ {{ subTotalSum }}</p>
                </div>
                <div class="discount-sum">
                    <h4>Coupon Discount</h4>
                    <p>(-) {{ discountSum }}</p>
                </div>
                <div class="total-sum">
                    <h4>Total</h4>
                    <p>${{ totalSum }}</p>
                </div>
            </div>
            <button @click="openModal"> Place Order</button>
        </div>
    </div>
    <!-- <modal v-show="modalOpen"></modal> -->
    <div class="modal" v-show="modalOpen == true">
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
                    <div class="order-description">
                        <p class="quantity">(x {{ product.amount }})</p>
                    <p class="subtotal-sum">$ {{ product.totalSum }}</p>
                    </div>
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
            <div class="icon-close" @click="closeModal"></div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/components/productCheckout.scss';
</style>