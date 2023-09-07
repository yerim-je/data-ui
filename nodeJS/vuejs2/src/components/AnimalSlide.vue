
<script setup>
    defineProps({
        msg:{type:String, require:true},
        info:{type:Array,require:true}
    })
</script>

<template>
    <div class="slide">
        <h2>{{ msg }}</h2>
        <div class="slide_box">
            <div class="card" v-for="a in info" :key="a">
                <img src="">
                <p>{{a}}</p>
                <p>수컷</p>
            </div>
        </div>
    </div>
</template>


<style></style>