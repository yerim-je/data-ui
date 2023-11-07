<template>
  <div class="main-content">
    <div class="now-show-wrap">
      <div class="title">
        <div class="mainTitle">상영 중인 영화</div>
      </div>
      <div class="posters">
        <div v-for="(value, key) in nowData" :key="key" class="poster-box">
          <router-link :to="{ name: 'MovieTitle', query:{ movieName: value.제목 } }">
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
export default {
  name: 'Mnow',
  setup() {
    const nowData = JSON.parse(localStorage.getItem('now'));

    const titleModal = (event) => {
      const t = event.target.parentNode.nextSibling.nextSibling;
      t.classList.toggle('show');
    }

    return {nowData, titleModal }
  }
}
</script>

<style scoped>@import url(./Mnow.css);</style>