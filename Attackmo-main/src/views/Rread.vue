<template>
    <section id="section">
        <div id="review_wrap">
            <b class="page_title">리뷰</b>
            <div class="review_con">
                <div class="main_content">
                    <div class="review_title">
                        <p class="title">별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...</p>
                        <div class="heart_wrap">
                            <i class="bi bi-heart" @click="toggleLike" :class="{ 'hidden' : liked }"></i>
                            <i class="bi bi-heart-fill" @click="toggleLike" :class="{ 'hidden' : !liked }"></i>
                            <div class="ani"></div>
                        </div>
                    </div>
                    <div class="write_info">
                        <div class="writer">귤까고뒹굴뒹굴</div>
                        <div class="write_d">2023.09.08</div>
                    </div>
                    <div >
                        <RouterLink to="/MovieTitle" class="con_detail">
                            <div class="p_box">
                                <img class="poster" src="../images/img/잠.jpg" />
                            </div>
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
                        </RouterLink>
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
                        <div class="rePost">수정</div>
                        <div class="del" @click="postDel">삭제</div>
                        <div class="siren" @click="openSirenPopup">신고</div>
                    </div>
                    <div class="mPost_menu">
                        <div class="rePost">수정</div>
                        <div class="del" @click="postDel">삭제</div>
                        <div class="siren" @click="openSirenModal">신고</div>
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
                    <div class="reply" v-for="(reply, index) in displayedReplies" :key="index">
                        <div class="reply_info">
                            <div class="reply_box">
                                <div class="nickName">{{ reply.nickName }}</div>
                                <div class="wDate">{{ reply.date }}</div>
                            </div>
                            <div class="reply_menu">
                                <p class="rePost_reply">수정</p>|
                                <p class="del_reply" @click="() => deleteComment(index)">삭제</p>|
                                <p class="siren_reply" @click="openSirenPopup">신고</p>
                            </div>
                        </div>
                        <div class="reply_text">{{ reply.text }}</div>
                    </div>
                    <div class="mReply_wrap">
                        <div class="mReply_box" v-for="(reply, index) in displayedReplies" :key="index">
                            <div class="mReply">
                                <span class="n_name">{{ reply.nickName }}</span>
                                {{ reply.text }}
                            </div>
                            <div class="mReply_menu">
                                <p class="rePost_reply">수정</p>
                                <p class="del_reply" @click="() => deleteComment(index)">삭제</p>
                                <p class="siren_reply" @click="openSirenModal">신고</p>
                            </div>
                        </div>
                    </div>
                    <div id="moreComment" @click="loadMore">이전 댓글 더보기 <i class="bi bi-chat-dots"></i></div>
                </div>
            </div>
            <div class="sirenModal" v-if="isModalOpen">
                <div class="modal-content">
                    <div id="title">신고 사유</div>
                    <div id="wrap">
                        <div v-for="reason in sirenReasons" :key="reason.id">
                        <input type="radio" :id="reason.id" :name="reason.name" :value="reason.value" v-model="selectedReason" />
                        <label :for="reason.id">{{ reason.label }}</label>
                        </div>
                        <input type="text" class="etcText" v-model="etcReason" v-if="selectedReason === 'etc'" />
                    </div>
                    <div id="bt_wrap">
                        <button class="cancel" @click="closeModal">취소</button>
                        <button class="registration" @click="submitReport">등록하기</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter} from 'vue-router';

const liked = ref(false)
const isModalOpen = ref(false)
const router = useRouter();
const comments = ref([]);
const commentIndex = ref(0);
const displayedReplies = ref([]);
const commentsToShow = 10;
const selectedReason = ref('');
const etcReason = ref('');

const toggleLike = () => {
    const ani = document.querySelector('.ani');
    ani.classList.toggle('ani_active');
    liked.value = !liked.value
}

