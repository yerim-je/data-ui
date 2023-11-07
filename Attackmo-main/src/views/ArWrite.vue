<template>
    <div id="wrap">
        <div id="header">
                <img src="../images/LOGO.svg"><p>관리자페이지</p>
        </div>
        <div id="nav">
            <ul class="list0">
                <li><RouterLink to="./Adsign">회원관리</RouterLink></li>
                <li><RouterLink to="./Adsiren">신고내역</RouterLink></li>
                <li><RouterLink to="./Adnotice">공지관리</RouterLink></li>
                <li><RouterLink to="./Arwrite">문의사항</RouterLink></li>
            </ul>
        </div>
        <div id="nwrite">
            <p>문의사항(관리자)</p>
            <label class="title">문의 드립니다</label>        
        <div class="writer">
            <h6>작성자</h6><h3>뒹굴찹쌀떡</h3>
        </div>
        <div class="question">
            <span>혹시 이 사이트에 성인 영화는 없나요? 찾으려던 영화가 있는데 안 보이네요</span>
        </div>
        <div id="line"></div>
        <form @submit.prevent="uploadData" id="admin">
            <div class="writer">
                <h6>작성자</h6><h3>관리자</h3>
            </div>
            <div id="title">
                <label>제목</label>
                <input type="text" v-model="title" placeholder="re:문의 드립니다.">
            </div>
            <div id="notice">
                <label>내용</label>
                <textarea v-model="content" placeholder="답변 내용 입력하기"></textarea>
            </div>
            <div id="button_box">
                <button class="bt" type="submit" @click="write">답변등록</button>
            </div>
        </form>
      </div>
    </div>
</template>
<script>

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useRouter } from 'vue-router';

const firebaseConfig = {
  apiKey: "AIzaSyC_4wWcRfgtT-dVPlL7BsjBMWbO0F2z7xc",
  authDomain: "attackmo-86940.firebaseapp.com",
  projectId: "attackmo-86940",
  storageBucket: "attackmo-86940.appspot.com",
  messagingSenderId: "375478701538",
  appId: "1:375478701538:web:c22eea3ee90ff0b813fdbb"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const noticeCollection = collection(db, "AreadTest");

export default {
    setup(){
        const router = useRouter();
        return {
            router,
        };
    },
    name: 'Create',
    data() {
        return {
            //data: data,
            title:"",
            writer: "",
            content: "",
        }
    },
    methods: {
        async uploadData() {
            try {
                const docRef = await addDoc(noticeCollection, {
                title: this.title,
                content: this.content,
                });
                console.log("Document written with ID: ", docRef.id);

            // 업로드가 완료되면 알림 표시
            window.alert("업로드가 완료되었습니다!");
            } catch (error) {
                console.error("Error adding document: ", error);
            }
            this.router.push('/Aread');
        },
    }
} 
</script>
<style scoped>
  #nav{
        width:1000px;
        display: inline-flex;
        height: 40px;
        padding: 80px 30px;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
    }
    .list0{
        list-style-type: none;
        display: flex;
        width: 100%;
        padding: 0px 50px;
        justify-content: center;
        align-items: center;
        gap: 75px;
        font-weight: 800;
        font-size: 30px;
        border-top:1px solid black;
        border-bottom:1px solid black;
        padding:20px;
    }
    #header{
        width:100%;  
        font-size: 40px;
        margin-top:30px;
        display: flex;
        align-items: end;
        justify-content: center;
        gap:20px;
    }
#wrap{
    display: flex;
    flex-direction: column;
    align-items: center; 
}
#nwrite{
    display: flex;
    margin-top: 50px;
    margin-bottom:200px;
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;
    width:1000px;
}
.writer{
    display: flex;
    gap:20px;
    align-items: flex-start;
}
label{
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 23px 20px;
    font-size: 23px;
    font-weight: 700;
}
.title{background: #F9C041;}
#line{
    width:100%;
    border: 1px solid black;
}

#admin{
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-self: stretch;
}
#nwrite p{font-size: 23px;font-weight: 700;}
#title{width:100%;}
.bt{
    background:white;
    border-radius: 30px;
    border:1px solid black;
    width:177px;
    height:47px;
    font-size:23px;
    cursor: pointer;
}
#title input{width:100%;}
input{outline:none;padding:20px;font-size:23px;}
textarea{outline:none; padding:20px;width:100%;height:400px;font-size:23px;}
#button_box{width:100%;display:flex; justify-content: flex-end;}
</style>