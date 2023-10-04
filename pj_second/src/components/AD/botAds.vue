<template>
    <div id="pc"><img src="@/images/ad_b1.png" alt=""></div>
    <div id="tablet"><img src="@/images/ad_b1_t.png" alt=""></div>
    <div id="mobile"><img src="@/images/ad_b2_m.png" alt=""></div>
</template>

<script>
export default{
    name:'botAds',
    setup(){
        
    }
}
</script>
<style scoped>
img{
    position: relative; left:50%;
    transform:translateX(-50%);
}

div{
    width:100vw; background:#F6E0B5;
    display:flex; justify-content: center;
    align-items: center;
}

@media(min-width:1194px){
    #pc{ display:block; }
    #tablet{ display:none;}
    #mobile{ display:none; }
}

@media(max-width:1194px){
    #pc{ display:none; }
    #tablet{ display:block;}
    #mobile{ display:none; }
}

@media(max-width:490px){
    #pc{ display:none; }
    #tablet{ display:none;}
    #mobile{ display:block; }
}
</style>