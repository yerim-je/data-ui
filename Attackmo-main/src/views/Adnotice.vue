<template>
    <div id="wrap">
        <div id="header">
            <img src="../images/LOGO.svg">
            <p>관리자페이지</p>
        </div>
        <div id="nav">
            <ul class="list0">
                <li>
                    <RouterLink to="./Adsign">회원관리</RouterLink>
                </li>
                <li>
                    <RouterLink to="./Adsiren">신고내역</RouterLink>
                </li>
                <li>
                    <RouterLink to="./Adnotice">공지관리</RouterLink>
                </li>
                <li>
                    <RouterLink to="./Arwrite">문의사항</RouterLink>
                </li>
            </ul>
        </div>
        <form @submit.prevent="uploadData" id="admin">
            <label>공지사항(관리자)</label>
            <div id="title">
                <label>제목</label>
                <input type="text" v-model="title" placeholder="제목을 입력해주세요">
            </div>
            <div id="notice">
                <label>내용</label>
                <textarea v-model="content"></textarea>
            </div>
            <div id="button_box">
                <button id="cancel" class="bt">취소</button>
                <button id="check" class="bt">등록하기</button>
            </div>
        </form>

    </div>
</template>
<script>

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useRouter, useRoute } from 'vue-router';
import { inject, watchEffect } from 'vue';

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
const noticeCollection = collection(db, "Adnotice");

export default {
    name: 'Create',
    setup() {
        const router = useRouter();
        const isSiren = inject('isSiren');
        const path = useRoute().path;
        watchEffect(() => {
            if (path == '/Adnotice') isSiren.value = false;
            else isSiren.value = true;
        })
        return {
            router,
        };
    },
    data() {
        return {

            title: "",
            content: ""
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
            this.router.push('/NoticeList');
        },
        // write() {
        //     this.data.push({
        //         title: this.title,
        //         writer: this.writer,
        //     })
        //     this.$router.push({
        //         path:"/NoticeList"
        //     })
        // }
    }
}      
</script>

<style scoped>
#nav {
    width: 1000px;
    display: inline-flex;
    height: 40px;
    padding: 80px 30px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.list0 {
    list-style-type: none;
    display: flex;
    width: 100%;
    padding: 0px 50px;
    justify-content: center;
    align-items: center;
    gap: 75px;
    font-weight: 800;
    font-size: 30px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 20px;
}

#header {
    width: 100%;
    font-size: 40px;
    margin-top: 30px;
    display: flex;
    align-items: end;
    justify-content: center;
    gap: 20px;
}

#wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#admin {
    display: flex;
    margin-top: 50px;
    margin-bottom: 200px;
    flex-direction: column;
    align-items: flex-start;
    gap: 50px;
    width: 1000px;
}

#title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
}

#title input {
    display: flex;
    padding: 23px 20px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    align-self: stretch;
    display: flex;
    font-size: 26px;
}

#notice {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
}

#notice textarea {
    display: flex;
    gap: 20px;
    align-self: stretch;
    height: 436px;
    width: 100%;
    padding: 20px;
    font-size: 23px;

}

#button_box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;
    width: 100%;
}

.bt {
    border-radius: 8px;
    border: 1px solid red;
    display: flex;
    width: 100px;
    padding: 7px 0px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: none;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
}

#cancel {
    color: red;
}

#check {
    background: red;
    color: white;
}

label {
    font-size: 23px;
    font-weight: 700;
}</style>