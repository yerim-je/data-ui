<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <section id="section">
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
            <p id="title">회원관리(관리자)</p> 
            <span>목록{{sortedData.length}}</span>
            <div id="app" v-show="isModalOn">
                    <div class="modal-window">
                        <div class="close-area" @click="modalOff">
                             <i class="bi bi-x-lg"></i>
                         </div>
                         <div class="title">
                            <h2>미녀광인</h2>
                        </div>
                        <div class="content">
                             경고 / {{number}}회
                        </div>
                        <div class="content">
                            정지 / {{stopCount}}회
                        </div>
                        <div id="button_box">
                            <div id="warring">
                                <button @click="plus('plus')" >경고 1회 누적</button>
                            </div>
                            <div id="stop">
                                <button @click="stop('stop')">회원 정지 </button>
                            </div>
                            <div id="delete">
                                <button @click="deleteMember()">회원 삭제</button>
                            </div>
                        </div>
                    </div> 
                </div>
        <div class="main">
            <table class="list">
                <thead>
                    <tr>
                        <td class="n">회원</td>
                        <td class="t">회원 이메일</td>
                        <td class="w">회원 전화번호</td>
                        <td class="d">계정상태</td>
                        <td class="e">가입일자</td>
                     </tr>
                </thead>
            <tbody>
                <tr class="con" v-for="(value,index) in visiblePosts" :key="value.id" @click="modalOn">
                    <td class="n">{{ value.name }}</td>
                    <td class="t">{{ value.email }}</td>
                    <td class="w">{{ value.number}}</td>
                    <td class="d">{{ value.level}}</td>
                    <td class="e">{{ value.date}}</td>
                </tr>
            </tbody>
          </table> 
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
import data from '../data/sign.js'
import {inject, watchEffect} from 'vue';
import {useRoute} from 'vue-router'

export default {
    name: 'Read',
    data() {
        return {
            data: data,
            itemsPerPage: 10, //목록 몇개까지 표시할것인가
            currentPage: 1, //페이지 이동 수
            isModalOn: false,//모달창
            number:0,//경고1추가
            stopCount:0,//정지1추가
            hideIcon:true,//정지아이콘표시
            
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
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.sortedData.slice(start, end);
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
        },
        modalOn() {
            this.isModalOn = true; // 모달 열기
        },
        modalOff() {
            this.isModalOn = false; // 모달 닫기
        },
        plus(type){
            if(type === 'plus'){
                this.number++;
                alert("경고1회추가되었습니다.");
            } 
        },
        stop(type){
            if(type === 'stop'){
                this.stopCount++;
                alert("정지1회추가되었습니다.");
            } 
        },
        deleteMember() {
             // 데이터 목록에서 선택된 항목을 제거합니다.
            this.data.splice(this.selectedIndex, 1);
            // 모달창 닫기
            this.isModalOn = false;
            alert("삭제되었습니다.");
        }
    },setup(){
        const isSiren = inject('isSiren');
        const path = useRoute().path;
        watchEffect(()=>{
        if( path == '/Adsign' || path == '/AdSign' ) isSiren.value = false;
        else isSiren.value = true;
        console.log(path);
        })
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
    display: flex;
    justify-content: space-between;
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
.bi-sign-stop-fill.hidden{margin:5px;color:#B91646; display:none;}
.list{
    width:100%;
    border-radius:10px;
    border-collapse:collapse;
    cursor: pointer;
}
.n{width:10%;}.t{width:20%;text-align: center;}.w{width:40%;}.d{width:15%;}.e{width:15%;text-align: center;}
.n,.w,.d{
    text-align:center;
}
.t{
    text-decoration: none;
    color:#000;
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
span{font-weight: 700;}
/* 모달창 */
        #app{
            position:absolute;
            top:400px;
            left:105px;
            border-radius: 10px;
            padding:20px;  
            background: white;  
            height:290px;   
            box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); 
        }
        .title {
            padding-left: 10px;
            display: inline;
            color: black;     
        }
         .title h2 {
            display: inline;
        }
        .close-area {
            display: inline;
            float: right;
            padding-right: 10px;
            cursor: pointer;
            color: black;
        }
        
        .content {
            margin-top: 20px;
            padding: 0px 10px;
            color: black;
            font-weight: 700;
        }
        #button_box{margin:20px;}
        #delete button{
            width:230px;
            height:33px;
            border-radius: 10px;
            border:none;
            color:white; 
            background: #B91646;
            font-size: 23px;
            font-weight: 700;
            cursor: pointer;
            margin-top:10px;
           
        }
        #warring button{
            width:230px;
            height:33px;
            border-radius: 10px;
            border:1px solid black;
            color:black;
            background: white;
            font-size: 23px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
        }
        #stop button{
            width:230px;
            height:33px;
            border-radius: 10px;
            border:none;
            color:white; 
            background: black;
            font-size: 23px;
            font-weight: 700;
            cursor: pointer;
            margin-top:10px;
        }
        
       
       
</style>