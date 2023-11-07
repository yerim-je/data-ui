<template>
  <div class="screen" ref="videoContainer">
    <div class="video">
      <!-- <div class="div"></div> -->
      <div class="iframe">
        <video @click="togglePlayPause()" ref="videoPlayer" id="mainTrailer" class="vid" autoplay loop muted>
          <source :src="path">
        </video>
      </div>
    </div>
    
    <div class="controler">
      <div class="detail">
        <router-link v-if="!isComing" :to="{ name: 'MovieTitle', query:{ movieName: movieName } }">
          <div class="more">상세보기</div>
          <img class="chevron-right" src="../images/chevron_right.svg" />
        </router-link>
        <router-link v-if="isComing" :to="{ name: 'ComingMovieTitle', query:{ movieComing: movieName } }">
          <div class="more">상세보기</div>
          <img class="chevron-right" src="../images/chevron_right.svg" />
        </router-link>
      </div>

      <img @click="togglePlayPause()" v-if="!isPlaying" class="img playPause" style="cursor:pointer"
        src="../images/play_circle.svg" />

      <img @click="togglePlayPause()" v-if="isPlaying" class="img playPause" style="cursor:pointer"
        src="../images/pause_circle.svg" />

      <img @click="toggleMuteUnmute()" v-if="!isMuted" class="img" style="cursor:pointer" src="../images/sound.svg" />

      <img @click="toggleMuteUnmute()" v-if="isMuted" class="img" style="cursor:pointer" src="../images/volume_off.svg" />
      
    </div>
  </div>


  <div class="div-wrapper">
    <div class="top">
      <div class="frame">
        <div class="title">인기 TOP 10</div>
        <!-- <div class="div" id="top10Plus"><router-link to="/MovieMain">+</router-link></div> -->
      </div>
      <div class="posters">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in topTenList" :key="key">
          <router-link :to="{ name: 'MovieTitle', query:{ movieName: value.제목 } }">
            <div class="ranking">{{ value.랭킹 }}</div>
            <img class="rectangle" :src="value.포스터" />
          </router-link>
        </div>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
    <div class="top">
      <div class="frame">
        <div class="title">상영중인 영화</div>
        <div class="div"><router-link to="/Mnow">+</router-link></div>
      </div>
      <div class="posters">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in now" :key="key">
          <router-link :to="{ name: 'MovieTitle', query:{ movieName: value.제목 } }">
            <img class="rectangle" :src="value.포스터" />
          </router-link>
        </div>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
    <div class="top">
      <div class="frame">
        <div class="title">상영 예정</div>
        <div class="div"><router-link to="/Mcoming">+</router-link></div>
      </div>
      <div class="posters">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in coming" :key="key">
          <router-link :to="{ name: 'ComingMovieTitle', query:{ movieComing: value.제목 } }">
            <img class="rectangle" :src="value.포스터" />
          </router-link>
        </div>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
    <div v-if="isLogin && isRecList" class="top">
      <div class="frame">
        <div class="title">당신의 취향은?</div>
        <RouterLink to="/RecHistory">
          <div class="div">+</div>
        </RouterLink>
      </div>
      <div class="posters">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in recList" :key="key">
          <router-link :to="{ name: 'MovieTitle', query:{ movieName: value.제목 } }">
            <img class="rectangle" :src="value.포스터" />
          </router-link>
        </div>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref, onMounted } from 'vue';
import {useRouter} from 'vue-router'

