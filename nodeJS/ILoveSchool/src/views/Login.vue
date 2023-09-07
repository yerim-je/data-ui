<template>
    <div class="login">
        <h3>Login</h3>
        <input type="text" v-model="email" placeholder="Email">
        <input type="password" v-model="password" placeholder="password">
        <button v-on:click="login">로그인</button>
        <p>만약 계정이 없다면 <RouterLink to="/signup">회원가입</RouterLink>을 먼저 해주세요</p>
    </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import firebase from 'firebase'
 export default{
    name: 'login',
    data() {
        return {email:'',password:''};
    },
    methods: {
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(
                function(user){
                    alert('로그인성공')
                },
                function(err){
                    alert('에러 : '+err.message)
                }
            )
        }
    },
}
</script>

<style scoped>
    .login{
        margin:0 auto;
        display:flex;
        flex-direction:column;
    }
    .login input{
        height:30px;
        margin:5px 0;
        padding:5px 15px;
    }
    .login button{height:30px;}
</style>