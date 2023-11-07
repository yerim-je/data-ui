<template>
  <div>
    <h1>선택한 데이터</h1>
    <p><strong>제목:</strong> {{ selectedData.title }}</p>
    <p><strong>내용:</strong> {{ selectedData.content }}</p>
    <!-- 나머지 데이터 필드도 필요에 따라 표시하세요. -->
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
const noticeCollection = collection(db, "Anotice");

export default {
  name: 'Read',
  data() {
    return {
      selectedData: null,
      data: [] // 데이터를 저장할 배열 추가
    };
  },
  created() {
    // 'Aread' 페이지가 로드될 때 전달된 데이터를 수신합니다.
    this.selectedData = this.$route.query.data;
  },
  methods: {
    async fetchData() {
      try {
        const querySnapshot = await getDocs(noticeCollection);
        querySnapshot.forEach((doc) => {
          this.data.push(doc.data());
        });
      } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
