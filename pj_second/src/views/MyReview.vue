<template>
    <section id="section">
        <div class="content">
            <div class="title">내가 쓴 리뷰</div>
            <div class="review_wrap">
                <div class="mr_box">
                    <a href="/Rread" class="view" v-for="(review, index) in reviews" :key="index">
                        <img class="poster" :src="review.img" />
                        <div class="myreview">
                            <div class="m_title">{{ review.mTitle }}</div>
                            <div class="r_title">{{ review.rTitle }}</div>
                            <div class="r_con">{{ review.rCon }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
      return {
        reviews: [
          {
            img: '../src/images/img/잠.jpg',
            mTitle: '잠',
            rTitle: '별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...',
            rCon: '주변에서 재밌다고 추천해주길래 불금이기도 해서 바로 봤는데 이선균 연기 너무 잘하고 한 시도 긴장감을 늦출수 없는 전개라 계속 손에 땀을 쥐고 봤네요.팝콘 다 남기고 왔음 ㄹㅇ ㅋㅋㅋㅋㅋ',
        },
        {
            img: '../src/images/img/잠.jpg',
            mTitle: '잠',
            rTitle: '별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...',
            rCon: '주변에서 재밌다고 추천해주길래 불금이기도 해서 바로 봤는데 이선균 연기 너무 잘하고 한 시도 긴장감을 늦출수 없는 전개라 계속 손에 땀을 쥐고 봤네요.팝콘 다 남기고 왔음 ㄹㅇ ㅋㅋㅋㅋㅋ',
          },
        {
            img: '../src/images/img/잠.jpg',
            mTitle: '잠',
            rTitle: '별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...',
            rCon: '주변에서 재밌다고 추천해주길래 불금이기도 해서 바로 봤는데 이선균 연기 너무 잘하고 한 시도 긴장감을 늦출수 없는 전개라 계속 손에 땀을 쥐고 봤네요.팝콘 다 남기고 왔음 ㄹㅇ ㅋㅋㅋㅋㅋ',
          },
        {
            img: '../src/images/img/잠.jpg',
            mTitle: '잠',
            rTitle: '별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...',
            rCon: '주변에서 재밌다고 추천해주길래 불금이기도 해서 바로 봤는데 이선균 연기 너무 잘하고 한 시도 긴장감을 늦출수 없는 전개라 계속 손에 땀을 쥐고 봤네요.팝콘 다 남기고 왔음 ㄹㅇ ㅋㅋㅋㅋㅋ',
          },
        {
            img: '../src/images/img/잠.jpg',
            mTitle: '잠',
            rTitle: '별 기대 안 하고 가볍게 봤는데 진짜 대박이네요...',
            rCon: '주변에서 재밌다고 추천해주길래 불금이기도 해서 바로 봤는데 이선균 연기 너무 잘하고 한 시도 긴장감을 늦출수 없는 전개라 계속 손에 땀을 쥐고 봤네요.팝콘 다 남기고 왔음 ㄹㅇ ㅋㅋㅋㅋㅋ',
          },
        ],
      };
    },
  };
  </script>

<style>
@import url('../assets/css/MyReview.css');
</style>


