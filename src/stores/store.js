import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => {
    if (localStorage.getItem("productStore")) {
      return JSON.parse(localStorage.getItem("productStore"));
    }

    return {
      products: [],
      categories: [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
      ],
      orderedProducts: [],
      id: Number,
    };
  },
  getters: {
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
    getTotalSum(){
      let totalSum = 0;
      for(let x = 0; x < this.products.length; x++){
        totalSum += this.products[x].totalSum;
      }
      return totalSum;
    },
    getTotalQuantity() {
      let totalQuantity = 0;
      for(let j = 0; j < this.products.length; j++){
        totalQuantity += this.products[j].amount;
      }
      return totalQuantity;
    },
  },
  actions: {
    async getProducts() {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/?&limit=48`
        );
        this.products = response.data.products;
        for (let i = 0; i < this.products.length; i++) {
          let amount;
          // if (!this.products[i].amount) {
          //   amount = 0;
          // } else {
          amount = JSON.parse(localStorage.getItem("productStore")).products[i].amount;
          // }
          this.products[i].amount = amount;
          this.products[i].liked = false;
          if (!this.products[i].hasOwnProperty("totalSum")) {
            Object.defineProperty(this.products[i], "totalSum", {
              get() {
                // let sum = (100 - this.discountPercentage) * (this.price * this.amount);
                // console.log(sum);
                // return sum;
                return this.price * this.amount;
                // return (
                //   (100 - this.discountPercentage) * (this.price * this.amount)
                // );
              },
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
