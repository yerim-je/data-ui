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
            <p id="title">신고관리(관리자)</p> 
            <span>목록{{sortedData.length}}</span>
        <div class="main">
            <table class="list">
                <thead>
                    <tr>
                        <td class="n">사유</td>
                        <td class="t">신고대상</td>
                        <td class="w">일자</td>
                     </tr>
                </thead>
            <tbody>
                <tr class="con" v-for="(value,i) in visiblePosts" :key="value.id" @click="open()">
                    <td class="n">{{ value.option}}</td>
                    <td class="t">{{ value.name }}</td>
                    <td class="w">{{ value.date}}</td>
       
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
import data from '../data/siren.js'
import { inject, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
export default {
    name: 'Read',
    data() {
        return {
            data: data,
            itemsPerPage: 10, //목록 몇개까지 표시할것인가
            currentPage: 1, //페이지 이동 수
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
        open(){
            window.open('./AdSirenPop','_blank','width:150','height:150');
        },
        search(){
            alert("검색한다");
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
    },setup(){
        const isSiren = inject('isSiren');
        const path = useRoute().path;
        watchEffect(()=>{
        if( path == '/Adsiren' ) isSiren.value = false;
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
    cursor: pointer;
}
.n{width:20%;font-weight: 700;}.t{width:30%;text-align: center;}.w{width:20%;}
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
</style>