<script setup>
import AnimalSlide from '../components/AnimalSlide.vue'
</script>

<template>
  <main>
    <div class="mainImg">
      <img src="https://www.daejeon.go.kr/images/ani/contents/main/banner.jpg">
    </div>
    <AnimalSlide msg="입양가능" v-bind:info="['말티즈','진돗개','믹스','포메라니안']"/>
    <AnimalSlide msg="보호동물" v-bind:info="['코리안숏헤어','믹스','스피츠','웰시코기']"/>
  </main>
</template>
