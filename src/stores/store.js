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
      id: Number,
    };
  },
  getters: {
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
          product.category == currentProduct.category &&
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
    getTotalQuantity() {
      let totalQuantity = 0;
      for (let j = 0; j < this.products.length; j++) {
        // totalQuantity += this.products[j].amount;
        // console.log(this.products[j].amount);
        if (this.products[j].amount != undefined) {
          totalQuantity += this.products[j].amount;
        } else {
          totalQuantity = 0
        }
      }
      console.log(totalQuantity);
      return totalQuantity;
    },
  },
  actions: {
    async getProducts() {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/?&limit=50`
        );
        this.products = response.data.products;
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].amount = JSON.parse(localStorage.getItem("productStore")).products[i].amount == undefined ? 0 : JSON.parse(localStorage.getItem("productStore")).products[i].amount
          this.products[i].totalSum = JSON.parse(localStorage.getItem("productStore")).products[i].totalSum == undefined ? 0 : JSON.parse(localStorage.getItem("productStore")).products[i].totalSum
          this.products[i].discountSum = JSON.parse(localStorage.getItem("productStore")).products[i].discountSum == undefined ? 0 : JSON.parse(localStorage.getItem("productStore")).products[i].discountSum
          this.products[i].liked = JSON.parse(localStorage.getItem("productStore")).products[i].liked;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
