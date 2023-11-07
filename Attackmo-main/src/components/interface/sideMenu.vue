<script>
import { inject, onMounted, watch, ref, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router';
export default {
    name: 'sideMenu',
    setup() {
        const isSlideMenuToggle = inject('isSlideMenuToggle');
        const sideMenuOpen = inject('sideMenuOpen');
        const loginToggle = inject('loginToggle');
        const isLogin = inject('isLogin');
        const router = useRouter();

        const btPath1 = ref('/src/images/beforeRoll.svg');
        const btPath2 = ref('/src/images/beforeRoll.svg');


        const menuDrawerOne = () => {
          const t = document.querySelectorAll('.drawer')[0];
          const title = document.querySelectorAll('.c-title')[0];
          t.classList.toggle('drawOne');
          if(t.classList.contains('drawOne')){
            btPath1.value = '/src/images/afterRoll.svg';
            title.style.background = 'rgba(0,0,0,0.1)';
          }else{
            btPath1.value = '/src/images/beforeRoll.svg';
            title.style.background = '';
          }
        }

        const menuDrawerTwo = () => {
          const t = document.querySelectorAll('.drawer')[1];
          const title = document.querySelectorAll('.c-title')[1];
          t.classList.toggle('drawTwo');
          if(t.classList.contains('drawTwo')){
            btPath2.value = '/src/images/afterRoll.svg';
            title.style.background = 'rgba(0,0,0,0.1)';
          }else{
            btPath2.value = '/src/images/beforeRoll.svg';
            title.style.background = '';
          }
        }

        onMounted(()=>{
          const t1 = document.querySelectorAll('.drawer')[0];
          const t2 = document.querySelectorAll('.drawer')[1];
          const title1 = document.querySelectorAll('.c-title')[0];
          const title2 = document.querySelectorAll('.c-title')[1];
          const sideMenu = document.querySelector('.side-menu');
          router.beforeEach((to, from) => {
            isSlideMenuToggle.value = false;
          })
          router.beforeEach((to, from) => {
            sideMenu.classList.remove('rightZero');
          })
          router.beforeEach((to, from) => {
            t1.classList.remove('drawOne')
            t2.classList.remove('drawTwo')
            title1.style.background = 'white';
            title2.style.background = 'white';
            btPath2.value = '/src/images/beforeRoll.svg';
            btPath1.value = '/src/images/beforeRoll.svg';
          })
          watch(isSlideMenuToggle, (newVal, oldVal) => {
            if(newVal){
              sideMenu.classList.toggle('rightZero');
            }else{
              sideMenu.classList.toggle('rightZero');
            }
          });
        })

        onBeforeUnmount(()=>{
          // window.removeEventListener('popstate');
        })


        return { isSlideMenuToggle, sideMenuOpen,
            loginToggle,  isLogin, menuDrawerOne, menuDrawerTwo,
            btPath1, btPath2 };
    },
    components: { RouterLink }
}
</script>

<template>
  <div class="side-menu">
    <div class="top-side">
      <RouterLink to="/"><img class="LOGO" src="@/images/LOGO.svg" /></RouterLink>
      <div class="frame">
        <RouterLink to="/Info"><img class="person-icon" src="@/images/personicon.svg" /></RouterLink>
        <div class="loginWrapper">
          <RouterLink to="/login"><div v-if="!isLogin" style="cursor:pointer;">로그인</div></RouterLink>
          <div v-if="isLogin" @click="loginToggle()" style="cursor:pointer;">로그아웃</div> /
          <RouterLink to="/signup"><div>회원가입</div></RouterLink>
        </div>
      </div>
    </div>
    <div class="frame2">
      <RouterLink to="/Info"><img class="person-icon" src="@/images/personicon.svg" /></RouterLink>
      <div class="loginWrapperMobile">
        <RouterLink to="/login"><div v-if="!isLogin" style="cursor:pointer;">로그인</div></RouterLink>
        <div v-if="isLogin" @click="loginToggle()" style="cursor:pointer;">로그아웃</div> /
        <RouterLink to="/signup"><div>회원가입</div></RouterLink>
      </div>
    </div>
    <div class="category">
      <div class="c-title" @click="menuDrawerOne()">
        <div class="div">
          <div>
            <i class="bi bi-camera-reels menuIcon"></i>
            영화
          </div>
          <!-- <img class="drawBt drawBt1" :src="btPath1"> -->
        </div>
      </div>
      <!-- <RouterLink to="/MovieMain" class="c-title">
      </RouterLink> -->
      <div class="c-childs drawer">
        <RouterLink to="/MovieMain" class="child">
          <div class="normalFont">- 영화 메인</div>
        </RouterLink>
        <RouterLink to="/Mnow" class="child">
          <div class="normalFont">- 상영중인 영화</div>
        </RouterLink>
        <RouterLink to="/Mcoming" class="child">
          <div class="normalFont">- 상영예정 영화</div>
        </RouterLink>
        <!-- <div class="div-wrapper">
          <div class="normalFont">- 이벤트</div>
        </div>
        <div class="child">
          <div class="normalFont">- 시사회</div>
        </div> -->
      </div>
    </div>
    <div class="category">
      <div class="c-title" @click="menuDrawerTwo()">
        <div class="div">
          <div>
            <i class="bi bi-pencil-square menuIcon"></i>
            리뷰
          </div>
          <!-- <img class="drawBt drawBt2" :src="btPath2"> -->
        </div>
      </div>
      <!-- <RouterLink to="/ReviewBoard">
      </RouterLink> -->
      <div class="c-childs drawer">
        <div class="child">
          <RouterLink to="/ReviewBoard/:1"><div class="normalFont">- 리뷰페이지</div></RouterLink>
        </div>
        <div class="child">
          <RouterLink to="/Like"><div class="normalFont">- 좋아요</div></RouterLink>
        </div>
        <div class="child">
          <RouterLink to="/Mark"><div class="normalFont">- 북마크</div></RouterLink>
        </div>
    </div>
  </div>
  <div class="category">
    <RouterLink to="/NoticeList">
      <div class="c-title">
        <div class="div">
          <div>
            <i class="bi bi-bell menuIcon"></i>
            공지사항
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
  <div class="category">
    <RouterLink to="/AskMe">
      <div class="c-title">
        <div class="div">
         <div>
          <i class="bi bi-question-square menuIcon"></i>
          문의사항
        </div>
        </div>
      </div>
    </RouterLink>
  </div>
</div>
<div v-if="isSlideMenuToggle" @click="sideMenuOpen()" class="darkBG"></div>
</template>

<style>@import url(./sideMenu.css);</style>