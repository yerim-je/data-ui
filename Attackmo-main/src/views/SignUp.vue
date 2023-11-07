<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <div id="app" class="wrap">
        <form @submit.prevent="submitForm" id="sign_box">
             <p>회원가입</p>
             <div id="email">
                <label><i class="bi bi-asterisk"></i>이메일</label>
                <input type="email" class="form-control" v-model="email">
             </div>
             <div id="pw">
                <label><i class="bi bi-asterisk"></i>비밀번호</label>
                <input type="password" class="form-control"  v-model="password">
             </div>
             <div id="pw_ck">
                <label><i class="bi bi-asterisk"></i>비밀번호 확인</label>
                <span>*비밀번호는 6자리 이상의 영문과 숫자에 조합하여야합니다</span>
                <input type="password" class="form-control" v-model="password2">
              </div>
             <div id="nickname">
                <label><i class="bi bi-asterisk"></i>활동명</label>
                <input type="text" class="form-control" name="n_name" id="aname"  v-model="n_name">
             </div>
             <div id="phone">
                <label><i class="bi bi-asterisk"></i>휴대폰번호</label>
                <div id="num">
                  <input type="number" name="number" id="number1" placeholder="010">
                  -<input type="number" name="number" id="number2" >
                  -<input type="number" name="number"  id="number3" >
                </div>       
             </div>
             <div id="button_box">
                <button type="submit" id="sign" >가입하기</button>
                <button type="button" id="cancel">취소</button>
             </div>
        </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useRouter } from 'vue-router';
 
  const firebaseConfig = {
    apiKey: "AIzaSyC_4wWcRfgtT-dVPlL7BsjBMWbO0F2z7xc",
    authDomain: "attackmo-86940.firebaseapp.com",
    projectId: "attackmo-86940",
    storageBucket: "attackmo-86940.appspot.com",
    messagingSenderId:  "375478701538",
    appId: "1:375478701538:web:c22eea3ee90ff0b813fdbb"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const password2 = ref(""); // 비밀번호확인
    const n_name = ref(""); // 활동명 변수 추가
    const router = useRouter();

    const goBack = () => router.go(-1);

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log("등록 성공:", userCredential);
        alert("가입완료");
        // 이후 로그인 페이지로 리다이렉트 등의 동작 수행
        router.push('/login'); // 로그인 페이지 경로로 리다이렉트
      } catch (error) {
        console.error("등록 실패:", error);
        alert("가입 실패: " + error.message);
        router.push('/SignUp'); // 페이지 그대로
      }
    };
     // checkMail 함수 추가
     const checkMail = (mail) => {
      const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
      if (!emailRegExp.test(mail)) {
        alert("이메일 형식이 올바르지 않습니다!");
        return false;
      }
      return true;
    };
    // checkPassword 함수 추가
      const checkPassword = (password, password2) => {
        if (password !== password2) {
          alert("비밀번호가 맞지않습니다");   
          return false;
        }
        if (password.length < 6) {
          alert("비밀번호는 6자리 이상이어야 합니다.");
          return false;
        }
        return true; // 확인이 완료되었을 때
      };
      //활동명
      const checkName = (n_name) => {
      if (!n_name) {
        alert("활동명을 입력해주세요!");
        return false;
      }
      const nameRegExp = /^[가-힣]{2,4}$/;
      if (!nameRegExp.test(n_name)) {
        alert("이름이 올바르지 않습니다.");
        return false;
      }
      return true;
    };
    const submitForm = () => {
      if (checkMail(email.value) && checkPassword(password.value, password2.value) && checkName(n_name.value)) {
        // 모든 유효성 검사 통과한 경우에만 등록 수행
        register();
      }
    };

    return {
      email,
      password,
      password2,
      n_name, // 활동명 변수 추가
      goBack,
      register,
      checkMail, // checkMail 함수를 setup에서 반환
      checkPassword,
      checkName,
      submitForm,

    };
  },
};
</script>
<style scoped>
    .wrap{
        display: flex;
        padding-top: 103px;
        padding-bottom:103px;
        flex-direction: column;
        align-items: center;
        gap: 150px;
    }
    #sign_box{
      display: flex;
      width: 600px;
      justify-content: center;
      align-items: flex-start;
      align-content: flex-start;
      gap: 49px 42px;
      flex-wrap: wrap;
    }
    #sign_box p{font-size: 25px;font-weight: 700;}
    #email,#pw,#pw_ck,#nickname{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        width:100%;
    }
    #email input,#pw input,#pw_ck input,#nickname input{
        width: 100%;
        height: 55px;
        outline:none;
        padding:20px;
        font-size: 17px;
    }
    #pw_ck span{
      color:#F9C041;
      font-weight: 700;
      align-self: flex-end;
      font-size:20px;
    }
    #phone{
        padding:0px;
        width: 100%;
        height: 75px;
        outline:none;
        font-size: 23px;
    }
    #num{ 
        width:100%;
        padding:0px;
        display: flex;
        align-items: center;
        gap:20px;
        margin-top:20px;
    }
    #num input{
      outline:none;
      width: 100%;
      height: 55px;
      padding:20px;
      font-size: 17px;
    }
    #button_box{
        display: flex;
        width:90%;
        padding: 25px 368px;
        justify-content: center;
        align-items: center;
        gap: 42px;
    }
    #button_box button{
        display: flex;
        width: 250px;
        height: 55px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
        border-radius: 10px;
        color:white;
        border:none;
        font-size: 23px;
        font-weight: 700;
        cursor: pointer;
    }
    
    #sign{ background: #F9C041;}
    #cancel{ background:  #B91646;}
    label{font-size: 23px;font-weight: 700;}
    label i {font-size: 23px;color:#B91646;}
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    @media (max-width:1194px) {
     .wrap{width:100%;}
     #email input,#pw input,#pw_ck input,#nickname input{width:100%;}
     #sign_box{width:750px;}
     #pw_ck,#nickname,#phone,#num{width:100%;}
     #pw_ck span{width:100%;font-size: 17px;}
     #num input{width:100%;}
     #button_box{width:100%;}
     #button_box button{width:350px;padding:0px;}
     input{outline:none;}
    }
    @media (max-width:490px) {
      label, .bi-asterisk{font-size: 17px;}
      #sign_box{width:338px;gap:12px;}
      #button_box{width:100%;margin-top:20px;padding:0px;}
      #button_box button{width:100px;font-size:17px;height:40px;}
      #pw_ck span{font-size:14px;}
      #email input,#pw input,#pw_ck input,#nickname input, #num input{
        width:100%; height:10px;outline:none;}  
      #app .wrap{padding:10px;}  
      #sign_box p{font-size: 17px;} 
      
    }
</style>