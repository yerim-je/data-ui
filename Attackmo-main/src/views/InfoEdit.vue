<template>
  <div id="wrap">
    <form @submit.prevent="submitForm" id="sign_box">
      <h1>회원정보수정</h1>
      <div id="change_pw">
        <label>비밀번호 변경</label>
        <input type="password" v-model="newPassword">
      </div>
      <div id="check_pw">
        <label>비밀번호 확인</label>
        <input type="password" v-model="confirmPassword">
      </div>
      <div id="phone">
        <label>휴대폰번호</label>
        <div id="num">
          <input type="number" v-model="phoneNumber[0]">-
          <input type="number" v-model="phoneNumber[1]">-
          <input type="number" v-model="phoneNumber[2]">
        </div>
      </div>
      <div id="button_box">
        <button @click="cancel" id="cancel" class="bt">취소</button>
        <button @click="updateProfile" id="check" class="bt">확인</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
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
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      phoneNumber: ["", "", ""],
      email: "", // 사용자 이메일을 저장하는 데이터 추가
      password: "", // 사용자 비밀번호를 저장하는 데이터 추가
    };
  },
  methods: {
    async updateProfile() {
      const auth = getAuth();
      const user = auth.currentUser;
      const newPassword = this.newPassword;

      if (this.newPassword !== this.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 사용자의 이메일과 비밀번호를 사용하여 재인증(credentials)합니다.
      const credential = EmailAuthProvider.credential(this.email, this.password);

      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        alert("비밀번호가 성공적으로 변경되었습니다.");
        this.$router.push('/Info');
      } catch (error) {
        alert("비밀번호 변경 중 오류가 발생했습니다: " + error.message);
      }
    },
    cancel() {
      this.$router.push('/');
    }
  }
};
</script>

 <style scoped>
     #wrap{
         display: flex;
         padding-top: 187px;
         padding-bottom:206px;
         flex-direction: column;
         align-items: center;
         height: 900px;
     }
     h1{text-align: center;}
     #sign_box{
       display: flex;
       flex-direction: column;
       align-items: center;
       gap:20px;
       height: 507px;
     }
     #change_pw, #check_pw,#phone{
       display: flex;
       width:500px;
       height: 97px;
       flex-direction: column;
       align-items: flex-start;
       gap: 20px;
     }
     #change_pw input , #check_pw input{
      width:500px;height:97px;border-radius: 10px;outline:none;padding:20px;}
     #num{
       display: flex;
       width: 500px;
       align-items: center;
       gap: 5px;
     }
     #num input{
       width: 150px;
       height: 50px;
       border-radius: 10px;
       outline:none;padding:20px;
     }
     label{color:#7A7979;font-size: 23px;font-weight: 700;}
     #button_box{
       display: flex;
       width: 450px;
       justify-content: space-between;
       align-items: flex-start;
    }
    .bt{
       width: 200px;
       height: 50px;
       flex-shrink: 0;
       border-radius: 10px;
       color:white;
       border:none;
       font-size: 23px;
       font-weight: 700;
       cursor: pointer;
    }
    #cancel{background:#B91646;}
    #check{background:black;}
    input[type="number"]::-webkit-outer-spin-button,
     input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
@media (max-width:1194px) {
   #wrap{width:100%;}
  }

@media (max-width: 490px) {
    #wrap{width:calc(100vw - 30px);}
    #sign_box{width:90%;}
    #change_pw, #check_pw,#phone{width:100%;}
    #change_pw input , #check_pw input{width:100%;outline:none;padding:20px;}
    #num{width:100%;}
    #num input{width:100%;padding:20px;}
    label{font-size: 17px;}
    #button_box{width:100%;}
    .bt{width:40%;font-size: 17px;}
  }
 </style>