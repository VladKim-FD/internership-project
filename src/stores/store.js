import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    id: null,
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
  },
  actions: {
    async getProducts() {
      try {
        let response = await axios.get(
          `https://dummyjson.com/products/?&limit=48`
        );
        this.products = response.data.products;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
