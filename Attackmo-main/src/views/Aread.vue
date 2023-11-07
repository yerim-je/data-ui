<template>
        <div id="wrap">
            <div id="nwrite">
                <p>문의사항</p>
                <label>문의 드립니다</label>        
            <div class="writer">
                <h6>작성자</h6><h3>뒹굴찹쌀떡</h3>
            </div>
            <div class="question">
                <span>혹시 이 사이트에 성인 영화는 없나요? 찾으려던 영화가 있는데 안 보이네요</span>
            </div>
            <div id="line"></div>
            <div id="admin">
                <div id="name">
                    <label>re:문의 드립니다</label>
                </div>
                <div class="writer">
                    <h6>작성자</h6><h3>관리자</h3>
                </div>
                <div class="question">
                    <template v-for="(value, index) in data" :key="index">
                        <div class="note">
                            <span>{{ value.content }}</span>
                        </div>
                     </template>
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
const noticeCollection = collection(db, "AreadTest");

export default {
    name: 'Read',
    data() {
        return {
            data: [],
        }
    },
    methods: { },
    async created() {
    try {
      const querySnapshot = await getDocs(noticeCollection);
      querySnapshot.forEach((doc) => {
        this.data.push(doc.data()); 
        // Firestore에서 가져온 데이터를 this.data 배열에 추가
      });
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
        background: #F9C041;
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
        padding: 23px 20px;
        font-size: 23px;
        font-weight: 700;
    
   }
   #line{
    width:100%;
    border: 3px solid whitesmoke;
   }
   #name{
    display: flex;
    width: 1000px;
    flex-direction: column;
    align-items: flex-start;
    gap: 39px;
    flex-shrink: 0;
   }
   #name label{background: #B91646; color:white;}
   #admin{
        display: flex;
        flex-direction: column;
        gap: 25px;
        align-self: stretch;
    }
    #nwrite p{font-size: 23px;font-weight: 700;}
    .note{width:960px;padding:20px;padding:0px;margin-top:10px;}
@media (max-width:1194px) {
   #wrap{width:100%;}
   #nwrite{width:90%;}
    .writer{width:100%;}
    label{width:100%;}
   #line{width:100%;border: 1px solid black;}
   #name{width:100%;}
   #admin{width:100%;}
    #nwrite p{width:100%;font-size: 23px;font-weight: 700;}
    .note{width:100%;}
  }

  @media (max-width: 490px) {
      #wrap{width:calc(100vw - 20px);}
      #nwrite{width:97%;margin-bottom:20px;gap:25px;}
      #nwrite p{font-size: 17px;}
      label{padding:15px;font-size: 17px;}
      #line{width:100%; border: 3px solid whitesmoke;}
    }
  
</style>