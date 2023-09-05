<template>
    <main>
        <div id="makeup_title">
            <h2>BEST MAKEUP SHOP</h2>
        </div>
        <div id="middle">
            <ul id="dress_wrap">
                <li v-for="m in mData" :key="m.img">
                    <img :src="require(`@/assets/makeup${m.img}.jpg`)" alt="">
                    <div class="shop">{{ m.shop }}</div>
                    <div class="price">{{ m.pir }}</div>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
import data from '@/assets/makeup.json';
const mData = data;
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