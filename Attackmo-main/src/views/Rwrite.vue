<template>
    <section id="section">
        <div id="wrap">
            <p id="title">리뷰 작성하기</p>
            <div class="content">
                <div class="t_input">
                    <label>제목</label>
                    <input type="text" id="t_input" name="t_input" placeholder="제목을 입력해주세요">
                </div>
                <div class="select_m">
                    <label>영화</label>
                    <input type="text"
                        id="search_m"
                        v-model="searchQuery"
                        placeholder="영화제목을 입력해주세요"
                        @focus="showSearchResult"
                        />
                        <i @click="hideSearchResult" v-show="isSearchResultVisible" class="bi bi-x-circle"></i>
                    <div class="search-result" v-show="isSearchResultVisible">
                        <div class="movie_p" v-for="movie in filteredMovies" :key="movie.제목">
                            <img :src="movie.포스터" alt="Movie Poster" @click="selectMovie(movie.제목)"/>
                            <p>{{ movie.제목 }}</p>
                        </div>
                    </div>
                </div>
                <div id="star">
                    <p>별점</p>
                    <div class="dv-rate">
                        <input type="radio" id="star5" value="5" name="rb_star" />
                        <label for="star5" title="5">
                            <i class="bi bi-star-fill"></i>
                        </label>
                        <input type="radio" id="star4" value="4" name="rb_star" />
                        <label for="star4" title="4">
                            <i class="bi bi-star-fill"></i>
                        </label>
                        <input type="radio" id="star3" value="3" name="rb_star" />
                        <label for="star3" title="3">
                            <i class="bi bi-star-fill"></i>
                        </label>
                        <input type="radio" id="star2" value="2" name="rb_star" />
                        <label for="star2" title="2">
                            <i class="bi bi-star-fill"></i>
                        </label>
                        <input type="radio" id="star1" value="1" name="rb_star" />
                        <label for="star1" title="1">
                            <i class="bi bi-star-fill"></i>
                        </label>
                    </div>
                </div>
                <div id="movie_point">
                    <p>감상포인트</p>
                    <div class="point_wrap">
                        <div class="point">
                            <input type="checkbox" name="art" id="art" class="pointInput">
                            <label for="art" class="ckeM">작품성</label>
                        </div>
                        <div class="point">
                            <input type="checkbox" name="fun" id="fun" class="pointInput">
                            <label for="fun" class="ckeM">오락성</label>
                        </div>
                        <div class="point">
                            <input type="checkbox" name="ost" id="ost" class="pointInput">
                            <label for="ost" class="ckeM">음악</label>
                        </div>
                        <div class="point">
                            <input type="checkbox" name="act" id="act" class="pointInput">
                            <label for="act" class="ckeM">연기력</label>
                        </div>
                        <div class="point">
                            <input type="checkbox" name="direct" id="direct" class="pointInput">
                            <label for="direct" class="ckeM">연출력</label>
                        </div>
                    </div>
                </div>
                <div id="detail_input">
                    <label>내용</label>
                    <textarea name="de_con" id="de_con" style="resize:none"></textarea>
                </div>
                <div id="bt_wrap">
                    <RouterLink to="/ReviewBoard/:1"><button>취소</button></RouterLink>
                    <button>등록하기</button>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { ref, computed, onMounted ,watch } from 'vue';
import selectMovie from '../views/SelectM.vue'; // selectMovie 컴포넌트를 가져옵니다.

export default {
    name: 'ReviewForm',
    components: { // components 속성을 사용하여 selectMovie 컴포넌트를 등록합니다.
        selectMovie,
    },
    setup() {
        const set = JSON.parse(localStorage.getItem('set'));
        const searchQuery = ref('');
        const isSearchResultVisible = ref(false);

        const filteredMovies = computed(() => {
            const word = searchQuery.value.trim().toLowerCase();
            return set.filter(movie => movie.제목.toLowerCase().includes(word));
        });

        const showSearchResult = () => {
            isSearchResultVisible.value = true;
            // 검색 결과 컨테이너가 다시 표시되면 스크롤을 초기화
            const searchResultContainer = document.querySelector('.search-result');
            if (searchResultContainer) {
                searchResultContainer.scrollTop = 0;
            }
        };

        const hideSearchResult = () => {
            searchQuery.value = '';
            isSearchResultVisible.value = false;
        }

        const selectMovie = (title) => {
            searchQuery.value = title;
            isSearchResultVisible.value = false;
        }
        
        onMounted(() => {
            $("#search_m").on("keyup", function () {
                searchQuery.value = $(this).val();
            });
        });

        return {
            searchQuery,
            filteredMovies,
            isSearchResultVisible,
            showSearchResult,
            hideSearchResult,
            set, selectMovie,
        };
    },
};
</script>
<style scoped>
@import url('../assets/css/writeReview.css');
</style>