export default {
  name: 'homeView',
  setup() {
    const isComing = ref(null);
    const movieName = ref(null);
    const videoPlayer = ref(null); // 비디오 요소에 대한 ref
    const isPlaying = ref(false); // 비디오 재생 상태
    const isMuted = ref(false);   // 음소거 상태
    const isLogin = inject('isLogin');
    const path = ref();

    const set = JSON.parse(localStorage.getItem('set'));
    const now = JSON.parse(localStorage.getItem('now')).slice(0, 10);
    const coming = JSON.parse(localStorage.getItem('coming')).slice(0, 10);
    const topTenList = JSON.parse(localStorage.getItem('topTenList'));
    const bookMark = localStorage.getItem('bookmark')==null?'':JSON.parse(localStorage.getItem('bookmark'));
    const recList = localStorage.getItem('recList')==null?'':JSON.parse(localStorage.getItem('recList'));
    const isRecList = localStorage.getItem('recList')=='[]'?false:localStorage.getItem('recList')==null?false:true;

    // 슬라이드 스크롤
    const slideScrollRight = (t, i) => {
      const slider = event.target.parentNode;
      slider.scrollLeft += ((232 * 4) + (10 * 4));
    }
    const slideScrollLeft = (t, i) => {
      const slider = event.target.parentNode;
      slider.scrollLeft -= ((232 * 4) + (10 * 4));
    }

    // 추천리스트
    const rec = reactive([]);
    const randomIdx = Math.floor(Math.random()*bookMark.length);
    const getRecList = () => {
      const target = bookMark[randomIdx];
      let recList = null;
      let genre = '';
      for( var i of set ){
        var temp = Math.floor(Math.random()*(i.장르.split(',').length));
        if( i.제목 == ' '+target ){
          genre = i.장르.split(',')[temp];
          break;
        }
      }
      if( genre == null ){
        for( var i of coming ){
          if( i.제목 == ' '+target ){
          genre = i.장르.split(',')[temp];
          break;
        }
        }
      }
      recList = set.filter( (item) => item.장르.indexOf(genre) > -1 );

      const numberOfMoviesToSelect = 12;
      const randomMovies = [];

      while (randomMovies.length < numberOfMoviesToSelect && recList.length > 0) {
        const randomIndex = Math.floor(Math.random() * recList.length);
        randomMovies.push(recList[randomIndex]);
        recList.splice(randomIndex, 1); // 중복 선택 방지를 위해 이미 선택한 항목은 배열에서 제거
      }

      rec.value = randomMovies;
    }

    // 랜덤 예고편
    const randomTrailer = () => {
      let temp = Math.floor(Math.random() * 5) + 1;
      if (temp == 1) {
        path.value = 'https://adimg.cgv.co.kr/images/202309/FlowerMoon/FlowerMoon_1080x608.mp4';
        movieName.value = ' 플라워 킬링 문';
        isComing.value = true;
      } else if (temp == 2) {
        path.value = 'https://adimg.cgv.co.kr/images/202309/Expend4bles/1004_Expend4bles_1080x608.mp4';
        movieName.value = ' 익스펜더블 4';
        isComing.value = true;
      } else if (temp == 3) {
        path.value = 'https://adimg.cgv.co.kr/images/202309/MissFortune/1006_1080x608_PC.mp4'
        movieName.value = ' 화사한 그녀';
        isComing.value = false;
      } else if (temp == 4) {
        path.value = 'https://adimg.cgv.co.kr/images/202309/BlueGiant/BlueGiant_1080X608_PC.mp4'
        movieName.value = ' 블루 자이언트';
        isComing.value = true;
      } else if (temp == 5) {
        path.value = 'https://adimg.cgv.co.kr/images/202309/Sana/0926_SANA_1080x608_PC.mp4'
        movieName.value = ' 사나: 저주의 아이';
        isComing.value = false;
      }
    }

    // 비디오 재생/일시정지 토글 함수
    const togglePlayPause = () => {
      if (videoPlayer.value.paused) {
        videoPlayer.value.play();
        isPlaying.value = true;
      } else {
        videoPlayer.value.pause();
        isPlaying.value = false;
      }
    };

    // 음소거/음소거 해제 토글 함수
    const toggleMuteUnmute = () => {
      videoPlayer.value.muted = !videoPlayer.value.muted;
      isMuted.value = videoPlayer.value.muted;
    };


    // 비디오가 로드되면 초기 상태 설정
    onMounted(() => {
      randomTrailer();
      getRecList();

      videoPlayer.value.addEventListener('play', () => {
        isPlaying.value = true;
      });
      videoPlayer.value.addEventListener('pause', () => {
        isPlaying.value = false;
      });
      videoPlayer.value.addEventListener('volumechange', () => {
        isMuted.value = videoPlayer.value.muted;
      });
    });

    return {
      topTenList,
      now,
      videoPlayer,
      isPlaying,
      isMuted,
      togglePlayPause,
      toggleMuteUnmute,
      isLogin,
      path,
      slideScrollRight,
      slideScrollLeft,
      movieName,
      coming,
      isComing,
      randomTrailer,
      rec, recList, isRecList
    };
  }
}
</script>

<style scoped>
@import url(./homeView.css);
</style>