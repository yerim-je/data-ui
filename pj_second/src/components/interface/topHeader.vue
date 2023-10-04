<template>
    <div class="header">
        <div class="frame">
            <div class="logo-frame">
                <routerLink to="/"><img class="LOGO" src="@/images/LOGO.svg" /></routerLink>
                <div class="inter-b-ox">
                    <div class="div">
                        <div class="text-wrapper">로그인</div>
                        <div class="text-wrapper">/</div>
                        <div class="text-wrapper">회원가입</div>
                    </div>
                    <div class="search-b-ox">
                        <img class="vector" src="@/images/search_icon.svg" />
                        <div class="place-holder">
                            <input @focus="searchingStart()" @blur="searchingStart()"
                            type="text" class="text-wrapper-2 searchWrite"
                            placeholder="영화, 인물을 검색해보세요">
                        </div>
                        <div v-if="isSearching" class="searchBar">
                            <searchBar/>
                        </div>
                        <div v-if="isTabletSearching" class="darkBg2"></div>
                        <div v-if="isMobileSearch" @click="searchMobile()" class="darkBg"></div>
                    </div>
                    <img @click="searchMobile()" class="search_bt" src="@/images/search_icon.svg">
                    <img @click="sideMenuOpen()" class="menu_bt" src="@/images/menu_icon.svg">
                </div>
            </div>
            <div @mouseover="MenuHover()" class="nav-b-ox">
                <div class="menu">
                    <RouterLink to="/MovieMain"><div class="text-wrapper-3">영화</div></RouterLink>
                </div>
                <div class="menu">
                    <div class="text-wrapper-3">리뷰</div>
                </div>
                <div class="menu">
                    <div class="text-wrapper-3">공지사항</div>
                </div>
                <div class="menu">
                    <div class="text-wrapper-3">문의사항</div>
                </div>
                <div class="menu">
                    <div class="text-wrapper-3">마이페이지</div>
                </div>
            </div>
            <subMenu v-if="isMenuHover" @mouseleave="MenuLeave()"/>
        </div>
    </div>
    <sideMenu v-if="isSlideMenuToggle"/>
</template>

<script>
import {ref, provide} from 'vue';
import sideMenu from '../interface/sideMenu.vue';
import subMenu from '../interface/subMenu.vue';
import searchBar from '../interface/searchBar.vue';
export default {
    name: 'topHeader',
    components:{
        sideMenu, subMenu, searchBar
    },
    setup(){
        const isSlideMenuToggle = ref(false);
        const isSearching = ref(false);
        const isMobileSearch = ref(false);
        const isTabletSearching = ref(false);
        const isMenuHover = ref(false);

        const MenuHover = () => isMenuHover.value = true;
        const MenuLeave = () => isMenuHover.value = false;

        const sideMenuOpen = () => {
            isSlideMenuToggle.value = !isSlideMenuToggle.value;
        }


        const searchingStart = () => {
            if( isMobileSearch.value ) {
                return;
            }

            isSearching.value = !isSearching.value;

            const LOGO = document.querySelector(".LOGO");
            const menu_bt = document.querySelector(".menu_bt");
            const search_box = document.querySelector(".search-b-ox");
            const search_bt = document.querySelector(".search_bt");
            
            
            if(isSearching.value && window.innerWidth <= 1194){
                isTabletSearching.value = true;
                LOGO.classList.add('hide');
                menu_bt.classList.add('hide');
                search_box.style.width = 'calc(100vw - 40px)';
                search_box.style.position = 'relative';
                search_box.style.top = '0';
                search_box.style.left = '-5px';
                search_box.style.margin = '15px auto';
                search_bt.style.display = 'none';
            }else{
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
            const search_box = document.querySelector(".search-b-ox");
            const search_bt = document.querySelector(".search_bt");
            const menu_bt = document.querySelector(".menu_bt");

            isSearching.value = !isSearching.value;
            isMobileSearch.value = !isMobileSearch.value;

            if(isMobileSearch.value && window.innerWidth <= 490){
                LOGO.classList.add('hide');
                menu_bt.style.display = 'none';
                search_bt.style.display = 'none';
                search_box.style.display = 'flex';
                search_box.style.width = 'calc(100vw - 30px)';
            }else{
                LOGO.classList.remove('hide');
                menu_bt.style.display = '';
                search_bt.style.display = '';
                search_box.style.display = 'none';
                isMobileSearch.value = false;
            }
        }


        window.addEventListener('resize', function(){
            const LOGO = document.querySelector(".LOGO");
            const search_box = document.querySelector(".search-b-ox");
            const menu_bt = document.querySelector(".menu_bt");
            const darkBg = document.querySelector(".darkBg");
            const darkBg2 = document.querySelector(".darkBg2");
            const search_bt = document.querySelector(".search_bt");
            const window = this.window.innerWidth;

            if( isSearching.value ){
                if( window > 1194 ){
                    isTabletSearching.value = false;
                    LOGO.classList.remove('hide');
                    search_box.style.width = '';
                    search_box.style.margin = '15px auto';
                    darkBg.style.display = 'none';
                    darkBg2.style.display = 'none';
                }else if ( 490 <= window && window <= 1194 ){
                    isTabletSearching.value = true;
                    LOGO.classList.add('hide');
                    menu_bt.classList.add('hide');
                    search_box.style.display = 'flex';
                    search_box.style.width = 'calc(100vw - 40px)';
                    search_box.style.position = 'relative';
                    search_box.style.top = '0';
                    search_box.style.left = '-5px';
                    darkBg.style.display = 'none';
                    darkBg2.style.display = 'block';
                    search_box.style.margin = '15px auto';
                    search_box.style.display = 'flex';
                }else if ( window < 490 ){
                    isTabletSearching.value = false;
                    search_bt.style.display = 'block';
                    LOGO.classList.add('hide');
                    menu_bt.style.display = 'none';
                    search_bt.style.display = '';
                    search_box.style.display = '';
                    search_box.style.width = '';
                    darkBg.style.display = 'none';
                    darkBg2.style.display = 'none';
                }
            }
        })


        provide('isSlideMenuToggle',isSlideMenuToggle);
        provide('sideMenuOpen',sideMenuOpen);

        return {isSlideMenuToggle, sideMenuOpen,
             isSearching, searchingStart,
              isMobileSearch, searchMobile,
              isTabletSearching, isMenuHover, MenuHover, MenuLeave};
    }
}
</script>

<style scoped>
@import url('./topHeader.css');
</style>