<script>
import { RouterView, useRouter, useRoute } from 'vue-router';
import topHeader from './components/interface/topHeader.vue';
import botFooter from './components/interface/botFooter.vue';
import topAds from './components/AD/topAds.vue';
import botAds from './components/AD/botAds.vue';
import { ref, provide, onMounted } from 'vue';

// import {coming} from './mComing'
// import {now} from './mNow'
// import {topTenList} from './topTenList'
// import {set} from './movieApi'

export default {
  components: {
    topAds, topHeader, botAds, botFooter
  },
  setup() {
    // console.log(JSON.stringify(coming))
    // console.log(JSON.stringify(now))
    // console.log(JSON.stringify(topTenList))
    // console.log(JSON.stringify(set))

    const isLogin = ref(false);
    provide('isLogin', isLogin);
    const path = useRoute().path;

    const loginToggle = () => {
      const sessionStorage = window.sessionStorage;
      isLogin.value = !isLogin.value;
      sessionStorage.setItem('login', isLogin.value);
      console.log('login is = ' + sessionStorage.getItem('login'))
    };
    provide('loginToggle', loginToggle);

    const isSiren = ref(true);
    provide('isSiren', isSiren);

    onMounted(() => {
      const sessionStorage = window.sessionStorage;
      sessionStorage.setItem('login', isLogin.value);

    })


    // 날짜
    const date = new Date();
    const month = date.getMonth() + 1;
    provide('month', month);
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysDiff = date.getDate() - 1;
    const weekNumber = Math.ceil((daysDiff + firstDayOfWeek) / 7);
    provide('weekNumber', weekNumber);
    const currentDay = date.getDay();

    const isSundayMidnight = currentDay === 0 &&
    date.getHours() === 0 && date.getSeconds() === 0 &&
    date.getMilliseconds() === 0;
    provide('isSundayMidnight', isSundayMidnight);


    // 추천리스트
    const bookMark = localStorage.getItem('bookmark')==null?'':JSON.parse(localStorage.getItem('bookmark'));
    const set = JSON.parse(localStorage.getItem('set'));
    let recList = null;
    const getRecList = () => {
      const randomIdx = Math.floor(Math.random() * bookMark.length);
      const target = bookMark[randomIdx];
      let genre = '';
      for (var i of set) {
        var temp = Math.floor(Math.random() * (i.장르.split(',').length));
        if (i.제목 == ' ' + target) {
          genre = i.장르.split(',')[temp];
          break;
        }
      }
      if (genre == null) {
        for (var i of coming) {
          if (i.제목 == ' ' + target) {
            genre = i.장르.split(',')[temp];
            break;
          }
        }
      }
      recList = set.filter((item) => item.장르.indexOf(genre) > -1);

      const numberOfMoviesToSelect = 4;
      const randomMovies = [];

      while (randomMovies.length < numberOfMoviesToSelect && recList.length > 0) {
        const randomIndex = Math.floor(Math.random() * recList.length);
        randomMovies.push(recList[randomIndex]);
        recList.splice(randomIndex, 1); // 중복 선택 방지를 위해 이미 선택한 항목은 배열에서 제거
      }

      // t.value = randomMovies;
      return randomMovies;
    }
    onMounted(() => {
      if ( (recList == null && isSundayMidnight) ||
       (recList == '[]' && isSundayMidnight ) ||
       localStorage.getItem('recList') == null ) {
        let temp = [];
        for (var i = 0; i <= 3; i++) temp.push(getRecList());
        let list = [].concat(...temp);
        localStorage.setItem('recList', JSON.stringify(list));
      }
    })


    useRouter().beforeEach(() => {
      window.scrollTo(0, 0);
    })


    return {
      isSiren
    }
  }
}

</script>

<template>

  <!-- 최상단으로 버튼 -->
  <div v-show="isSiren" id="toTheTopBt">
    <a href="#">
      <img src="@/images/topBt.svg">
    </a>
  </div>

  <!-- 상단광고 위치 -->
  <section v-show="isSiren">
    <topAds />
  </section>

  <!-- 헤더 -->
  <section v-show="isSiren" id="header">
    <topHeader />
  </section>

  <!-- 컨텐츠 -->
  <RouterView />

  <!-- 하단광고 위치 -->
  <section v-show="isSiren">
    <botAds />
  </section>

  <!-- footer -->
  <footer v-show="isSiren">
    <botFooter />
  </footer>
</template>

<style>

#header{
  z-index:30;
}
@media(max-width:1194px){
  #header{
    position:sticky;
    top:0;
  }
}

#toTheTopBt {
  position: fixed;
  right: 5%;
  bottom: 10%;
  z-index: 15;
  cursor: pointer;
}

@media(max-width:490px) {
  .cursor {
    display: none;
  }

  #toTheTopBt {
    transform: scale(0.7);
  }
}

@media(max-width:1194px) {
  section:first-child {
    display: none;
  }

  section {
    height: fit-content;
  }
}</style>
