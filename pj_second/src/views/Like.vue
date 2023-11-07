<template>
    <section id="section">
        <div id="like_wrap">
            <p class="like_title">
                좋아한 리뷰
            </p>
            <div class="review_wrap">
                <div class="r_box">
                    <a href="/Rread" class="review" v-for="(review, index) in reviews" :key="index" @mouseover="showReview(index)" @mouseleave="hideReview()">
                        <div class="likeReview" :class="{ 'active': showReviewIndex === index }">
                            <p class="user">@활동명</p>
                            <p class="review_l">{{ review.text }}</p>
                        </div>
                        <img :src="review.image" alt="">
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Like',
  setup() {
    const reviews = ref([
      { text: '남자가 쓰레기도 쓰레기지만 여자도 제정신은 아닌듯...', image: '../src/images/img/나를 찾아줘.jpg' },
      { text: '이선생의 정체는 좀 뻔했지만 재밌었다', image: '../src/images/img/독전.jpg' },
      { text: '진실을 마주한 다음 나의 태도를 어떻게 취하는 것이 좋을까', image: '../src/images/img/메기.jpg' },
      { text: '"광고 보고 오셨나요? 문제 일으키지 마세요."', image: '../src/images/img/아메리칸 사이코.jpg' },
      { text: '이런 상상은 도대체 어떤 생각을 해야 나오는 것인가', image: '../src/images/img/인타임.jpg' },
      { text: '남색에만 미쳐있는 왕의 무책임으로 인해 몇 명이 죽은거냐', image: '../src/images/img/왕의 남자.jpg' },
      { text: '작스럽게 내 맘대로 안 되는 것이 좋은 의미일까. 아닐까. 정답은 없다. 빗소리와 선율을 듣기 전까지는 말이다.', image: '../src/images/img/레이니데이 인 뉴욕.jpg' },
      { text: '“네가 얼마나 놀라운 사람인지 알려주고 싶었어”', image: '../src/images/img/더 웨일.jpg' },
      // 다른 리뷰들을 여기에 추가합니다.
    ]);

    const showReviewIndex = ref(null);

    const showReview = (index) => {
      showReviewIndex.value = index;
    };

    const hideReview = () => {
      showReviewIndex.value = null;
    };

    return {
      reviews,
      showReviewIndex,
      showReview,
      hideReview,
    };
  },
};
</script>

<style>
@import url('../assets/css/like.css');
</style>