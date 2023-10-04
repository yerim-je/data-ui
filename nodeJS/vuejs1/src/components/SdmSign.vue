<template>
<main id="main">
            <section id="content">
                <h3>스드메 회원가입</h3>
                <div class="join_wrap">
                    <div class="join_input">
                        <label for="jId">아이디</label>
                        <input type="email" id="jId" name="jId" placeholder="이메일형식으로 입력해주세요">
                    </div>
                    <div class="join_input">
                        <label for="jPw">비밀번호</label>
                        <input type="password" id="jPw" name="jPw">
                    </div>
                    <div class="join_input">
                        <label for="jAdd">신혼집 주소</label>
                        <input type="text" id="jAdd" name="jAdd">
                    </div>
                    <div class="join_input">
                        <label for="jTel">연락처</label>
                        <input type="text" id="jTel1" class="tel" name="jTel"> - 
                        <input type="text" id="jTel2" class="tel" name="jTel"> - 
                        <input type="text" id="jTel3" class="tel" name="jTel">
                    </div>
                    <div class="join_input">
                        <label for="wDate">결혼예정일</label>
                        <input type="date" id="wDate" name="wDate">
                    </div>
                </div>
                <div class="join_bt">
                    <button>회원가입</button>
                </div>
            </section>
        </main>
</template>

<script>
export default {
  name: 'SdmSign'
}
</script>

<style>
#content{
    width:600px;
    position:relative;
    left:200px;
    border:2px dashed #b8c85e;
}
#content h3{
    margin: 30px auto;
    font-size: 30px;
    text-align: center;
}
.join_wrap{
    width:500px;
    margin:0 auto;
}
.join_input{
    width:100%;
    text-align:center;
    padding-bottom:5px;
    border-bottom:1px solid #6c7481;
    margin-top:5px
}
.join_input label{
    display:inline-block;
    width:120px;
    font-size:19px;
}
.join_input input{
    width:250px;
    height:30px;
    font-size:15px;
}
.join_input .tel{
    width:70px;
}
.join_bt{
    width:130px;
    padding:30px 0;
    margin:0 auto;
}
.join_bt button{
    padding:8px 30px;
    font-size: 20px;
    border:0;
    border-radius:5px;
    background:#f4d2c8;
    color:#6c7481;
}
.join_bt button:hover{
    background:	#e28274;
    color:#fcf4cb;
}
</style>