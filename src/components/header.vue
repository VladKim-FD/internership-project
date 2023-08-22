<script>
import btn from "../components/btn.vue";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
export default {
  components: {
    Swiper,
    SwiperSlide,
    btn
  },
  setup() {
    const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
};
</script>

<template>
  <header class="header">
    <div class="container header__content">
      <div class="header__content-left">
        <h1>iPhone 14 Pro Max</h1>
        <btn text="SHOP NOW"></btn>
      </div>
      <div class="header__content-right">
        <swiper
          :slides-per-view="1"
          :space-between="50"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
          :centeredSlides="true"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
        >
          <swiper-slide>
            <img src="../assets/images/iphones-1.png" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/iphones-2.jpg" alt="" />
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/iphone.webp" alt="" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </header>
</template>



<style lang="scss">
@import "../assets/scss/components/header.scss";
@import '../assets/scss/components/btn.scss';
</style>