const replies = ref([
    {
        nickName:'로고와스미스',
        date:'YYYY.MM.18',
        text:'저도 진짜 재밌게 봤는데 영화 많이 보신분들한테는 좀 식상할 수도 있음'
    },
    {
        nickName:'동과젤리',
        date:'YYYY.MM.18',
        text:'그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로'
    },
    {
        nickName:'망고젤리',
        date:'YYYY.MM.18',
        text:'간만에 친구 만나서 같이 봤는데 생각했던 것보다 엄청 재밌어서 놀람 이선균이 이런 연기도 하네'
    },
    {
        nickName:'우웅증말기환자',
        date:'YYYY.MM.19',
        text:'이제 무서워서 잠 어떻게 가는데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        nickName:'성현박사맘',
        date:'YYYY.MM.19',
        text:'몽유병이 진짜 같이 사는 사람끼리는 이보다 무서운게 없는 병이거든요... 뭔가 남 일 같지 않아서 계속 손에 땀을 쥐면서 봤네요...'
    },
    {
        nickName:'바재부팅부',
        date:'YYYY.MM.19',
        text:'나도 혹시 자는 중에 이러는거 아닌가 싶어서 무서워지네'
    },
    {
        nickName:'로고와스미스',
        date:'YYYY.MM.19',
        text:'저도 진짜 재밌게 봤는데 영화 많이 보신분들한테는 좀 식상할 수도 있음'
    },
    {
        nickName:'동과젤리',
        date:'YYYY.MM.19',
        text:'그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로'
    },
    {
        nickName:'망고젤리',
        date:'YYYY.MM.19',
        text:'간만에 친구 만나서 같이 봤는데 생각했던 것보다 엄청 재밌어서 놀람 이선균이 이런 연기도 하네'
    },
    {
        nickName:'우웅증말기환자',
        date:'YYYY.MM.19',
        text:'이제 무서워서 잠 어떻게 가는데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        nickName:'성현박사맘',
        date:'YYYY.MM.20',
        text:'몽유병이 진짜 같이 사는 사람끼리는 이보다 무서운게 없는 병이거든요... 뭔가 남 일 같지 않아서 계속 손에 땀을 쥐면서 봤네요...'
    },
    {
        nickName:'바재부팅부',
        date:'YYYY.MM.20',
        text:'나도 혹시 자는 중에 이러는거 아닌가 싶어서 무서워지네'
    },
    {
        nickName:'로고와스미스',
        date:'YYYY.MM.20',
        text:'저도 진짜 재밌게 봤는데 영화 많이 보신분들한테는 좀 식상할 수도 있음'
    },
    {
        nickName:'동과젤리',
        date:'YYYY.MM.20',
        text:'그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로'
    },
    {
        nickName:'망고젤리',
        date:'YYYY.MM.21',
        text:'간만에 친구 만나서 같이 봤는데 생각했던 것보다 엄청 재밌어서 놀람 이선균이 이런 연기도 하네'
    },
    {
        nickName:'우웅증말기환자',
        date:'YYYY.MM.21',
        text:'이제 무서워서 잠 어떻게 가는데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        nickName:'성현박사맘',
        date:'YYYY.MM.21',
        text:'몽유병이 진짜 같이 사는 사람끼리는 이보다 무서운게 없는 병이거든요... 뭔가 남 일 같지 않아서 계속 손에 땀을 쥐면서 봤네요...'
    },
    {
        nickName:'바재부팅부',
        date:'YYYY.MM.21',
        text:'나도 혹시 자는 중에 이러는거 아닌가 싶어서 무서워지네'
    },
    {
        nickName:'로고와스미스',
        date:'YYYY.MM.21',
        text:'저도 진짜 재밌게 봤는데 영화 많이 보신분들한테는 좀 식상할 수도 있음'
    },
    {
        nickName:'동과젤리',
        date:'YYYY.MM.21',
        text:'그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로'
    },
    {
        nickName:'망고젤리',
        date:'YYYY.MM.22',
        text:'간만에 친구 만나서 같이 봤는데 생각했던 것보다 엄청 재밌어서 놀람 이선균이 이런 연기도 하네'
    },
    {
        nickName:'우웅증말기환자',
        date:'YYYY.MM.22',
        text:'이제 무서워서 잠 어떻게 가는데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        nickName:'성현박사맘',
        date:'YYYY.MM.22',
        text:'몽유병이 진짜 같이 사는 사람끼리는 이보다 무서운게 없는 병이거든요... 뭔가 남 일 같지 않아서 계속 손에 땀을 쥐면서 봤네요...'
    },
    {
        nickName:'바재부팅부',
        date:'YYYY.MM.22',
        text:'나도 혹시 자는 중에 이러는거 아닌가 싶어서 무서워지네'
    },
    {
        nickName:'로고와스미스',
        date:'YYYY.MM.22',
        text:'저도 진짜 재밌게 봤는데 영화 많이 보신분들한테는 좀 식상할 수도 있음'
    },
    {
        nickName:'동과젤리',
        date:'YYYY.MM.23',
        text:'그럭저럭 나쁘진 않았는데 예고편에 나온 것만큼 대단하진 않았던 걸로'
    },
    {
        nickName:'망고젤리',
        date:'YYYY.MM.23',
        text:'간만에 친구 만나서 같이 봤는데 생각했던 것보다 엄청 재밌어서 놀람 이선균이 이런 연기도 하네'
    },
    {
        nickName:'우웅증말기환자',
        date:'YYYY.MM.23',
        text:'이제 무서워서 잠 어떻게 가는데 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
    },
    {
        nickName:'성현박사맘',
        date:'YYYY.MM.23',
        text:'몽유병이 진짜 같이 사는 사람끼리는 이보다 무서운게 없는 병이거든요... 뭔가 남 일 같지 않아서 계속 손에 땀을 쥐면서 봤네요...'
    },
    {
        nickName:'바재부팅부',
        date:'YYYY.MM.23',
        text:'나도 혹시 자는 중에 이러는거 아닌가 싶어서 무서워지네'
    },
]);

