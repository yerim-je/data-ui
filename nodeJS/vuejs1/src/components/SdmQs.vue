<template>

<main id="main">
    <section id="content">
        <div id="qsList">
            <div class="qsTitle">
                <h2>문의</h2>
                <a href="javascript:questionWrite()">문의하기</a>
            </div>
            <div class="search_wrap">
                <input type="text" name="word" id="word">
            </div>
            <div class="qsList_box">
                <table>
                    <thead>
                        <th class="qsI">번호</th><th class="qsT">제목</th>
                        <th class="qsW">작성자</th><th class="qsD">작성일</th>
                        <th class="qsTo">답변</th>
                    </thead>
                    <tbody id="qs">
                        <tr v-for="q in qdata" :key="q.id" >
                            <td class="qsI">{{q.id}}</td>
                            <td class="qsT">{{q.title}}</td>
                            <td class="qsW">{{q.writer}}</td>
                            <td class="qsD">{{q.date}}</td>
                            <td class="qsTo">{{q.to == 0 ? '미확인':'답변완료'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <section id="side">

    </section>
</main>
</template>

<script>
import data from '@/assets/question.json';
const qdata= data;
export default {
    data(){
        return {qdata,}
    },
    name: 'SdmQs'
}
</script>

<style>
@import '@/assets/question.css';
/* css파일을 가져올 경우 import로 가져오지만 그 앞에 @를 붙여야 한다. 
css에서 따로 export를 하지 않아도 가능하다.
@는 절대경로를 의미한다.*/
</style>