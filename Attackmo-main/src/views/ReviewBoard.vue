<template>
    <section id="section">
        <div id="wrap">
            <p id="title">리뷰게시판</p>
            <RouterLink to="/Rwrite" id="write">
                <i class="bi bi-pencil-square"></i>
            </RouterLink>
            <div class="main">
                <div id="search_box">
                    <input @keyup="filteredReviews" type="text" id="search" placeholder="검색어를 입력해주세요" />
                    <i class="bi bi-search"></i>
                </div>
                <table class="list">
                    <thead>
                        <tr>
                            <td class="n">번호</td>
                            <td class="T">제목</td>
                            <td class="w">작성자</td>
                            <td class="d">날짜</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="con" v-for="(item, index) in showList" :key="index">
                            <td class="n">{{ index + 1 + startIndex }}</td>
                            <td class="t">
                                <RouterLink to='/Rread'>{{ item.rTitle }}</RouterLink>
                            </td>
                            <td class="w">{{ item.rWriter }}</td>
                            <td class="d">{{ item.rDate }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="mobileList">
                    <div class="post" v-for="(item, index) in showList" :key="index">
                        <div class="m_t">
                            <RouterLink to='/Rread'>{{ item.rTitle }}</RouterLink>
                        </div>
                        <div class="m_w">{{ item.rWriter }}</div>
                        <div class="m_d">{{ item.rDate }}</div>
                    </div>
                </div>
            </div>
            <div class="page_list">
                <div class="arrowBox">
                    <i class="bi bi-chevron-double-left" @click="firstPage"></i>
                    <i class="bi bi-chevron-left" @click="prevPage"></i>
                </div>
                <div class="pageNumbers"></div>
                <div class="arrowBox">
                    <i class="bi bi-chevron-right" @click="nextPage"></i>
                    <i class="bi bi-chevron-double-right" @click="lastPage"></i>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';

export default {
    setup() {
        let list = reactive([
            { rTitle: '리뷰 처음 써보는데 이 영화 괜찮네요', rWriter: '귤먹고 뒹굴뒹굴', rDate: '2021.12.31' },
            { rTitle: '오랜만에 봐도 좋은 영화..', rWriter: '아이언맨', rDate: '2022.01.01' },
            { rTitle: '이건 안보면 영화광이라고 말할 수 없는', rWriter: '스칼렛', rDate: '2022.01.01' },
            { rTitle: '어떻게 연기를 이렇게 살벌하게 하시는지', rWriter: '마크야', rDate: '2022.01.01' },
            { rTitle: '어떻게 연기를 이렇게 살벌하게 하시는지', rWriter: '마크야', rDate: '2022.01.01' },
            { rTitle: '배우들 연기만 봐도 티켓값은 확실히 챙기는 영화임', rWriter: '마크야', rDate: '2022.01.01' },
            { rTitle: '어떻게 연기를 이렇게 살벌하게 하시는지', rWriter: '마크야', rDate: '2022.01.01' },
            { rTitle: '배우라고 생각이 들지 않고 저 사람이 지금 실존하는 것 같네요..', rWriter: '체리', rDate: '2022.01.01' },
            { rTitle: '배우라고 생각이 들지 않고 저 사람이 지금 실존하는 것 같네요..', rWriter: '체리', rDate: '2022.01.01' },
            { rTitle: '휴...지가 굉장히 많이 필요한...', rWriter: '로키', rDate: '2022.01.01' },
            { rTitle: '마피아 막내아들인 내가 평범한 삶을 살다가 보스가 된 건에 대하여..', rWriter: '지켜본다', rDate: '2022.01.01' },
            { rTitle: '이거 보고 나서 복서가 꿈이에요..', rWriter: '만다린', rDate: '2022.01.01' },
            { rTitle: '마블 이넘들은 어디까지 가는겨', rWriter: '앱플', rDate: '2022.01.01' },
            { rTitle: '마블 이넘들은 어디까지 가는겨', rWriter: '앱플', rDate: '2022.01.01' },
            { rTitle: '내가 이제 마블을 못 보는 이유', rWriter: '앱플', rDate: '2022.01.01' },
            { rTitle: '마블 이넘들은 어디까지 가는겨', rWriter: '앱플', rDate: '2022.01.01' },
            { rTitle: '오토라는 남자는....', rWriter: '오토모', rDate: '2022.01.01' },
            { rTitle: '금자는 지금 행복할까', rWriter: '기아', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: 'skjjdk', rDate: '2022.01.02' },
            { rTitle: '이야 역시 봉준호', rWriter: '기생', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: 'skjjdk', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: 'ghkfehd', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: 'sndjc', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '디즈니광', rDate: '2022.01.02' },
            { rTitle: '얼마든지 우려먹어도 되니까 속편만 나와라', rWriter: '미키마우스', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '도날드덕', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '톰', rDate: '2022.01.02' },
            { rTitle: '대체 언제적 유니버스야', rWriter: '제리', rDate: '2022.01.02' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '스트로베리', rDate: '2022.01.03' },
            { rTitle: '대체 감독은 뭐 하는 사람이길래 이런 상상력을 ㄷㄷ', rWriter: '멜론', rDate: '2022.01.03' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '8월 15일', rDate: '2022.01.03' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '벨보이', rDate: '2022.01.03' },
            { rTitle: '도비는 이제 자유의 몸이에요', rWriter: '미녀광인', rDate: '2022.01.03' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '귤먹고 뒹굴뒹굴', rDate: '2022.01.03' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '한라봉', rDate: '2022.01.03' },
            { rTitle: '역시 거장은 괜히 거장 소리 듣는 게 아닌 듯', rWriter: '폼폼푸린', rDate: '2022.01.03' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '시나모롤', rDate: '2022.01.03' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '쿠마', rDate: '2022.01.04' },
            { rTitle: '애인이랑 같이 보면 안 되는 영화임', rWriter: '포챠코', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '쿠로미', rDate: '2022.01.04' },
            { rTitle: '지브리는 역시 잔잔함 속에 숨은 메세지가 일품이지', rWriter: '마이멜로디', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '미피', rDate: '2022.01.04' },
            { rTitle: '역시 겉모습보단 마음이 중요한 법이야', rWriter: '해바라기씨', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '햄토리', rDate: '2022.01.04' },
            { rTitle: '역시 자유는 좋은 거야', rWriter: '갈비찜덮밥', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '이빨요정', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '산타', rDate: '2022.01.04' },
            { rTitle: '이 영화 진짜로 15금이 맞긴 한 거임? ㅋㅋㅋㅋ', rWriter: '톸끼', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '뵤', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '왈왈', rDate: '2022.01.04' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '갈비찜덮밥', rDate: '2022.01.04' },
            { rTitle: '살다 보면 한 번쯤은 하게 되는 고민', rWriter: '췌리', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '도날드덕', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '만다린', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '마피아', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '록키', rDate: '2022.01.05' },
            { rTitle: '배우라고 생각이 들지 않고 저 사람이 지금 실존하는 것 같네요..', rWriter: '체리', rDate: '2022.01.05' },
            { rTitle: '영화 꼬라지가 왜 이럼ㅋㅋㅋㅋㅋㅋ', rWriter: '체리', rDate: '2022.01.05' },
            { rTitle: '배우라고 생각이 들지 않고 저 사람이 지금 실존하는 것 같네요..', rWriter: '체리', rDate: '2022.01.05' },
            { rTitle: '배우라고 생각이 들지 않고 저 사람이 지금 실존하는 것 같네요..', rWriter: '체리', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '로ㅋ', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '멜론', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '지켜본다', rDate: '2022.01.05' },
            { rTitle: '우리가 생각이라는 걸 하면서 살아야 하는 이유', rWriter: '보름달덩이', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '내맘대로', rDate: '2022.01.05' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '두고봐라', rDate: '2022.01.06' },
            { rTitle: '꼭 애인이랑 같이 봐야 하는 영화 원탑임', rWriter: '오토마타', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '탄탄', rDate: '2022.01.06' },
            { rTitle: '달려, 포레스트! 달려!', rWriter: '웨용', rDate: '2022.01.06' },
            { rTitle: '한 순간도 방심할 수 없는 발암 영화', rWriter: '구찌', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '갱갱', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '마르젤라', rDate: '2022.01.06' },
            { rTitle: '개인적으로 이건 인생작 리스트에 올려야 한다고 생각함', rWriter: '로ㅋ', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '아이언맨', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '쿠마', rDate: '2022.01.06' },
            { rTitle: '이게 극장판으로 나오다니 감격임', rWriter: '시나모롤', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '마이멜로디', rDate: '2022.01.06' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '사랑', rDate: '2022.01.07' },
            { rTitle: '인생이 어떻게 될 지는 아무도 모른다', rWriter: '비슷한걸 해요', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '자이언트', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '떡볶이', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '김밥', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '고구마튀김', rDate: '2022.01.07' },
            { rTitle: '스파이더맨 시리즈 중에 솔직히 이게 제일 좋았음', rWriter: '하와이안', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '비빔면', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '빙글빙글', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '맷돌', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '맹구', rDate: '2022.01.07' },
            { rTitle: '우디야 자유롭게 살어', rWriter: '아픔', rDate: '2022.01.07' },

        ]);
        const pageMoveAmount = ref(15);
        const pageLength = ref(Math.ceil(list.length / pageMoveAmount.value)); // 6
        const startIndex = ref(0);
        const itemsPerPage = ref(15);
        const currentPage = ref(1);
        const showList = ref([]);
        const searchRes = ref([]);
        const isSearching = ref(false);


        // 리스트 페이지별 표시 기능
        const setListBoard = (start, end) => {
            const word = document.getElementById('search').value;
            if( word == '' ) showList.value = list.slice(start, end);
            else if( word != '' ){
                showList.value = searchRes.value.slice(start, end);
            };
        }
        onMounted(()=>{
            setListBoard(startIndex.value, itemsPerPage.value);
        })

        // 다음 페이지로
        const nextPage = () => {
            const word = document.getElementById('search').value;
            const topLength = word == ''? list.length : searchRes.value.length;
            if( itemsPerPage.value >= topLength ) return
            // console.log(topLength)
            startIndex.value += pageMoveAmount.value;
            itemsPerPage.value = startIndex.value + pageMoveAmount.value;
            // console.log(startIndex.value, itemsPerPage.value)
            setListBoard(startIndex.value, itemsPerPage.value);
            numBoldInit();
            idxNow();
        }

        // 이전 페이지로
        const prevPage = () => {
            if( startIndex.value == 0 ) return;
            startIndex.value -= pageMoveAmount.value;
            itemsPerPage.value = startIndex.value + pageMoveAmount.value;
            // console.log(startIndex.value, itemsPerPage.value)
            setListBoard(startIndex.value, itemsPerPage.value);
            numBoldInit();
            idxNow();
        }

        // 마지막 페이지로
        const lastPage = () => {
            const word = document.getElementById('search').value;
            if(word ==''){
                startIndex.value = list.length - Math.floor(list.length / pageLength.value);
                itemsPerPage.value = list.length;
            }else if(word != ''){
                startIndex.value = searchRes.value.length - (searchRes.value.length % pageMoveAmount.value);
                // console.log(searchRes.value.length % pageMoveAmount.value);
                itemsPerPage.value = searchRes.value.length;
            }
            // console.log(startIndex.value, itemsPerPage.value)
            setListBoard(startIndex.value, itemsPerPage.value);
            numBoldInit();
            const pageIdx = document.querySelectorAll('.pageIdx');
            pageIdx[pageIdx.length-1].classList.add('bold');
        }

        // 첫 페이지로
        const firstPage = () => {
            startIndex.value = 0;
            itemsPerPage.value = pageMoveAmount.value;
            setListBoard(startIndex.value, itemsPerPage.value);
            numBoldInit();
            const pageIdx = document.querySelectorAll('.pageIdx');
            pageIdx[0].classList.add('bold');
        }

        // 페이지 넘버 생성과 클릭 기능
        const pageNumbers = () => {

            // 페이지 넘버 생성
            const pNumbers = document.querySelector('.pageNumbers');
            pNumbers.innerHTML = '';
            for( var i=1; i<=pageLength.value; i++ ){
                pNumbers.innerHTML += `<div class='pageIdx'>${i}</div>`;
            }

            // 페이지 넘버 클릭
            const pageIdx = document.querySelectorAll('.pageIdx');
            pageIdx.forEach(function(item){
                item.addEventListener('click', function(event){
                    const idx = event.target.innerText;
                    numBoldInit();
                    this.classList.add('bold');
                    if( idx == 1 ) firstPage();
                    else if ( idx == pageLength.value ) lastPage();
                    else{
                        itemsPerPage.value = pageMoveAmount.value*idx;
                        startIndex.value = itemsPerPage.value - pageMoveAmount.value;
                        // console.log(itemsPerPage.value, startIndex.value)
                        setListBoard(startIndex.value, itemsPerPage.value);
                    }
                });
            })
        }
        onMounted(()=>{
            pageNumbers();
            document.querySelectorAll('.pageIdx')[0].classList.add('bold');
        })

        // 페이지 넘버 볼드체 초기화
        const numBoldInit = () => {
            const pageIdx = document.querySelectorAll('.pageIdx');
            pageIdx.forEach(function(t){t.classList.remove('bold')});
        }

        // 페이지 넘버 화살표 조작 볼드체
        const idxNow = () => {
            const pageIdx = document.querySelectorAll('.pageIdx');
            const it = Math.ceil(itemsPerPage.value / pageMoveAmount.value);
            pageIdx[it-1].classList.add('bold');
        }


        // 검색 기능
        const filteredReviews = (event) => {
            const word = event.target.value;
            searchRes.value = list.filter(function(t){
                return t.rTitle.indexOf(word) > -1;
            });

            pageLength.value = Math.ceil(searchRes.value.length / pageMoveAmount.value);

            pageNumbers();

            
            startIndex.value = 0;
            itemsPerPage.value = 15;
            setListBoard(startIndex.value, itemsPerPage.value);
            
            isSearching.value = true;
            if(document.querySelectorAll('.pageIdx').length != 0){
                document.querySelector('.pageIdx').classList.add('bold');
            }
            
        };

        


        return {
            list,
            itemsPerPage,
            currentPage,
            showList,
            startIndex, itemsPerPage,
            // displayedList,
            // pageCount,
            nextPage, prevPage,
            lastPage, firstPage,
            filteredReviews,
            pageNumbers
            // goToPage,
        };
    },
};
</script>

<style>
@import url('../assets/css/reviewList.css');
</style>