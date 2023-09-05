<script setup>
import { computed, ref, onMounted } from "vue";
import { useProductStore } from "../stores/store.js";
import { useForm } from 'vee-validate';
import * as yup from 'yup';

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

const productStore = useProductStore();
const countries = ref([]);
const phoneCodes = ref([]);

// validation

const { errors, defineInputBinds } = useForm({
    validationSchema: yup.object({

        firstName: yup.string().required(),
        lastName: yup.string().required(),
        country: yup.required,
        city: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().email().required(),
        phoneNumber: yup.number().required().positive().integer()
    }),
});

const email = defineInputBinds('email', {
    validateOnInput: true,
});
const phoneNumber = defineInputBinds('phoneNumber', {
    validateOnInput: true,
});
const firstName = defineInputBinds('firstName', {
    validateOnInput: true,
});
const lastName = defineInputBinds('lastName', {
    validateOnInput: true,
});
const country = defineInputBinds('country', {
    validateOnInput: true,
});
const city = defineInputBinds('city', {
    validateOnInput: true,
});
const address = defineInputBinds('address', {
    validateOnInput: true,
});

</script>

<template>
    <div class="form__block">
        <h2>Billing Address</h2>
        <form action="">
            <div class="name-inputs">
                <label for="" v-bind="firstName">
                    First Name *
                    <input type="text" v-bind="firstName">
                    <p>{{ errors.firstName }}</p>
                </label>
                <label for="">
                    Last Name *
                    <input type="text" v-bind="lastName">
                    <p>{{ errors.lastName }}</p>
                </label>
            </div>
            <div class="location-inputs">
                <label for="" class="country-select">
                    Country / Region *
                    <select name="" id=""  ref='value'>
                        <option selected class="first-option">Select a country / region</option>
                        <option v-for="country in countries" >{{ country.name['common'] }}</option>
                    </select>
                </label>
                <label for="">
                    Town / City *
                    <input type="text" v-bind="city">
                    <p>{{ errors.city }}</p>
                </label>
            </div>
            <div class="address-inputs">
                <label for="">
                    Street Address *
                    <input type="text" 
                    placeholder="House number and street name" 
                    v-bind="address">
                    <p>{{ errors.address }}</p>
                </label>
                <label for="" class="extra-address">
                    <input type="text" placeholder="Appartment, suite, unit, etc. (optional)">
                </label>
            </div>
            <div class="contact-inputs">
                <label for="">
                    Email address *
                    <input type="email" name="" id="" v-bind="email">
                    <p>{{ errors.email }}</p>
                </label>
                <div class="phone-inputs">
                    <p>Phone Number *</p>
                    <div class="phone-code">
                        <select name="" id="">
                            <option value="" v-for="phoneCode in phoneCodes">{{ phoneCode !== undefined ? phoneCode :
                                null }}
                            </option>
                        </select>
                        <div class="phone-number">
                            <input type="text" class="phone-input" v-bind="phoneNumber" >
                        </div>
                    </div>
                    <p >{{ errors.phoneNumber }}</p>
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
        <modal></modal>
    </div>
</template>

<style lang="scss">
@import '../assets/scss/components/form.scss';
</style>