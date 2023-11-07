<template>
  <div class="screen">
    <div class="div">
      <div class="title">
        <div class="mainTitle">인기 TOP 10</div>
      </div>
      <div class="cont">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in topTenList" :key="key" class="poster-box">
          <router-link :to="{ name: 'MovieTitle', query: { movieName: value.제목 } }">
            <div class="ranking">{{ value.랭킹 }}</div>
            <button type="submit">
              <img class="image" :src="value.포스터" />
            </button>
            <div class="view">
              <div @mouseover="titleModal" @mouseout="titleModal" class="movieTitle">{{ value.제목 }}</div>
              <div class="movieDate">{{ value.개봉일 }}</div>
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
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
    <div class="div">
      <div class="title">
        <div class="mainTitle">상영 예정</div>
        <div class="plusBt">
          <RouterLink to="/Mcoming">+</RouterLink>
        </div>
      </div>
      <div class="cont">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in now" :key="key" class="poster-box">
          <router-link :to="{ name: 'MovieTitle', query: { movieName: value.제목 } }">
            <button type="submit">
              <img class="image" :src="value.포스터" />
            </button>
            <div class="view">
              <div @mouseover="titleModal" @mouseout="titleModal" class="movieTitle">{{ value.제목 }}</div>
              <div class="movieDate">{{ value.개봉일 }}</div>
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
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
    <div v-if="isLogin" class="div">
      <div class="title">
        <div class="mainTitle">추천리스트</div>
        <RouterLink to="/RecHistory">
          <div class="plusBt">+</div>
        </RouterLink>
      </div>
      <p class="recReason">
        * 매주 일요일 0시에 업데이트됩니다.
      </p>
      <div class="cont">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left"></i>
        <div v-for="(value, key) in recList" :key="key" class="poster-box">
          <router-link :to="{ name: 'MovieTitle', query: { movieName: value.제목 } }">
            <button type="submit">
              <img class="image" :src="value.포스터" />
            </button>
            <div class="view">
              <div @mouseover="titleModal" @mouseout="titleModal" class="movieTitle">{{ value.제목 }}</div>
              <div class="movieDate">{{ value.개봉일 }}</div>
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
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right"></i>
      </div>
    </div>
    <div v-if="isLogin" class="div">
      <div class="title">
        <div class="mainTitle">리뷰 좋아요</div>
        <RouterLink to="/Like">
          <div class="plusBt">+</div>
        </RouterLink>
      </div>
      <div class="cont">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left ref1"></i>
        <RouterLink to="/Rread">
          <div class="poster-box">
            <img class="image" src="@/images/Rectangle613.png" />
            <div class="view">
              <div class="movieTitle">영화제목</div>
              <div class="movieDate">작성일</div>
            </div>
            <div class="starBox">
              <div class="movieDate">리뷰 내용</div>
            </div>
          </div>
        </RouterLink>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right ref1"></i>
      </div>
    </div>
    <div v-if="isLogin && isBookMark" class="div">
      <div class="title">
        <div class="mainTitle">영화 북마크</div>
        <RouterLink to="/Mark">
          <div class="plusBt">+</div>
        </RouterLink>
      </div>
      <div class="cont">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left ref2"></i>
        <div v-for="(value, key) in bm" :key="key" class="poster-box">
          <router-link :to="{ name: 'MovieTitle', query: { movieName: value.제목 } }">
            <button type="submit">
              <img class="image" :src="value.포스터" />
            </button>
            <div class="view">
              <div @mouseover="titleModal2" @mouseout="titleModal2" class="movieTitle">{{ value.제목 }}</div>
              <div class="movieDate">{{ value.개봉일 }}</div>
            </div>
            <div class="movieName show">{{ value.제목 }}</div>
          </router-link>
        </div>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right ref2"></i>
      </div>
    </div>
    <div v-if="isLogin && isComingBookMark" class="div">
      <div class="title">
        <div class="mainTitle">내가 기대하는 작품</div>
        <RouterLink to="/Mark">
          <div class="plusBt">+</div>
        </RouterLink>
      </div>
      <div class="cont">
        <i @mousedown="slideScrollLeft()" class="bi bi-chevron-compact-left ref2"></i>
        <div v-for="(value, key) in bm2" :key="key" class="poster-box">
          <router-link :to="{ name: 'ComingMovieTitle', query: { movieComing: value.제목 } }">
            <button type="submit">
              <img class="image" :src="value.포스터" />
            </button>
            <div class="view">
              <div @mouseover="titleModal2" @mouseout="titleModal2" class="movieTitle">{{ value.제목 }}</div>
              <div class="movieDate">{{ value.개봉일 }}</div>
            </div>
            <div class="movieName show">{{ value.제목 }}</div>
          </router-link>
        </div>
        <i @mousedown="slideScrollRight()" class="bi bi-chevron-compact-right ref2"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, onMounted, ref } from 'vue';
