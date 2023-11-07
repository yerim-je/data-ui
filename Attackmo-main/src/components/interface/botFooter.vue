<template>
     <div v-if="isSiren" class="footer">
      <div class="footer-container">
        <div class="navbar">
          <div class="normalFont">이용약관</div>
          <div class="bold">개인정보처리방침</div>
          <div class="normalFont">이메일주소무단수집거부</div>
          <div class="normalFont">고객센터</div>
        </div>
        <div class="footer-info">
          <img class="union" src="@/images/LOGOgray.svg" />
          <div class="info-box">
            <p class="normalFont h">(34838)대전 중구 중앙로 121번길 20</p>
            <div class="normalFont h" @click="Admin()" id="ceo">공동 대표 : 임상림</div>
            <div class="normalFont h">대표이메일 : imsangrim@attackmo.com</div>
            <div class="normalFont h">사업자등록 : 123-45-67890</div>
            <p class="normalFont copyRight">COPYRIGHT © Attackmo All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'botFooter',
  setup() {
    const isSiren = ref(true);

    onMounted(() => {
      if (location.href.split("/")[3] === 'Siren') {
        isSiren.value = false;
      } else {
        isSiren.value = true;
      }
    })

    return {isSiren}
  },methods:{
    Admin(){
      alert("관리자만 열~~드라구~~");
      window.open('./AdSign','_blank','width:150','height:150');
    }
  }
}
</script>

<style scoped>
@import url(./botFooter.css);
#ceo:hover{cursor: pointer; font-weight:700; color:brown;}
</style>