const sirenReasons = [
  { id: 'abuse', name: 'siren', value: 'abuse', label: '욕설, 비방, 차별, 혐오' },
  { id: 'promotion', name: 'siren', value: 'promotion', label: '홍보, 영리목적' },
  { id: 'illegal', name: 'siren', value: 'illegal', label: '불법정보' },
  { id: 'lewd', name: 'siren', value: 'lewd', label: '음란, 청소년 유해' },
  { id: 'personal', name: 'siren', value: 'personal', label: '개인정보 노출, 금융 거래' },
  { id: 'spam', name: 'siren', value: 'spam', label: '도배, 스팸' },
  { id: 'etc', name: 'siren', value: 'etc', label: '기타' },
];
displayedReplies.value = replies.value.slice(0, commentsToShow);


const isLogin = inject('isLogin');

const openSirenPopup = () => {
    if( isLogin.value == true ){
        const sirenPopup = window.open('/Siren', '_blank', 'width=450,height=750,top=100px,left=700px');
        window.addEventListener('message', (event) => {
            console.log('부모 창에서 수신한 메시지:', event.data);
        });
    }else{
        alert('로그인이 필요한 서비스입니다.')
        router.push('/login');
    }
}

const openSirenModal = () => {
    if(isLogin.value){
        isModalOpen.value=true;
    }else{
        alert('로그인이 필요한 서비스입니다.')
        router.push('/login');
    }
}
const closeModal = () => {
    isModalOpen.value = false;
}

const deleteComment = (index) => {
    if (isLogin.value) {
        if (confirm('댓글을 삭제하시겠습니까?')) {
            replies.value.splice(index, 1);
            alert('댓글이 삭제되었습니다.');
        }
    } else {
        alert('로그인이 필요한 서비스입니다.');
        router.push('/login');
    }
}

const postDel = () => {
    if(isLogin.value){
        if(confirm('리뷰를 삭제하시겠습니까?')){
            alert('리뷰가 삭제되었습니다.')
        }
    }else{
        alert('로그인이 필요한 서비스 입니다.')
        router.push('/login');
    }
}

const sortedReplies = ref(replies.value.slice());

displayedReplies.value = sortedReplies.value.slice(-commentsToShow).reverse(); // 역순으로 처음에 보여줄 댓글 설정

function loadMore() {
  const startIndex = displayedReplies.value.length;
  const endIndex = startIndex + commentsToShow;

  if (startIndex < sortedReplies.value.length) {
    const newReplies = sortedReplies.value.slice(-endIndex, -startIndex).reverse(); // 역순으로 댓글 로드
    displayedReplies.value = displayedReplies.value.concat(newReplies);
  }
}
</script>

<style scoped>
@import url('../assets/css/Rread.css');
</style>