export default {
  name: 'MovieMain',
  setup() {
    const isLogin = inject('isLogin');
    const now = JSON.parse(localStorage.getItem('now'));
    const coming = JSON.parse(localStorage.getItem('coming'));
    const topTenList = JSON.parse(localStorage.getItem('topTenList')).slice(0, 10);
    const set = JSON.parse(localStorage.getItem('set'));
    const bookMark = localStorage.getItem('bookmark')==null?'':JSON.parse(localStorage.getItem('bookmark'));
    const ComingBookmark = localStorage.getItem('ComingBookmark')==null?'':JSON.parse(localStorage.getItem('ComingBookmark'));
    const isBookMark = localStorage.getItem('bookmark')=='[]'?false:localStorage.getItem('bookmark')==null?false:true;
    const isComingBookMark = localStorage.getItem('ComingBookmark')=='[]'?false:localStorage.getItem('ComingBookmark')==null?false:true;
    const recList = JSON.parse(localStorage.getItem('recList')).slice(0, 10);

    // 기대작
    const exp = reactive([]);
    const expected = () => {
      const target = ComingBookmark[ComingBookmark.length-1];
      let expList = null;
      let genre = '';
      for( var i of coming ){
        if( i.제목 == ' '+target ){
          genre = i.장르.split(',')[0];
          break;
        }
      }
      expList = set.filter( (item) => item.장르.indexOf(genre) > -1 );

      const numberOfMoviesToSelect = 12;
      const randomMovies = [];

      while (randomMovies.length < numberOfMoviesToSelect && expList.length > 0) {
        const randomIndex = Math.floor(Math.random() * expList.length);
        randomMovies.push(expList[randomIndex]);
        expList.splice(randomIndex, 1); // 중복 선택 방지를 위해 이미 선택한 항목은 배열에서 제거
      }

      exp.value = randomMovies;
    }
    onMounted(()=>{
      expected();
    })


    // 북마크
    const bm = reactive([]);
    const bookMarkList = () => {
      for( var i of set ){
        for( var j of bookMark ){
          if( i.제목 == ' '+j ) bm.push(i);
        }
      }
      return ;
    }
    onMounted(()=>{
      bookMarkList();
    })

    // 기대하는 작품
    const bm2 = reactive([]);
    const bookMarkList2 = () => {
      for( var i of coming ){
        for( var j of ComingBookmark ){
          if( i.제목 == ' '+j ) bm2.push(i);
        }
      }
      return ;
    }
    onMounted(()=>{
      bookMarkList2();
    })



    // 제목 모달
    const titleModal = (event) => {
      const t = event.target.parentNode.nextSibling.nextSibling;
      t.classList.toggle('show');
    }
    const titleModal2 = (event) => {
      const t = event.target.parentNode.nextSibling;
      t.classList.toggle('show');
    }

    // 슬라이드 스크롤
    const slideScrollRight = (t, i) => {
      const slider = event.target.parentNode;
      slider.scrollLeft += (230 * 4) + (10 * 4);
    }
    const slideScrollLeft = (t, i) => {
      const slider = event.target.parentNode;
      slider.scrollLeft -= (230 * 4) + (10 * 4);
    }

    return {
      isLogin, topTenList, titleModal, titleModal2, now,
      slideScrollRight, slideScrollLeft, bookMark, bookMarkList, recList,
      bm, bm2, exp, isBookMark , isComingBookMark
    }
  }
}
</script>

<style scoped>
@import url(./MovieMain.css);
</style>