<template>
    <div id="title">
        신고 사유
    </div>
    <div id="wrap">
        <div>
            <input type="radio" id="abuse" name="siren" value="abuse">
            <label for="abuse">욕설, 비방, 차별, 혐오</label>
        </div>
        <div>
            <input type="radio" id="promotion" name="siren" value="promotion">
            <label for="promotion">홍보, 영리목적</label>
        </div>
        <div>
            <input type="radio" id="illegal" name="siren" value="illegal">
            <label for="illegal">불법정보</label>
        </div>
        <div>
            <input type="radio" id="lewd" name="siren" value="lewd">
            <label for="lewd">음란, 청소년 유해</label>
        </div>
        <div>
            <input type="radio" id="personal" name="siren" value="personal">
            <label for="personal">개인정보 노출, 금융 거래</label>
        </div>
        <div>
            <input type="radio" id="spam" name="siren" value="spam">
            <label for="spam">도배, 스팸</label>
        </div>
        <div>
            <input type="radio" id="etc" name="siren" value="etc" v-model="radioOption">
            <label for="etc">기타</label><br>
            <input type="text" id="etc" class="etcText" placeholder="신고사유를 적어주세요"
            v-if="radioOption === 'etc'">
        </div>
    </div>
    <div id="bt_wrap">
        <button class="cancel" @click="close">취소</button>
        <button class="registration" @click="ok">등록하기</button>
    </div>
</template>

<script>
import {useRouter, useRoute} from 'vue-router'
import {inject, watchEffect} from 'vue'
export default {
    data(){
        return{
            radioOption:'',
        }
    },
    methods: {
        close() {
            const sirenClose = window.close();
        },
        ok(){
            alert("신고가 왼료되었습니다.");
        }
    },
    setup(){
        const isSiren = inject('isSiren');
        const path = useRoute().path;
        watchEffect(()=>{
        if( path == '/Siren' ) isSiren.value = false;
        else isSiren.value = true;
        console.log(path);
        })
    }
};
</script>

<style>
*{margin:0;padding:0; box-sizing: border-box;}
#title{
    font-size:23px;
    width:100%;
    padding: 50px 30px;
    font-weight: 900;
}
#wrap{
    margin: 0 30px;
}
#wrap div{
    font-size:17px;
    padding:20px 0;
    border-bottom:1px solid #ccc;
}
#wrap div:first-child{
    border-top:1px solid #ccc;
}
#wrap div label{
    margin-left:10px;
}
.etcText{
    height:30px;
    border-radius:30px;
    outline:0;
    padding-left:20px;
    border:1px solid #ccc;
}
#bt_wrap{
    width:100%;
    display:flex;
    justify-content:space-evenly;
    margin:50px 0;
}
#bt_wrap button{
    font-size:17px;
    font-weight:700;
    padding:10px 30px;
    border-radius:10px;
    cursor: pointer;
}
.cancel{
    background:#fff;
    color:#B91646;
    border:2px solid #B91646;
}
.registration{
    background:#B91646;
    color:#fff;
    border:0;
}
</style>