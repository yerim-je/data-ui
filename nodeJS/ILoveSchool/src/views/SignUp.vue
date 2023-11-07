<template>
  <div class="signup">
    <p>회원가입</p>
    <input type="text" v-model="email" placeholder="Email" /><br />
    <input type="password" v-model="password" placeholder="password" /><br />
    <button v-on:click="signup">가입하기</button>
    <span><RouterLink to="/login">로그인</RouterLink>으로 돌아가기</span>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import firebase from 'firebase'
export default {
  name: 'SignUp',
  data() {
    return { email: '', password: '' }
  },
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        // 현재 사용하고 있는 이메일과 패스워드를 파이어베이스에 유저로 저장한다.
        .then(
          function (user) {
            alert('회원가입 완료')
          },
          function (err) {
            alert('에러 : ' + err.message)
          }
        )
    }
  }
}
</script>

<style>
.signup {
  margin: 0 auto;
  width: 200px;
}
.signup input {
  padding: 5px 15px;
  width: 100%;
  border-radius: 5px;
  height: 30px;
  margin: 5px 0;
}
.signup button {
  height: 30px;
  margin: 5px;
  border: 1px solid darkgreen;
  border-radius: 3px;
  background: #fff;
}
</style>
