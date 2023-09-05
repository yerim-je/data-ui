<template>
    <main>
        <section id="content">
            <div id="top">
                <h2 class="m_title">DRESS SHOP</h2>
                <img src="https://cdn.pixabay.com/photo/2019/05/24/18/41/marriage-4226896_1280.jpg" alt="메인 드레스사진">
            </div>
            <div id="middle">
                <ul id="dress_wrap">
                    <li v-for="d in dData" :key="d.img">
                        <img :src="require(`@/assets/dress${d.img}.jpg`)" alt="">
                        <div class="shop">{{ d.shop }}</div>
                        <div class="time">영업시간 : {{ d.time }}</div>
                        <div class="addr">주소 : {{ d.addr }}</div>
                    </li>
                </ul>
            </div>
        </section>
        <section id="side">
            <div class="login_bt"><a href="/login">로그인</a></div>
        </section>
    </main>

</template>


<script>
import data from '@/assets/dress.json';
const dData= data;
export default {
    data(){
        return {dData,}
    },
    name: 'SdmQs'
}
</script>


<style>
@import '@/assets/dress.css';
</style>