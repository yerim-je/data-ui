<template>
    <div id="wrap">
        <div id="content">
            <div class="account">
                <div class="info">
                    <p class="nickname">@활동명</p>
                    <a href="/MyReview" class="my_review">내가 쓴 리뷰보기 ></a>
                    <p class="email">email@email.com</p>
                    <a href="/PwCheck" class="change">회원정보 변경 ></a>
                </div>
                <div class="review">
                    <b>작성리뷰 수</b>
                    <p class="num">132개</p>
                </div>
                <div class="comment">
                    <b>작성 댓글 수</b>
                    <p class="num">32개</p>
                </div>
                <div class="like">
                    <b>좋아요 한 수</b>
                    <p class="num">1,024개</p>
                </div>
                <div class="mark">
                    <b>북마크 한 수</b>
                    <p class="num">10개</p>
                </div>
                <div class="sign_date">
                    <b>가입일</b>
                    <p class="num">2023.06.27</p>
                </div>
            </div>
            <div id="rec">
                <div class="title">
                    <b>이번 주의 추천영화</b>
                    <p>*추천영화는 활동 내역을 기반으로 매주 업데이트됩니다.</p>
                </div>
                <div class="slider">
                    <div class="slide-container">
                        <div class="slide" v-for="(movie, index) in recommendedMovies" :key="index">
                            <a href="" class="rec_movie">
                                <img class="poster" :src="movie.imgSrc" :alt="movie.altText">
                                <div class="summary">{{ movie.text }}</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="rec_history">
                <div class="title">
                    <b>추천영화 기록</b>
                    <p>*매주 업데이트됩니다.</p>
                </div>
                <div id="history_wrap">
                    <div class="card">
                        <a href="/RecHistory" class="card_n" v-for="card in 8" :key="card">
                            <div class="history">
                                <div class="thumbnail">
                                    <img src="../images/img/사도.jpg" alt="">
                                </div>
                                <div class="thumbnail">
                                    <img src="../images/img/어벤져스.jpg" alt="">
                                </div>
                                <div class="thumbnail">
                                    <img src="../images/img/왕의 남자.jpg" alt="">
                                </div>
                                <div class="thumbnail">
                                    <img src="../images/img/인어공주.jpg" alt="">
                                </div>
                            </div>
                            <span class="card_title">
                                <b>
                                    N월 N주<br>추천영화
                                </b>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import summaryFunction from '@/assets/js/info';

export default {
  mounted() {
    summaryFunction();
    },data() {
        return {
        recommendedMovies: [
            { imgSrc: '../src/images/img/어벤져스.jpg', altText: '어벤져스' ,text:'에너지원 ‘큐브’를 이용한 적의 등장으로 인류가 위험에 처하자 국제평화유지기구인 쉴드(SHIELD)의 국장 닉 퓨리(사무엘 L.잭슨)는 "어벤져스" 작전을 위해 전 세계에 흩어져 있던 슈퍼 히어로들을 찾아나선다. 아이언맨(로버트 다우니 주니어)부터 토르(크리스 헴스워스), 헐크(마크 러팔로), 캡틴 아메리카(크리스 에반스)는 물론, 쉴드의 요원인 블랙 위도우(스칼렛 요한슨), 호크 아이(제레미 레너)까지 최고의 슈퍼 히어로들이 어벤져스의 멤버로 모이게 되지만, 각기 개성이 강한 이들의 만남은 예상치 못한 방향으로 흘러가는데…'},
            { imgSrc: '../src/images/img/더 웨일.jpg', altText: '더 웨일' ,text:'“네가 얼마나 놀라운 사람인지 알려주고 싶었어”272kg의 거구로 세상을 거부한 채 살아가는 대학 강사 ‘찰리’는 남은 시간이 얼마 없음을 느끼고 오랫동안 만나지 못한 10대 딸 ‘엘리’를 집으로 초대한다. 그리고, 매일 자신을 찾아와 에세이 한 편을 완성하면 전 재산을 주겠다고 제안한다.'},
            { imgSrc: '../src/images/img/눈물이 주룩주룩.jpg', altText: '눈물이 주룩주룩' ,text:'레스토랑을 차리는 꿈을 향해 성실하게 하루하루를 지내던 21살의 요타로(츠마부키 사토시 분). 8살 난 꼬마였던 그 때, 어느 날 갑자기 "여동생"이 생겼다. 그 후 그의 생애를 희망으로 가득 채웠던 그녀가 고등학교에 입학하며 그와 한 집에 살겠다고 찾아왔다.  고등학교에 입학하며 오빠 집에서 같이 살게 된 여고생 카오루(나가사와 마사미 분). 하지만 그녀는 아무에게도 말하지 못한 비밀이 있다. 오빠는 그녀가 너무 어려서 기억하지 못할거라 믿고 있었지만, 그녀는 기억하고 있다. 그가 친오빠가 아니라는 것을. 오키나와의 눈부신 태양과 투명한 바다, 향기로운 바람, 색색깔의 꽃들. 평소 그냥 지나치던 모든 것들이 둘이 함께 하면서 더욱 아름답게 다가온다. 하지만, 하고 싶은 말을 마음 속으로만 삼키면서도 행복했던 그들의 시간을 방해하는 사건들이 벌어지는데.'},
            { imgSrc: '../src/images/img/모노노케 히메.jpg', altText: '모노노케 히메' ,text:''},
            { imgSrc: '../src/images/img/메기.jpg', altText: '메기' ,text:''},
            { imgSrc: '../src/images/img/인타임.jpg', altText: '인 타임' ,text:''},
            { imgSrc: '../src/images/img/캐롤.jpg', altText: '케롤' ,text:''},
            { imgSrc: '../src/images/img/인어공주.jpg', altText: '인어공주' ,text:''},
        ],
        };
    },
};
</script>

<style scoped>
@import url('../assets/css/info.css');
</style>