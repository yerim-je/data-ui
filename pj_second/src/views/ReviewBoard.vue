<template>
    <section id="section">
        <div id="wrap">
            <p id="title">리뷰게시판</p>
            <a href="/Rwrite" id="write">
                <i class="bi bi-pencil-square"></i>
            </a>
            <div class="main">
                <div id="search_box">
                    <input type="text" id="search" placeholder="검색어를 입력해주세요">
                    <i class="bi bi-search"></i>
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
                    <tbody class="con">
                        <tr v-for="(list,index) in list" :key="index">
                            <td class="n">{{ index }}</td>
                            <td class="t"><a href="/Rread">{{ list.rTitle}}</a></td>
                            <td class="w">{{ list.rWriter }}</td>
                            <td class="d">{{ list.rDate }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="page_list">
                <i class="bi bi-chevron-double-left"></i>
                <i class="bi bi-chevron-left"></i>
                <a href="">1</a> 
                <a href="">2</a> 
                <a href="">3</a> 
                <a href="">4</a> 
                <a href="">5</a> 
                <a href="">6</a> 
                <a href="">7</a> 
                <a href="">8</a> 
                <a href="">9</a> 
                <a href="">10</a>
                <i class="bi bi-chevron-right"></i>
                <i class="bi bi-chevron-double-right"></i>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data(){
        return{
            list:[
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'귤먹고 뒹굴뒹굴',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'아이언맨',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'스칼렛',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'마크야',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'체리',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'로키',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'지켜본다',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'만다린',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'앱플',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'오토모',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'기아',rDate:'0000.00.00'},
                {rTitle:'리뷰 처음 써보는데 이 영화 괜찮네요',rWriter:'skjjdk',rDate:'0000.00.00'},
            ]  
        }
    }
    

    
}
</script>

<style>
@import url('../assets/css/reviewList.css');
</style>