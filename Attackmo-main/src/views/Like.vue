<template>
  <section id="section">
    <div id="like_wrap">
      <p class="like_title">
         좋아한 리뷰
      </p>
      <div class="review_wrap">
        <div class="r_box">
          <RouterLink to="/Rread" class="review" v-for="(review, index) in randomReviews" :key="index" @mouseover="showReview(index)" @mouseleave="hideReview()">
            <div class="likeReview" :class="{ 'active': showReviewIndex === index }">
              <p class="user">@활동명</p>
              <p class="review_l">{{ review.줄거리 }}</p>
            </div>
            <img :src="review.포스터" :alt="review.제목">
          </RouterLink>
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
    const data = JSON.parse(localStorage.getItem('set'));

    const showReviewIndex = ref(null);

    const showReview = (index) => {
      showReviewIndex.value = index;
    };

    const hideReview = () => {
      showReviewIndex.value = null;
    };

    const randomReviews = ref([]);
    for (let i=0; i<12; i++){
      const randomIndex = Math.floor(Math.random() * data.length);
      randomReviews.value.push(data[randomIndex]);
    }

    return {
      randomReviews,
      showReviewIndex,
      showReview,
      hideReview,
    };
  },
};
</script>

<style scoped>
@import url('../assets/css/like.css');
</style>