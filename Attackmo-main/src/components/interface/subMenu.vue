<template>
    <div class="sub-menu foldingOut">
      <div class="frame">
        <div class="div">
          <RouterLink to="/Mnow"><div class="navBt">상영중인 영화</div></RouterLink>
          <RouterLink to="/Mcoming"><div class="navBt">상영예정 영화</div></RouterLink>
          <!-- <div class="navBt">이벤트</div>
          <div class="navBt">시사회</div> -->
        </div>
        <div class="div">
          <RouterLink to="/ReviewBoard/:1"><div class="navBt">리뷰</div></RouterLink>
          <RouterLink to="/Like"><div class="navBt">좋아요</div></RouterLink>
          <RouterLink to="/Mark"><div class="navBt">북마크</div></RouterLink>
        </div>
        <div class="div"><RouterLink to="/NoticeList"><div class="navBt">공지사항</div></RouterLink></div>
        <div class="div"><RouterLink to="/AskMe"><div class="navBt">문의사항</div></RouterLink></div>
        <div class="div">
          <RouterLink to="/Info"><div class="navBt">내 정보</div></RouterLink>
          <RouterLink to="/RecHistory"><div class="navBt">추천 기록</div></RouterLink>
        </div>
      </div>
    </div>
</template>

<script>
import {inject, onMounted, watch} from 'vue';
export default{
  name:'subMenu',
  setup(){
    const isMenuHover = inject('isMenuHover');
    const isShowing = inject('isShowing');

    const resizeUnShow = () => isShowing.value = false;

    onMounted(()=>{
      const subMenu = document.querySelector('.sub-menu');
      watch(isMenuHover, (newVal, oldVal) => {
        subMenu.classList.toggle('foldingIn');
        subMenu.classList.toggle('foldingOut');
      })

      window.addEventListener('resize', resizeUnShow);

    })

    

    return {
      isMenuHover,
      resizeUnShow
    }
  }
}
</script>

<style scoped>

a{
  width:100%;
}
.sub-menu {
  display: flex;
  height: 0px; overflow:hidden;
  align-items: center;
  justify-content: center;
  position: absolute; top:155px;
  left:50%; transform:translateX(-50%);
  background-color: #ffffff;
  width: 100%; z-index:2;
  border-top:1px solid black;
  opacity: 0;
}
@media(max-width:1194px){
  .sub-menu{display:none;}
}

.foldingIn{animation:foldingIn 0.5s ease-in-out forwards;}
.foldingOut{animation:foldingOut 0.5s ease-in-out forwards;}

@keyframes foldingIn {
  0%{height:0px; opacity: 0;}
  100%{height:248px; box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25); opacity: 1;}
}
@keyframes foldingOut {
  0%{height:248px; box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25); opacity: 1;}
  100%{height:0px; opacity: 0;}
}

.sub-menu .frame {
  display: inline-flex;
  align-items: flex-start;
  position: relative;
  flex: 0 0 auto;
}

.sub-menu .div {
  display: flex;
  flex-direction: column;
  width: 201px;
  height: 200px;
  align-items: center;
  position: relative;
  border-right:0.5px solid gray;
}

.sub-menu .div:last-child{
  border-right:none;
}gray

.sub-menu a{width:100%;}

.sub-menu .navBt {
  position: relative;
  align-self: stretch;
  font-family: 'SUITE-Regular';
  font-weight: 400;
  color: #000000;
  font-size: 22px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
  padding:6px 0;
}

.sub-menu .line {
  position: relative;
  width: fit-content;
  height: fit-content;
  object-fit: cover;
}

.sub-menu .navBt:hover,
.sub-menu .navBt-2:hover{
    transition:0.5s ease;
    background:rgba(0,0,0,0.2);
    cursor:pointer;
}

</style>