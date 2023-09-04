<template>
  <main id="main">
    <section id="content">
      <img src="../assets/main.jpg" alt="메인이미지">
    </section>
    <section id="side">
      <div class="login_bt"><a href="/login">로그인</a></div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MyHome'
}
</script>

<style>
#main img{
    width:100%;
}
#side .login_bt{
    padding: 10px 10px;
}
#side .login_bt a{
    color:#fff;
    text-decoration:none;
    background:	#769293;
    padding: 7px 0;
    width:100%;
    display:inline-block;
    border-radius:5px;
    text-align: center;
}
#side .login_bt a:hover{
    background:#bababa;
    color:#fad7d5;
}
#side .user{
    padding: 10px 10px;
}
#side .user a{
    color:#fff;
    text-decoration:none;
    background:	#769293;
    padding: 7px 0;
    width:100%;
    display:inline-block;
    border-radius:5px;
    text-align: center;
}
#side .user a:hover{
    background:#bababa;
    color:#fad7d5;
}
</style>