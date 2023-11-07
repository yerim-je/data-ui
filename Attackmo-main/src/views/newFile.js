import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

export default (await import('vue')).defineComponent({
name: 'MovieTitle',
components: { lineChart, radarChart },
setup(props, context) {
const isActive = ref(false);
const isBig = ref(false);
const isSwitched = ref(false);
const path = ref('');
const image = ref('');
const set = JSON.parse(localStorage.getItem('set'));
const param = useRoute().query.movieName;
const filtered = set.filter(function (item, idx) {
return item.제목 == param;
});
const actors = filtered[0].배우;
const isTrailer = filtered[0].예고편영상.length == 1 ? false : true;
const isImage = filtered[0].스틸컷.length == 1 ? false : true;


const bookMark = (event) => {
const t = event.target.parentNode.nextSibling.innerText;

if (sessionStorage.getItem('login') == 'false') return alert('로그인이 필요한 서비스입니다.');

if (localStorage.getItem('bookmark') == null || localStorage.getItem('bookmark') == '[]') {
const temp = new Array();
temp.push(t);
localStorage.setItem('bookmark', JSON.stringify(temp));
} else if (JSON.parse(localStorage.getItem('bookmark')).indexOf(t) > -1) {
const item = new Array();
item.push(JSON.parse(localStorage.getItem('bookmark')));
item.splice(item.indexOf(t), 1);
localStorage.removeItem('bookmark');
localStorage.setItem('bookmark', JSON.stringify(item));
} else if (localStorage.getItem('bookmark') != null || localStorage.getItem('bookmark') != '[]') {
const em = JSON.parse(localStorage.getItem('bookmark'));
em.push(t);
localStorage.removeItem('bookmark');
localStorage.setItem('bookmark', JSON.stringify(em));
}
};


// 슬라이드 스크롤
const slideScrollRight = (t, i) => {
const slider = event.target.previousSibling;
slider.scrollLeft += (352 * 2) + (50 * 2);
};
const slideScrollLeft = (t, i) => {
const slider = event.target.nextSibling;
slider.scrollLeft -= (352 * 2) + (50 * 2);
};


const BMClicked = () => isActive.value = !isActive.value;

const titleModal = (event) => {
const t = event.target.nextSibling;
t.classList.toggle('show');
};

const switcher = () => {
const big = document.querySelector('#big');
big.innerHTML = '';
isBig.value = !isBig.value;
};

const trailerScale = (event) => {
const t = event.target.previousSibling.children[0];
// const t = event.target;
const big = document.querySelector('#big');
const clonedT = t.cloneNode(true);
switcher();
big.appendChild(clonedT);
};

onMounted(() => {
path.value = '/src/images/movieInfo/bookmark.svg';
const movieName = document.querySelector('.movieName').innerText;
if (JSON.parse(localStorage.getItem('bookmark')) != null && JSON.parse(localStorage.getItem('bookmark')).indexOf(movieName) > -1) {
path.value = '/src/images/movieInfo/bookmark_checked.svg';
isActive.value = true;
}

const bookMark_Bt = document.querySelector('.bookMark_Bt');
const ani = document.querySelector('.ani');
bookMark_Bt.addEventListener('click', function () {
if (!isSwitched.value) {
if (sessionStorage.getItem('login') == 'false') return;
path.value = '/src/images/movieInfo/bookmark_checked.svg';
isSwitched.value = !isSwitched.value;
ani.classList.toggle('clicked');
BMClicked();
} else if (isSwitched.value) {
path.value = '/src/images/movieInfo/bookmark.svg';
isSwitched.value = !isSwitched.value;
ani.classList.toggle('clicked');
BMClicked();
}
});

});

return {
path, isBig, switcher, trailerScale, isSwitched,
image, isActive, filtered, actors, isTrailer, titleModal,
slideScrollRight, slideScrollLeft, isImage, bookMark
};
}
});
