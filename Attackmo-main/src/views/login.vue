<template>
  <div class="wrap">
    <div id="login_box">
      <div id="title">
        <label>로그인</label>
      </div>
      <form v-on:submit.prevent="registerUser" id="content">
        <input type="email" placeholder="이메일" id="email-new">
        <input type="password" placeholder="비밀번호" id="pw-new">
        <!-- <button @click="togo" @keyup="togo" id="login_bt">로그인</button>   -->
        <button type=submit @click="login" id="login_bt">LOGIN</button>

        <div id="find">
          <label>
            <RouterLink to="./FindE">ID</RouterLink>
            <RouterLink to="./FindP">/PW찾기</RouterLink>
          </label>
          <label>
            <RouterLink to="./SignUp">회원가입</RouterLink>
          </label>
        </div>
      </form>
      <div id="social_login">
        <a @click="openWindow('https://www.facebook.com/?locale=ko_KR')" id="facebook">
          <img src="../images/facebook.png"></a>
        <a @click="openWindow('https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoia28ifQ%3D%3D%22%7D')"
          id="twitter"><img src="../images/twitter.svg"></a>
        <a @click="openWindow('https://www.instagram.com/accounts/login/')" id="instagram"><img
            src="../images/instagram.png"></a>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC_4wWcRfgtT-dVPlL7BsjBMWbO0F2z7xc",
  authDomain: "attackmo-86940.firebaseapp.com",
  projectId: "attackmo-86940",
  storageBucket: "attackmo-86940.appspot.com",
  messagingSenderId: "375478701538",
  appId: "1:375478701538:web:c22eea3ee90ff0b813fdbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default {
  setup() {
    const isLogin = inject('isLogin');
    const loginToggle = inject('loginToggle');
    const router = useRouter();

    const login = async () => {
      const email = document.querySelector("#email-new");
      const pw = document.querySelector("#pw-new");

      if (email.value == '' || pw.value == '') {
        alert("이메일과 비밀번호를 전부 입력해야 합니다.");
        return;
      }

      try {
        // const auth = getAuth();
        await signInWithEmailAndPassword(auth, email.value, pw.value);
        loginToggle();
        router.go(-1);
      } catch (error) {
        alert("존재하지 않는 계정입니다.")
      };
      
    }
    return { login, isLogin }
    // methods: {
    //   openWindow(linkUrl) {
    //     window.open(linkUrl, '_blank', 'width=600 height=600');
    //   }
  }
}
</script>
<style scoped>
.wrap {
  padding-top: 120px;
  padding-bottom: 120px;
  width: 100%;
}

#title {
  font-size: 25px;
  font-weight: 700;
  color: black;
  text-align: center;
}

#login_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

#content {
  display: flex;
  width: 466px;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

#content input {
  width: 400px;
  height: 50px;
  padding: 20px;
  outline: none;
  font-size: 17px;
}

#login_bt {
  font-size: 20px;
  font-weight: 700;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background: #F9C041;
  color: white;
  cursor: pointer;
}

#find {
  width: 85%;
  display: flex;
  gap: 20px;
}

#find a {
  color: gray;
  cursor: pointer
}

#find a:hover {
  color: #F9C041;
}

#social_login {
  display: flex;
  gap: 40px;
}

#social_login:hover {
  cursor: pointer;
}

#social_login img {
  width: 50px;
  height: 50px;
}


/*반응형*/
@media (max-width:1194px) {
  .wrap {
    width: 100%;
  }
}

@media (max-width: 490px) {
  .wrap {
    width: calc(100vw - 30px);
  }

  #login_box {
    width: 375px;
  }

  #content {
    width: 92%;
  }

  #content input {
    width: 100%;
  }

  #login_bt {
    width: 100%;
  }

  #social_login img {
    width: 30px;
    height: 30px;
  }
}
</style>