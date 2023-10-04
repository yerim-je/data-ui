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
                        @blur="hideSearchResult"
                    />
                    <div class="search-result" v-show="isSearchResultVisible">
                        <div class="movie_p" v-for="movie in filteredMovies" :key="movie">
                            <img :src="getImageUrl(movie)" alt="Movie Poster" />
                            <p>{{ movie }}</p>
                        </div>
                    </div>
                </div>
                <div id="star">
                    <p>별점</p>
                    <div class="dv-rate">
                        <input type="radio" id="star5" value="5" name="rb_star" />
                        <label for="star5" title="5">5</label>
                        <input type="radio" id="star4" value="4" name="rb_star" />
                        <label for="star4" title="4">4</label>
                        <input type="radio" id="star3" value="3" name="rb_star" />
                        <label for="star3" title="3">3</label>
                        <input type="radio" id="star2" value="2" name="rb_star" />
                        <label for="star2" title="2">2</label>
                        <input type="radio" id="star1" value="1" name="rb_star" />
                        <label for="star1" title="1">1</label>
                    </div>
                </div>
                <div id="movie_point">
                    <p>감상포인트</p>
                    <div class="point_wrap">
                        <div class="point artpoint">
                            <label for="art">작품성</label>
                            <input type="checkbox" v-model="checkboxes[0]" @change="checkSelections" name="art" id="art">
                        </div>
                        <div class="point funpoint">
                            <label for="fun">오락성</label>
                            <input type="checkbox" v-model="checkboxes[1]" @change="checkSelections" name="fun" id="fun">
                        </div>
                        <div class="point ostpoint">
                            <label for="ost">음악</label>
                            <input type="checkbox" v-model="checkboxes[2]" @change="checkSelections" name="ost" id="ost">
                        </div>
                        <div class="point artpoint">
                            <label for="act">연기력</label>
                            <input type="checkbox" v-model="checkboxes[3]" @change="checkSelections" name="act" id="act">
                        </div>
                        <div class="point directpoint">
                            <label for="direct">연출력</label>
                            <input type="checkbox" v-model="checkboxes[4]" @change="checkSelections" name="direct" id="direct">
                        </div>
                    </div>
                </div>
                <div id="detail_input">
                    <label>내용</label>
                    <textarea name="de_con" id="de_con" style="resize:none"></textarea>
                </div>
            </div>
            <div id="bt_wrap">
                <button>취소</button>
                <button>등록하기</button>
            </div>
        </div>
    </section>
</template>


<script>
import { ref, computed, onMounted } from 'vue';
import selectMovie from '../views/SelectM.vue'; // selectMovie 컴포넌트를 가져옵니다.

export default {
    name: 'ReviewForm',
    components: { // components 속성을 사용하여 selectMovie 컴포넌트를 등록합니다.
        selectMovie,
    },
    setup() {
        const m_name =["1947 보스톤","가디언즈","공조2_인터내셔날","나를 찾아줘","나를 찾아줘(한국)","나이브스 아웃",
                "내부자들_디 오리지널","노 바디","눈물이 주룩주룩","더 랍스터","더 문","더 웨일","더 킹","데드 풀","독전","드림",
                "레이니데이 인 뉴욕","메기","모노노케 히메","미션 임파서블_데드 레코닝 part one","범죄도시3","빅 쇼트","사도","상견니",
                "소울","신세계","아메리칸 사이코","아바타_물의 길","아저씨","어벤져스_엔드게임","어벤져스","업","엘리멘탈","여름을 향한 터널, 이별의 출구",
                "연애 빠진 로맨스","왕의 남자","인생은 아름다워","인어공주","인타임","잠","존 윅_리로드","지푸라기라도 잡고 싶은 짐승들","천박사 퇴마 연구소_설경의 비밀",
                "친절한 금자씨","캐롤","타겟","토르_천둥의 신","토이스토리4"];
        const searchQuery = ref('');
        const checkboxes = ref([false, false, false, false, false]); // 체크박스 선택 상태를 저장하는 배열

        const getImageUrl = (movie) => {
            return `../src/images/img/${movie}.jpg`;
        };

        const isSearchResultVisible = ref(false);

        const filteredMovies = computed(() => {
            const word = searchQuery.value.trim().toLowerCase();
            return m_name.filter(movie => movie.toLowerCase().includes(word));
        });

        const showSearchResult = () => {
            isSearchResultVisible.value = true;
        };

        const hideSearchResult = () => {
            isSearchResultVisible.value = false;
        };

        onMounted(() => {
            $("#search_m").on("keyup", function () {
                searchQuery.value = $(this).val();
            });
        });

        const checkSelections = () => {
            const selectedCount = checkboxes.value.filter(checked => checked).length;
            // 3개 이상을 선택한 경우 체크박스를 다시 선택하지 못하도록 해제
            if (selectedCount >= 2) {
                if (selectedCount > 2) {
                    alert('2개 이상의 체크박스가 선택되었습니다.');
                }
                checkboxes.value = checkboxes.value.map((checked, index) => {
                    // 이미 선택된 체크박스 중에서 다른 체크박스 1개만 선택되도록 유지
                    if (checked && selectedCount > 2) {
                        return false;
                    }
                    return checked;
                });
            }
        };

        return {
            searchQuery,
            filteredMovies,
            isSearchResultVisible,
            showSearchResult,
            hideSearchResult,
            getImageUrl,
            checkboxes, // 체크박스 상태 배열을 반환합니다.
            checkSelections, // 체크박스 선택 검사 메서드를 반환합니다.
        };
    },
};
</script>
<style>
@import url('../assets/css/writeReview.css');
</style>