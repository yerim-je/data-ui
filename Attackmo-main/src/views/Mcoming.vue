<template>
  <div class="main-content">
    <div class="now-show-wrap">
      <div class="title">
        <div class="mainTitle">상영 예정 영화</div>
      </div>
      <div style="position: absolute; width:100%; text-align: right; top:calc(15px);">
        <!-- * 미개봉 영화는 상세정보와 리뷰를 제공하지 않습니다. -->
      </div>
      <div class="posters">
        <div v-for="(value, key) in coming" :key="key" class="poster-box">
          <router-link :to="{ name: 'ComingMovieTitle', query:{ movieComing: value.제목 } }">
            <img class="rectangle" :src="value.포스터" />
            <div class="view">
              <div @mouseover="titleModal" @mouseout="titleModal" class="div">{{ value.제목 }}</div>
              <div class="normalFont">{{ value.개봉일 }}</div>
              <div class="normalFont onMobile">{{ value.장르 }}</div>
              <div class="normalFont onMobile">{{ value.러닝타임 }}</div>
            </div>
            <div class="starBox">
              <div class="starYellow">★</div>
              <div class="starYellow">★</div>
              <div class="starYellow">★</div>
              <div class="starYellow">★</div>
              <div class="starBlack">★</div>
            </div>
            <div class="movieName show">{{ value.제목 }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import { onMounted, reactive, inject } from 'vue'
export default {
  name: 'Mcoming',
  setup() {
    const coming = JSON.parse(localStorage.getItem('coming'));

    const titleModal = (event) => {
      const t = event.target.parentNode.nextSibling.nextSibling;
      t.classList.toggle('show');
    }

    onMounted(() => {
      
    })

    return { coming, titleModal }
  }
}
</script>

<style scoped>@import url(./Mcoming.css);</style>