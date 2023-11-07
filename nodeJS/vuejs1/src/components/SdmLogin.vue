<template>
    <main id="main">
        <section id="content">
            <h3>스드메 with Seonhyang 로그인</h3>
            <div class="login_wrap">
                <form name="loginf" id="loginf" method="get" action="/">
                    <input type="hidden" name="part" value="login_check">
                    <div class="login_box">
                        <div class="login_input">
                            <input type="text" name="sdmId" id="sdmId">
                            <label for="sdmId">ID</label>
                        </div>
                        <div class="login_input">
                            <input type="password" name="sdmPw" id="sdmPw">
                            <label for="sdmPw">PW</label>
                        </div>
                        <div class="login_bt">
                            <a href="javascript:login();">LOGIN</a>
                        </div>
                    </div>
                </form>
                <div class="joinAfind">
                    <p class="find">아이디/비밀번호 찾기</p>
                    <p class="join"><a href="/sign">회원가입</a></p>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        name:'SdmLogin',
    }
</script>

<style>
#content{
    width:1000px;
}
#content h3{
    text-align:center;
    font-size:30px;
    padding:30px;
}
.login_wrap{
    width:60%;
    margin: auto;
    display:flex;
    justify-content: space-evenly;
    position:relative;
}
.login_wrap .login_box{
    margin:5px 10px;
    font-size: 20px;
}
.login_box .login_input{
    display:flex;
    padding: 5px 0;
}
.login_box .login_input label{
    display:inline-block;
    width:50px;
    order:1;
}
.login_input input{
    order:2;
    width:200px;
    height:25px;
}
.login_box .login_bt{
    margin-top:10px;
    text-align:center;
    padding:10px; 
}
.login_box .login_bt a{
    font-weight:600;
    color:#fcf4cb;
    text-decoration:none;
    background:	#6c7481;
    padding:8px 80px;
    border-radius:5px;
}
.login_box .login_bt a:hover{
    background:	#e28274;
}
.joinAfind{
    width:200px;
    display:flex;
    justify-content: space-between;
    text-align: end;
    position: absolute;
    top:140px;
    right:200px;
    font-size: 13px;
}
.joinAfind p{
    margin: auto 0;
    padding:3px 0;
}
.joinAfind p a{
    text-decoration: none;
    color:black;
}
</style>