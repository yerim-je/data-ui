<template>
    <div id="wrap">
        <div id="nwrite">
            <p>공지사항</p>
                <div class="note">
                    <label>{{selectedData.title}}</label> 
                </div>
           
        <div class="writer">
            <p>관리자</p><p>{{ getCurrentDate() }}</p>
        </div>
        <div id="admin">
                <div class="note">
                    <span>{{selectedData.content}}</span>
                </div>
        </div>
      </div>
      
    </div>
</template>
<script>
import { getFirestore, collection, getDocs} from "firebase/firestore";
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
const noticeCollection = collection(db, "Adnotice");

export default {
    name: 'Read',
    props: ['selectedData'], // 선택한 데이터를 props로 받음
    data() {
        return {
            data: [],
            selectedData: {
                title: '',
                content: '',
            },
        }
    },
    methods: {    
        getCurrentDate() { //날짜 형식 YYYY-MM-DD
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    async selectData(index) {
      // 선택한 데이터의 인덱스를 기반으로 제목과 내용을 표시
      if (index >= 0 && index < this.data.length) {
        this.selectedData.title = this.data[index].title;
        this.selectedData.content = this.data[index].content;
      } else {
        console.log("데이터가 없거나 인덱스가 잘못되었습니다.");
      }
    },
  },

async created() {
try {
      const querySnapshot = await getDocs(noticeCollection);
      querySnapshot.forEach((doc) => {
        this.data.push(doc.data());
      });
      
      const selectedIndex = this.$route.params.selectedIndex;


      if (selectedIndex >= 0 && selectedIndex < this.data.length) {
        this.selectedData.title = this.data[selectedIndex].title;
        this.selectedData.content = this.data[selectedIndex].content;
      } else {
        console.log("데이터가 없거나 인덱스가 잘못되었습니다.");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패: ", error);
    }
  },
};
</script>
  <style scoped>
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
      background:  #F9C041;
      width:100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 23px 20px;
      font-size: 23px;
      font-weight: 700;
  }
  #admin{
      display: flex;
      flex-direction: column;
      gap: 25px;
      align-self: stretch;
  }
  #nwrite p{font-size: 23px;font-weight: 700;}
  .note{width:100%;}
  .note span{
      font-size: 17px;
      font-weight: 400;
  }
  @media (max-width:1194px) {
     #wrap{width:100%;}
     #nwrite{width:90%;}
    }
  
  @media (max-width: 490px) {
      #wrap{width:calc(100vw - 20px);}
      #nwrite{width:97%;margin-bottom:20px;gap:25px;}
      #nwrite p{font-size: 17px;}
      label{padding:15px;font-size: 17px;}
    }
  </style>