<template>
    <section id="section">
        <div id="review_wrap">
            <b class="page_title">리뷰</b>
            <div class="review_con">
                <div class="main_content">
                    <div class="review_title">
                        <p class="title">별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...</p>
                        <div class="heart_wrap">
                            <i class="bi bi-heart" @click="toggleLike" :class="{ 'hidden': liked }"></i>
                            <i class="bi bi-heart-fill" @click="toggleLike" :class="{ 'hidden': !liked }"></i>
                            <div class="ani"></div>
                        </div>
                    </div>
                    <div class="write_info">
                        <div class="writer">귤까고뒹굴뒹굴</div>
                        <div class="write_d">2023.09.08</div>
                    </div>
                    <div class="con_detail">
                        <div class="p_box"><img class="poster" src="../images/img/잠.jpg" /></div>
                        <div class="movie_info">
                            <div class="movie_name">잠</div>
                            <div class="movie_release">2023.09.06 개봉</div>
                            <div class="movie_detail">
                                <div class="info_l">
                                    <p>감독</p>
                                    <p>출연</p>
                                    <p>장르</p>
                                    <p>러닝</p>
                                </div>
                                <div class="info_r">
                                    <p>유재선</p>
                                    <p>정유미, 이선균, 김금순</p>
                                    <p>호러 / 스릴러</p>
                                    <p>94분</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="review_text">
                        주변에서 재밌다고 추천해주길래 불금이기도 해서 바로 봤는데 이선균 연기 너무 잘하고 한 시도 긴장감을 늦출 수
                        없는 전개라 계속 손에 땀을 쥐고 봤네요.<br />팝콘 다 남기고 왔음 ㄹㅇ ㅋㅋㅋㅋㅋ
                    </p>
                    <div class="star_score">
                        <p class="star_rate">별점 5/5</p>
                        <div class="stars">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star"></i>
                        </div>
                    </div>
                    <div class="post_menu">
                        <div class="rePost">
                            <RouterLink to="/Rwrite">수정</RouterLink>
                        </div>
                        <div class="del" @click="postDel">삭제</div>
                        <div class="siren" @click="openSirenPopup">신고</div>
                    </div>
                </div>
            </div>
            <div class="reply_wrap">
                <div class="hReply">댓글 N</div>
                <div class="bReply">
                    <div class="write_reply">
                        <input type="text" placeholder="바른 말 고운 말, 함께 만드는 댓글 문화!">
                        <button class="reply_bt">등록하기</button>
                    </div>
                    <div class="reply" v-for="(reply, index) in replies" :key="index">
                        <div class="reply_info">
                            <div class="nickName">{{ reply.nickName }}</div>
                            <div class="wDate">{{ reply.date }}</div>
                        </div>
                        <div class="reply_text">
                            <i class="bi bi-exclamation-triangle"></i>
                            {{ reply.text }}
                        </div>
                    </div>
                    <div class="mReply_wrap">
                        <div class="mReply_box" v-for="(reply, index) in replies" :key="index">
                            <div class="mReply">
                                <span class="n_name">{{ reply.nickName }}</span>
                                {{ reply.text }}
                            </div>
                            <div class="mReply_menu">
                                <p class="rePost_reply">
                                    <RouterLink to="/Rwrite">수정</RouterLink>
                                </p>
                                <p class="del_reply" @click="() => deleteComment(index)">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'
import { inject, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
export default {
    setup() {
        const replies = ref([
            {
                nickName: '미녀광인',
                date: 'YYYY.MM.DD',
                text: '씨발...ㅈㄴ잠옴 다 광고임 추천한놈누구냐..'
            },
        ])
        const isSiren = inject('isSiren');
        const path = useRoute().path;
        watchEffect(() => {
            if (path == '/AdSign') isSiren.value = false;
            else isSiren.value = true;
        })
        return {
            router,
        };
    }
}
</script>
<style scoped>@import url('../assets/css/AdSirenPop.css');

.hidden {
    display: none;
}</style>