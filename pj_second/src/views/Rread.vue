<template>
    <section id="section">
        <div id="review_wrap">
            <b class="page_title">리뷰 게시판</b>
            <div class="review_con">
                <div class="main_content">
                    <div class="review_title">
                        <p class="title">별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...</p>
                        <i class="bi bi-heart"></i>
                    </div>
                    <div class="write_info">
                        <div class="writer">귤까고뒹굴뒹굴</div>
                        <div class="write_d">2023.09.08</div>
                    </div>
                    <div class="con_detail">
                        <img class="poster" src="../images/img/잠.jpg" />
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
                        <p>별점 5/5</p>
                        <div class="stars">
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                            <i class="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                <div class="post_menu">
                    <div class="rePost">수정</div>
                    <div class="del">삭제</div>
                    <div class="siren" @click="openSirenPopup">신고</div>
                </div>
            </div>
            <div class="reply_wrap">
                <div class="hReply">댓글 N</div>
                <div class="bReply">
                    <div class="write_reply">
                        <input type="text" placeholder="바른 말 고운 말, 함께 만드는 댓글 문화!">
                        <button class="reply_bt">등록하기</button>
                    </div>
                    <div class="reply">
                        <div class="reply_info">
                            <div class="nickName">로고스와미고스</div>
                            <div class="wDate">
                                YYYY.MM.DD
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">
                            저도 진짜 재밌게 봤는데 영화 많이 보신 분들한테는 좀 식상할 수도 있음
                        </div>
                    </div>
                    <div class="reply">
                        <div class="reply_info">
                            <div class="nickName">동과젤리</div>
                            <div class="wDate">
                                YYYY.MM.DD
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">
                            그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로
                        </div>
                    </div>
                    <div class="reply">
                        <div class="reply_info">
                            <div class="nickName">망고젤리</div>
                            <div class="wDate">
                                YYYY.MM.DD
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">
                            간만에 친구 만나서 같이 봤는데 생각했던 것보다 엄청 재밌어서 놀람 이선균이 이런 연기도 하네
                        </div>
                    </div>
                    <div class="reply">
                        <div class="reply_info">
                            <div class="nickName">우웅증말기환자</div>
                            <div class="wDate">
                                YYYY.MM.DD
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">
                            이제 무서워서 잠 어떻게 자는데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                        </div>
                    </div>
                    <div class="reply">
                        <div class="reply_info">
                            <div class="nickName">성현박사맘</div>
                            <div class="wDate">
                                YYYY.MM.DD
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">
                            몽유병이 진짜 같이 사는 사람끼리는 이보다 무서운 게 없는 병이거든요...<br>
                            뭔가 남 일 같지가 않아서 계속 손에 땀을 쥐면서 봤네요
                        </div>
                    </div>
                    <div class="reply">
                        <div class="reply_info">
                            <div class="nickName">바재부팅부</div>
                            <div class="wDate">
                                YYYY.MM.DD
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply">삭제</p>
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">
                            그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  methods: {
    openSirenPopup() {
      // sirenPop.vue를 열고, 부모 창으로부터 메시지를 받을 수 있도록 리스너 설정
      const sirenPopup = window.open('/Siren', '_blank', 'width=450,height=750');
      window.addEventListener('message', (event) => {
        // 팝업 창으로부터 메시지를 수신하면 이를 처리합니다.
        console.log('부모 창에서 수신한 메시지:', event.data);
      });
    },
  },
};
</script>

<style scoped>
@import url('../assets/css/Rread.css');
</style>