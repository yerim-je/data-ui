<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <section id="section">
    <div id="wrap">
            <p id="title">공지사항</p> 
        <div class="main">
            <div id="search_box">
                    <input type="text" id="search" v-model="searchKeyword"
                     placeholder="검색어를 입력해주세요">
                    <i class="bi bi-search" @click="search"></i>
            </div>
            <table class="list">
                <thead>
                    <tr>
                        <td class="n">번호</td>
                        <td class="t">제목</td>
                        <td class="w">작성자</td>
                        <td class="d">날짜</td>
                     </tr>
                </thead>
            <tbody>
                <tr class="con" v-for="(value,index) in visiblePosts" :key="value.id" >
                    <td class="n">{{ index + 1 }}</td>
                    <td class="t" @click="gonote(index)">{{ value.title }}</td>
                    <td class="w">{{ value.writer }}</td>
                    <td class="d">{{ getCurrentDate()}}</td>
                </tr>
            </tbody>
            <!-- <tbody>
                <tr class="con" v-for="(item, index) in data" :key="index" @click="gonote(index)">
                    <td class="n">{{ index + 1 }}</td>
                    <td class="t">{{ item.title }}</td>
                    <td class="w">{{ item.writer }}</td>
                    <td class="d">{{ getCurrentDate() }}</td>
                </tr>
            </tbody> -->
          </table>
          <div class="mobileList">
                    <div class="post" v-for="(value,index) in visiblePosts" :key="value.id">
                        <div class="m_t" @click="gonote(index)">{{value.title }}</div>
                        <div class="m_w">{{ value.writer }}</div>
                        <div class="m_d">{{ getCurrentDate() }}</div>
                    </div>    
                </div>
            </div>
            <div id="totalPage">
                <i @click="before()" class="bi bi-chevron-double-left"></i>   
                <i @click="before()" class="bi bi-chevron-left"></i>
                    <div id="page">
                        <button id="pgnum" v-for="block in blocks" :key="block" @click="changePage(block)">{{ block }}</button>
                    </div>
                <i @click="next()" class="bi bi-chevron-right"></i>  
                <i @click="next()" class="bi bi-chevron-double-right"></i>
            </div>
          </div>
 </section>
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
    data() {
        return {
            data: [],
            itemsPerPage: 10, //목록 몇개까지 표시할것인가
            currentPage: 1, //페이지 이동 수 
            searchKeyword:"",//검색어 저장  
            selectedData: null, // 데이터 속성 이름 변경
        }   
    },
    computed: {
        sortedData() {
            return this.data.slice().sort((a, b) => {
                // 날짜를 기준으로 내림차순 정렬
                return new Date(b.Date) - new Date(a.Date);
            });
        }, 
        totalPage() {//하단목록숫자표시
            return Math.ceil(this.data.length / this.itemsPerPage);
        }, 
        visiblePosts() { //작성폼에서 작성해서 저장하면 목록에 추가해줌
            // const start = (this.currentPage - 1) * this.itemsPerPage;
            // const end = start + this.itemsPerPage;
           
            // return this.sortedData.slice(start, end);
            
            if (this.searchKeyword) {
                // 검색어가 입력된 경우
                return this.sortedData.filter((value) => {
                return value.title.toLowerCase().includes(this.searchKeyword.toLowerCase());
                }).slice(0, this.itemsPerPage);
            } else {
                // 검색어가 입력되지 않았을 때
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.sortedData.slice(start, end);
            }
        },
           
        blocks() { //페이지 이동
            const blocks = [];
            for (let i = 1; i <= this.totalPage; i++) {
                blocks.push(i);
        }
         return blocks;
        },
  },
    methods: {
        getCurrentDate() { //날짜 형식 YYYY-MM-DD
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        gonote(index) {
            this.$router.push({ name: 'NoticeChoice', params: { selectedIndex: index } });
        },
        search(){
            alert("검색");
        },
        changePage(page) {
            this.currentPage = page;
        },
        before(){
            //alert("이전");
            if(this.currentPage>1){
                this.currentPage--; 
            }
        },
        next(){
            //alert("다음");
            if(this.currentPage < this.totalPage){
                this.currentPage++;
            }
        }
    },
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
*{padding:0;margin:0; box-sizing: border-box;}
#section{
    width:1000px;
    margin:50px auto;
    position:relative;
}
#title{
    font-size:23px;
    font-weight:700;
    margin-bottom:50px;
}
#write{
    width:50px;
    height:50px;
    background:#F9C041;
    border-radius: 50px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    position:absolute;
    top:200px;
    right:-100px;
}
.main{
    display:flex;
    flex-direction: column;
    align-items: flex-end;
} 
#search_box{
    width:330px;
    height:40px;
    border:1px solid #000;
    border-radius:30px;
    font-size: 20px;
    margin-bottom:20px;
}
#search{
    font-size:23px;
    border:0;
    height:40px;
    padding:0 20px;
    width:280px;
    outline: 0;
    background:rgba(0,0,0,0)
}
.bi-search{cursor: pointer;}

.list{
    width:100%;
    border-radius:10px;
    border-collapse:collapse;
    text-align: center;
}
.n{width:10%;}.t{width:60%;}.w{width:15%;}.d{width:15%;}
.n,.w,.d{
    text-align:center;
}
.t{
    text-decoration: none;
    color:#000;
    cursor: pointer;
}
thead tr{
    text-align:center;
    height:60px;
    border-bottom:3px double #000;
}tbody{
    width:100%;
}
.con{
    height:50px;
    border-bottom:1px solid #000;
}
#totalPage{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
}
#page{
    list-style-type: none;
    display: inline-flex;
    height: 40px;
    padding: 0px 30px;
    align-items: center;
    flex-shrink: 0;
    gap:25px;
}
#pgnum{
    border:none;
    background: white;
}
.mobileList{
    display:none;
}
@media (max-width:1194px) {
    #section{width:100vw; font-size: 17px;}
    #wrap{width:90%;margin: 0 auto;}
    #write{top:70px;right:30px;}
    .main{width:100%;align-items:flex-start;}
    #search{font-size: 17px;}

}
@media (max-width:490px) {
    #section{width:100vw;}
    #wrap{width:90%;}
    .main{width:100%;font-size:12px;}
    #write{
        width:25px;
        height:25px;
        line-height:25px;
        font-size:15px;
        top:80px;
        right:20px;
    }
    #search_box{width:50%;height:30px;}
    #search_box i{display:none;}
    #search{
        width:100%;
        height:30px;
        line-height:30px;
        font-size:12px;
        padding:0 10px;
    }
    .mobileList{display:block;}
    .post{
        display:flex;
        flex-wrap:wrap;
        border-bottom:1px solid #ccc;
        padding: 3px;}
    .m_t{width:100%; font-size:14px;} 
    .m_w,.m_d{font-size:8px; color:#aaa;}
    .list{display:none;}
}
</style>