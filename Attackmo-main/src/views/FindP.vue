<template>
  <div id="wrap">
    <form @submit.prevent="submitForm" id="find_box">
      <label>비밀번호 찾기</label>
      <div id="email">
        <input type="email" placeholder="이메일" v-model="formData.email" name="mail">
      </div>
      <div id="phone">
        <label>휴대폰번호</label>
        <div id="num">
          <input type="number" v-model="formData.number1" name="number1" placeholder="010">- 
          <input type="number" v-model="formData.number2" name="number2">-
          <input type="number" v-model="formData.number3" name="number3">
        </div>
        <div id="button_box">
          <button type="submit" id="find_p" class="bt" @click="findPassword">비밀번호 찾기</button>
        </div>
      </div>
      <div id="line"></div> 
      <div id="find">
        <label>본인인증찾기</label>
        <p>본인 인증 시 제공되는 정보는 해당 인증 기관에서 직접 수집하며, 인증 이외의 용도로 이용 또는 저장되지 않습니다.</p>
        <div id="num">
          <input type="number" v-model="verification1" name="verification1" placeholder="010">-
          <input type="number" v-model="verification2" name="verification2">-
          <input type="number" v-model="verification3" name="verification3">
        </div>
      </div>
      <div id="find_bt">
        <button type="submit"  id="mine" class="bt" @click="verifyIdentity">본인인증찾기</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
data() {
  return {
    formData: {
      email: '',
      number1: '',
      number2: '',
      number3: '',
    },
    submittedData: [], // 입력된 데이터를 저장할 배열
  };
},
methods: {
  checkAll() {
    const email = this.formData.email;
    const number = this.formData.number1 + this.formData.number2 + this.formData.number3;
    
    if (!this.checkMail(email)) {
      alert("이메일 형식이 올바르지 않습니다!");
      return false;
    }
    if (!this.checkPhone(number)) {
      alert("휴대폰번호 형식이 올바르지 않습니다!");
      return false;
    }
   
    return true;
  },
  checkMail(email) {
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    return emailRegExp.test(email);
  },
  checkPhone(number) {
    const phoneNumberPattern = /^[0-9]{11}$/;
    return phoneNumberPattern.test(number);
  },
  

    submitForm() {
      if (this.checkAll()) {
        this.submittedData.push({
          email: this.formData.email,
          number: this.formData.number1 + this.formData.number2 + this.formData.number3,
        });
        this.formData.email = '';
        this.formData.number1 = '';
        this.formData.number2 = '';
        this.formData.number3 = '';
      
        console.log(this.submittedData);
      }
    },
    verifyIdentity(){
      alert("완료되었습니다.");
      this.$router.push('/');
    }
  },
};
</script>
<style scoped>
    #wrap{
        display: flex;
        margin-top: 130px;
        margin-bottom:130px;
        flex-direction: column;
        align-items: center;
        width:100%;
    }
    #find_box{
        display: flex;
        width: 500px;
        padding: 0px;
        flex-direction: column;
        align-items: center;
        gap: 53px;  
    }
    #email{
        width: 100%;
        height: 65px;
    }
    #email input{
        width: 100%;
        height: 55px;
        padding: 20px;
        border-radius: 10px;
        font-size: 23px;
        color:#7A7979;
        outline:none;
        border:1px solid black;
    }
    #phone{
       width:100%; 
    }
    #find_box label{font-size:23px;
        font-weight: 700;}
    #phone label{
        font-size:23px;
        font-weight: 700;
    }
    #num{
        align-items: center;
        gap: 30px;
        display: flex;
        justify-content: space-between;
        width:100%;

    }
    #num input{
        width: 100%;
        height: 55px;
        padding: 20px;
        border-radius: 10px;
        outline:none;
        font-size: 23px;
        border:1px solid black;
        margin-top:10px;
    }
    #button_box{
        width:100%;
        display: flex;
        justify-content: center;
    }
    #find_p{
        width:200px;
        height: 65px;
        margin-top: 30px;
        border-radius: 10px;
        background: #F9C041;
        border:none;
        color:white; 
        font-weight:700;
        font-size:23px;
        cursor: pointer;
    }
    #find{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
        margin-top:10px;
        width:100%;
    }
    #find label{font-size:23px;font-weight: 700;}
    #find p{font-size:15px;font-weight: 400;color:#7A7979;}
    #mine{
        width: 200px;
        height: 65px;
        background: #B91646;
        border:none;
        color:white; 
        border-radius: 10px;
        font-weight:700;
        font-size:23px;
        cursor: pointer;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    #line{width:700px; height:2px; border: 3px solid whitesmoke;}
@media (max-width:1194px) {
   #wrap{width:100vw;}
}
@media (max-width:490px) {
   #wrap{width:calc(100vw - 30px); margin:15px;}
   #find_box{width:100%;gap:15px;}
   #find_box input{width:100%;height:40px;font-size: 17px;}
   #line{width:100%;}
   #num{gap:10px;margin-top:10px;}
   #find_box label{font-size: 17px;}
   #find_p{font-size: 17px;height: 50px;width:40%;}
   #mine{font-size: 17px;height: 50px;width:130px;}
}
</style>