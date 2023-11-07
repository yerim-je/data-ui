<template>
  <div id="navBox">
    <a href="#now" class="navBt">개봉</a>
    <a href="#coming" class="navBt">미개봉</a>
  </div>
  <section id="section">
    <div id="mark_wrap">
      <p class="mark_title">
          영화 북마크
      </p>
      <div class="movie_wrap">
        <h3 id="now">개봉 완료</h3>
        <div class="m_box">
          <RouterLink :to="{ name: 'MovieTitle', query: { movieName: mark.제목 } }" class="mark"
          v-for="(mark, index) in bm" :key="index"
          @mouseover="showMark(index)" @mouseleave="hideMark()">
            <div class="markMovie" :class="{'active' :showMarkIndex === index}">
              <div class="movieTitle">{{ mark.제목 }}</div>
              <div class="summary">{{ mark.줄거리 }}</div>
            </div>
            <img :src="mark.포스터" :alt="mark.제목" />
          </RouterLink>
        </div>
        <h3 id="coming">미개봉</h3>
        <div class="m_box">
          <RouterLink :to="{ name: 'ComingMovieTitle', query: { movieComing: mark.제목 } }" class="mark"
          v-for="(mark, index) in bm2" :key="index"
          @mouseover="showMark(index)" @mouseleave="hideMark()">
            <div class="markMovie" :class="{'active' :showMarkIndex === index}">
              <div class="movieTitle">{{ mark.제목 }}</div>
              <div class="summary">{{ mark.줄거리 }}</div>
            </div>
            <img :src="mark.포스터" :alt="mark.제목" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'Mark',
  setup() {
    const data = JSON.parse(localStorage.getItem('set'));
    const coming = JSON.parse(localStorage.getItem('coming'));
    const bm = reactive([]);
    const bm2 = reactive([]);
    const bookMark = localStorage.getItem('bookmark')==null?'':JSON.parse(localStorage.getItem('bookmark'));
    const ComingBookmark = localStorage.getItem('ComingBookmark')==null?'':JSON.parse(localStorage.getItem('ComingBookmark'));
    const bookMarkList = () => {
      for( var i of data ){
        for( var j of bookMark ){
          if( i.제목 == ' '+j ) bm.push(i);
        }
      }
    }
    const bookMarkList2 = () => {
      for( var i of coming ){
        for( var j of ComingBookmark ){
          if( i.제목 == ' '+j ) bm2.push(i);
        }
      }
    }
    onMounted(()=>{
      bookMarkList();
      bookMarkList2();
    })

    const showMarkIndex = ref(null);
    const showMark = (index) => {
      showMarkIndex.value = index;
    };
    const hideMark = () => {
      showMarkIndex.value = null;
    };
    // const randomMarks = ref([]);
    // for (let i = 0; i < 12; i++) {
    //   const randomIndex = Math.floor(Math.random() * data.length);
    //   randomMarks.value.push(data[randomIndex]);
    // }

    return {
      showMarkIndex,
      showMark,
      hideMark,
      // randomMarks,
      bm, bm2
    };
  },
};
</script>

<style scoped>
@import url('../assets/css/mark.css');
</style>