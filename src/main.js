import { createApp, watch } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import routers from './router/index'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(routers);
app.mount("#app");

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("productStore", JSON.stringify(state.productStore));
  },
  { deep: true }
);

