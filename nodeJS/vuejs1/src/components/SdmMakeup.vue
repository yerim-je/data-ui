<template>
    <main>
        <section>
            <div id="makeup_title">
                <h2>BEST MAKEUP SHOP</h2>
            </div>
            <div id="middle">
                <ul id="makeup_wrap">
                    <li v-for="m in mData" :key="m.img">
                        <img :src="require(`@/assets/makeup${m.img}.jpg`)">
                        <div class="shop">{{ m.shop }}</div>
                        <div class="price">{{ m.pir }}</div>
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
const mData = [
    {"img":1,"shop":"비올","pir":"가격문의"},
    {"img":2,"shop":"이엘","pir":"가격문의"},
    {"img":3,"shop":"요닝","pir":"가격문의"},
    {"img":4,"shop":"아름보다","pir":"가격문의"},
    {"img":5,"shop":"에이치샵","pir":"가격문의"},
    {"img":6,"shop":"밈.mimm","pir":"가격문의"}
];
export default{
    data(){
        return {mData,}
    },
    name:'SdmMakeup',
}
</script>

<style>
@import '@/assets/makeup.css';
</style>