<template>
    <div class="header" @mouseleave="MenuLeave()">
        <div class="frame">
            <div class="logo-frame" @mouseover="MenuLeave()">
                <routerLink to="/" class="logoWrap"><img class="LOGO" src="@/images/LOGO.svg" /></routerLink>
                <div class="inter-b-ox">
                    <div class="div">
                        <RouterLink to="/login">
                            <div v-if="!isLogin" class="loginFont" style="cursor:pointer">
                                로그인
                            </div>
                        </RouterLink>
                        <div v-if="isLogin" @click="loginToggle()" class="loginFont" style="cursor:pointer">
                            로그아웃
                        </div>
                        <div class="normalFont">/</div>
                        <RouterLink to="/signup">
                            <div class="loginFont">회원가입</div>
                        </RouterLink>
                    </div>
                    <div class="search-box">
                        <img class="vector" src="@/images/search_icon.svg" />
                        <div class="place-holder">
                            <input @focus="searchingStart()" @blur="searchFocusOut()"
                            @keyup="getSearchWord" @keypress.enter="searchMovie"
                            autocomplete="off" type="text" name="searchWord"
                            class="inputText searchWrite" placeholder="영화 제목을 검색해보세요">
                        </div>
                        <div v-show="isSearching" class="searchBar">
                            <searchBar />
                        </div>
                        <div v-if="isTabletSearching" @click="searchingStart()" class="darkBg2"></div>
                        <div v-if="isMobileSearch" @click="searchMobile()" class="darkBg"></div>
                    </div>
                    <img @click="searchMobile()" class="search_bt" src="@/images/search_icon.svg">
                    <img @click="sideMenuOpen()" class="menu_bt" src="@/images/menu_icon.svg">
                </div>
            </div>
            <div @mouseover="MenuHover()" class="nav-b-ox">
                <RouterLink to="/MovieMain">
                    <div class="menu">
                        <div class="menuName">영화</div>
                    </div>
                </RouterLink>
                <RouterLink to="/ReviewBoard/:1">
                    <div class="menu">
                        <div class="menuName">리뷰</div>
                    </div>
                </RouterLink>
                <RouterLink to="/NoticeList">
                    <div class="menu">
                        <div class="menuName">공지사항</div>
                    </div>
                </RouterLink>
                <RouterLink to="/AskMe">
                    <div class="menu">
                        <div class="menuName">문의사항</div>
                    </div>
                </RouterLink>
                <RouterLink to="/Info">
                    <div class="menu">
                        <div class="menuName">마이페이지</div>
                    </div>
                </RouterLink>
            </div>
            <subMenu v-show="isShowing" @mouseleave="MenuLeave()" />
        </div>
    </div>

    <!-- <div v-show="isSlideMenuToggle">
    </div> -->
    <sideMenu />
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { ref, provide, inject, onMounted, onBeforeMount } from 'vue';
import sideMenu from '../interface/sideMenu.vue';
import subMenu from '../interface/subMenu.vue';
import searchBar from '../interface/searchBar.vue';
export default {
    name: 'topHeader',
    components: {
        sideMenu, subMenu, searchBar
    },
    setup() {
        const searchVal = ref('');
        const getSearchWord = (event) => {
            const word = event.target.value;
            searchVal.value = word;
        }
        provide('searchVal', searchVal);

        const uniqueKey = 0;

        const loginToggle = inject('loginToggle');
        const isLogin = inject('isLogin');

        const isSlideMenuToggle = ref(false);
        const isSearching = ref(false);
        const isMobileSearch = ref(false);
        const isTabletSearching = ref(false);
        const isMenuHover = ref(false);
        provide('isMenuHover', isMenuHover);
        const isShowing = ref(false);
        provide('isShowing', isShowing);

        const path = useRoute().path;
        const router = useRouter();

        const MenuHover = () => {
            isMenuHover.value = true;
            isShowing.value = true;
        }
        const MenuLeave = () => isMenuHover.value = false;

        const searchMovie = (e) => {
            if (window.innerWidth >= 1194) {
                isSearching.value = !isSearching.value;
                isMenuHover.value = false;
                router.replace('/Search?searchWord='+searchVal.value);
            }
        }

        const sideMenuOpen = () => {
            isSlideMenuToggle.value = !isSlideMenuToggle.value;
        }

        const searchFocusOut = () => {
            if( window.innerWidth > 1194 ){
                searchingStart();
                isSearching.value = false;
            }
        }

        const searchingStart = () => {
            if (isMobileSearch.value) {
                return;
            }

            isSearching.value = !isSearching.value;

            const LOGO = document.querySelector(".LOGO");
            const menu_bt = document.querySelector(".menu_bt");
            const search_box = document.querySelector(".search-box");
            const search_bt = document.querySelector(".search_bt");


            if (isSearching.value && window.innerWidth <= 1194) {
                isTabletSearching.value = true;
                LOGO.classList.add('hide');
                menu_bt.classList.add('hide');
                search_box.style.width = 'calc(100vw - 40px)';
                search_box.style.position = 'relative';
                search_box.style.top = '0';
                search_box.style.left = '-5px';
                search_box.style.margin = '15px auto';
                search_bt.style.display = 'none';
            } else {
                isTabletSearching.value = false;
                LOGO.classList.remove('hide');
                menu_bt.classList.remove('hide');
                search_box.style.width = '';
                search_box.style.position = '';
                search_box.style.top = '';
                search_box.style.left = '';
                search_box.style.margin = '';
                search_bt.style.display = 'none';
            }
        }


        const searchMobile = () => {
            const LOGO = document.querySelector(".LOGO");
            const search_box = document.querySelector(".search-box");
            const search_bt = document.querySelector(".search_bt");
            const menu_bt = document.querySelector(".menu_bt");
            const inputText  = document.querySelector(".inputText ");

            isSearching.value = !isSearching.value;
            isMobileSearch.value = !isMobileSearch.value;

            if (isMobileSearch.value && window.innerWidth <= 490) {
                LOGO.classList.add('hide');
                menu_bt.style.display = 'none';
                search_bt.style.display = 'none';
                search_box.style.display = 'flex';
                search_box.style.width = 'calc(100vw - 30px)';
                inputText.focus();
            } else {
                LOGO.classList.remove('hide');
                menu_bt.style.display = '';
                search_bt.style.display = '';
                search_box.style.display = '';
                isMobileSearch.value = false;
            }
        }


        window.addEventListener('resize', function () {
            const LOGO = document.querySelector(".LOGO");
            const search_box = document.querySelector(".search-box");
            const menu_bt = document.querySelector(".menu_bt");
            const search_bt = document.querySelector(".search_bt");
            const window = this.window.innerWidth;

            if (isSearching.value) {
                if (window > 1194) {
                    isTabletSearching.value = false;
                    LOGO.classList.remove('hide');
                    search_box.style.width = '';
                    search_box.style.margin = '';
                } else if (490 <= window && window <= 1194) {
                    isTabletSearching.value = true;
                    LOGO.classList.add('hide');
                    menu_bt.classList.add('hide');
                    search_box.style.width = 'calc(100vw - 40px)';
                    search_box.style.position = 'relative';
                    search_box.style.top = '0';
                    search_box.style.left = '-5px';
                    search_box.style.margin = '15px auto';
                    search_bt.style.display = 'none';
                } else if (window < 490) {
                    isTabletSearching.value = false;
                    LOGO.classList.add('hide');
                    menu_bt.classList.add('hide');
                    search_bt.style.display = 'none';
                    search_box.style.display = 'flex';
                    search_box.style.width = 'calc(100vw - 30px)';
                }
            } else {
                if (window > 1194) {
                    menu_bt.classList.add('hide');
                    search_box.style.width = '';
                    search_bt.style.display = '';
                }
                else if (490 <= window && window <= 1194) {
                    menu_bt.classList.remove('hide');
                    search_box.style.width = '';
                    search_bt.style.display = 'none';
                } else if (window < 490) {
                    search_bt.style.display = 'block';
                    menu_bt.classList.remove('hide');
                }
            }
        })


        provide('isSlideMenuToggle', isSlideMenuToggle);
        provide('sideMenuOpen', sideMenuOpen);
        provide('searchingStart', searchingStart);


        onMounted(() => {
            router.beforeEach((to, from) => {
                const search_box = document.querySelector(".search-box");
                const menu_bt = document.querySelector(".menu_bt");
                const LOGO = document.querySelector(".LOGO");
                const search_bt = document.querySelector(".search_bt");

                isMenuHover.value = false;
                isSearching.value = false;

                if (490 <= window.innerWidth && window.innerWidth <= 1194) {
                    isSearching.value = false;
                    isTabletSearching.value = false;
                    LOGO.classList.remove('hide');
                    menu_bt.classList.remove('hide');
                    search_box.style.width = '';
                    search_box.style.position = '';
                    search_box.style.top = '';
                    search_box.style.left = '';
                    search_box.style.margin = '';
                    search_bt.style.display = 'none';
                } else if (window.innerWidth < 490) {
                    LOGO.classList.remove('hide');
                    menu_bt.style.display = '';
                    search_bt.style.display = '';
                    search_box.style.display = '';
                    isMobileSearch.value = false;
                }
            })
        })


        return {
            isSlideMenuToggle, sideMenuOpen,
            isSearching, searchingStart,
            isMobileSearch, searchMobile,
            isTabletSearching, isMenuHover, MenuHover, MenuLeave,
            searchMovie, router, isLogin, loginToggle, uniqueKey,
            searchFocusOut, searchVal, getSearchWord, isShowing
        };
    }
}
</script>

<style scoped>@import url('./topHeader.css');</style>