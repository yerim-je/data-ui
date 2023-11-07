<template>
    <div v-show="isTyping" id="resBox">
        <div v-for="value in searchRes" :key="value">
            <router-link :to="{ name: 'MovieTitle', query:{ movieName: value.제목 } }" class="searchWrap">
                <div class="posterWrap">
                    <img :src="value.포스터" alt="poster">
                </div>
                <div class="infoWrap">
                    <div class="title">
                        <strong>{{ value.제목 }}</strong>
                    </div>
                    <div class="onMobile">
                        <div class="director">
                            <strong>감독</strong><span>{{ value.감독 }}</span>
                        </div>
                        <div class="staring">
                            <div><strong>출연</strong></div>
                            <div><span v-for="name in value.배우">{{ name }}, </span></div>
                        </div>
                        <div class="genre">
                            <strong>장르</strong><span>{{ value.장르 }}</span>
                        </div>
                        <div class="time">
                            <strong>러닝</strong><span>{{ value.러닝타임 }}</span>
                        </div>
                        <div class="date">
                            <span>{{ value.개봉일 }}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <div v-for="value in searchRes2" :key="value">
            <router-link :to="{ name: 'ComingMovieTitle', query:{ movieComing: value.제목 } }" class="searchWrap">
                <div class="posterWrap">
                    <img :src="value.포스터" alt="poster">
                </div>
                <div class="infoWrap">
                    <div class="title">
                        <strong>{{ value.제목 }}</strong>
                    </div>
                    <div class="onMobile">
                        <div class="director">
                            <strong>감독</strong><span>{{ value.감독 }}</span>
                        </div>
                        <div class="staring">
                            <div><strong>출연</strong></div>
                            <div><span v-for="name in value.배우">{{ name }}, </span></div>
                        </div>
                        <div class="genre">
                            <strong>장르</strong><span>{{ value.장르 }}</span>
                        </div>
                        <div class="time">
                            <strong>러닝</strong><span>{{ value.러닝타임 }}</span>
                        </div>
                        <div class="date">
                            <span>{{ value.개봉일 }}</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { inject, watch, onMounted, ref } from 'vue';
export default {
    name: 'searchBar',
    setup() {
        const searchingStart = inject('searchingStart');

        const set = JSON.parse(localStorage.getItem('set'));
        const coming = JSON.parse(localStorage.getItem('coming'));
        const searchRes = ref('');
        const searchRes2 = ref('');
        const searchVal = inject('searchVal');
        const actors = ref('');
        const path = ref('');
        const isTyping = ref(false);

        onMounted(() => {
            watch(searchVal, (newVal, oldVal) => {
                let res = [];
                let res2 = [];
                if( newVal != '' ) isTyping.value = true;
                else isTyping.value = false;
                res = set.filter(function (item) {
                    return item.제목.indexOf(searchVal.value) > -1;
                });
                searchRes.value = res;
                res2 = coming.filter(function (item) {
                    return item.제목.indexOf(searchVal.value) > -1;
                });
                searchRes2.value = res2;
            });
        });

        return { searchingStart, set, searchRes, searchRes2, actors, path, isTyping };
    }
}
</script>

<style scoped>
@import url(./searchBar.css);
</style>