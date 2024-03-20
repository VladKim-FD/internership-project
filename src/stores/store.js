import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {

  state: () => {
    if (localStorage.getItem("productStore")) {
      return JSON.parse(localStorage.getItem("productStore"));
    }

    return {
      products: [],
      categories: [],
      orderedProducts: [],
      countries: [],
      phoneCodes: [],
      id: Number,
      img: String
    };
  },
  getters: {
    getImage() {
      let img = !JSON.parse(localStorage.getItem("productStore"))?.img ? JSON.parse(localStorage.getItem("productStore"))?.products : '';
      return img;
    },
    getCategories() {
      for (let m = 0; m < this.products.length; m++) {
        this.categories.push(this.products[m].category);
      }
      this.categories = Array.from(new Set(this.categories));
      return this.categories;
    },
    getProduct() {
      return this.products.find((product) => product.id == this.id);
    },
    getExtraProducts() {
      let currentProduct = this.products.find(
        (product) => product.id == this.id
      );
      let extraProducts = this.products.filter(
        (product) =>
          product.category == currentProduct?.category &&
          product.id != currentProduct.id
      );
      return extraProducts;
    },
    getOrderedProducts() {
      let orderedProducts = this.products.filter(
        (product) => product.amount && product.amount != 0
      );
      return orderedProducts;
    },
    getLikedProducts() {
      let likedProducts = this.products.filter((product) => product.liked == true);
      return likedProducts;
    },
    getSubTotalSum() {
      let subTotalSum = 0;
      for (let x = 0; x < this.products.length; x++) {
        subTotalSum += this.products[x].totalSum;
      }
      return subTotalSum;
    },
    getDiscountSum() {
      let discountSum = 0;
      for (let j = 0; j < this.products.length; j++) {
        discountSum += this.products[j].discountSum;
      }
      return Math.floor(discountSum);
    },
    getTotalSum() {
      let totalSum = 0;
      for (let m = 0; m < this.products.length; m++) {
        totalSum += this.products[m].totalSum - this.products[m].discountSum;
      }
      return Math.ceil(totalSum);
    },
    getTotalQuantity() {
      let totalQuantity = 0;
      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j].amount != undefined) {
          totalQuantity += this.products[j].amount;
        } else {
          totalQuantity = 0
        }
      }

      return totalQuantity;
    },
  },
  actions: {
    async getProducts() {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/?&limit=70`
        );
        this.products = response.data.products;
        const productStore = JSON.parse(localStorage.getItem("productStore"))?.products;
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].amount = productStore?.[i]?.amount || 0;
          this.products[i].totalSum = productStore?.[i]?.totalSum || 0;
          this.products[i].discountSum = productStore?.[i]?.discountSum || 0;
          this.products[i].liked = productStore?.[i]?.liked || false;
        }
        localStorage.setItem("productStore", JSON.stringify(useProductStore));

      } catch (error) {
        console.log(error);
      }
    },
    async getCountries() {
      try {
        let response = await axios.get('https://restcountries.com/v3.1/all');
        this.countries = response.data;
      }
      catch (error) {
        console.log(error);
      }
    },
    async getPhoneCodes() {
      try {
        let response = await axios.get('https://restcountries.com/v3.1/all');
        this.countries = response.data;
        this.countries.sort(function (a, b) {
          if (a.name['common'] < b.name['common']) {
            return -1;
          }
          if (a.name['common'] > b.name['common']) {
            return 1;
          }
          return 0;
        }
        )

        let arr = [];
        for (let i = 0; i < this.countries.length; i++) {
          for (let x = 0; x < this.countries[i].idd.suffixes?.length; x++) {
            let phoneCode = '';
            phoneCode += this.countries[i].idd.root + this.countries[i].idd.suffixes[x];
            arr.push(phoneCode)
          }
        }
        this.phoneCodes = arr;
        return this.phoneCodes;
      }
      catch (error) {
        console.log(error);
      }
    },
  },
});
