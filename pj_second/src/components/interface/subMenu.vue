<template>
    <div class="sub-menu">
      <div class="frame">
        <div class="div">
          <div class="text-wrapper">상영중인 영화</div>
          <div class="text-wrapper">상영예정 영화</div>
          <div class="text-wrapper">이벤트</div>
          <div class="text-wrapper">시사회</div>
        </div>
        <img class="line" src="@/images/subMenuLine.svg" />
        <div class="div">
          <div class="text-wrapper"><a href="/ReviewBoard">리뷰</a></div>
          <div class="text-wrapper"><a href="/Like">좋아요</a></div>
          <div class="text-wrapper"><a href="/Mark">북마크</a></div>
        </div>
        <img class="line" src="@/images/subMenuLine.svg" />
        <div class="div"><div class="text-wrapper">공지사항</div></div>
        <img class="line" src="@/images/subMenuLine.svg" />
        <div class="div"><div class="text-wrapper">문의사항</div></div>
        <img class="line" src="@/images/subMenuLine.svg" />
        <div class="div">
          <div class="text-wrapper"><a href="/Info">내 정보</a></div>
          <div class="text-wrapper"><a href="/RecHistory">추천 기록</a></div>
        </div>
      </div>
    </div>
</template>

<script setup>

</script>

<style>
.sub-menu {
  display: flex;
  height: 248px;
  align-items: center;
  justify-content: center;
  position: absolute; top:190px;
  left:50%; transform:translateX(-50%);
  background-color: #ffffff;
  width: 100vw; z-index:2;
  min-width: 1920px; border-top:3px solid black;
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
  width: 200px;
  height: 200px;
  align-items: center;
  position: relative;
}

.sub-menu .text-wrapper {
  position: relative;
  align-self: stretch;
  font-family: "Inter-Regular", Helvetica;
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
  width: 1px;
  height: 200px;
  object-fit: cover;
}

.sub-menu .text-wrapper:hover,
.sub-menu .text-wrapper-2:hover{
    background:rgba(0,0,0,0.2);
    cursor:pointer;
}

</style>