<template>
    <div class="sizeWrapper" :style="{ backgroundColor: backgroundColor }">
        <div id="pc"><img id="imagePc" :src="pcPath" @load="findMostFrequentColor"></div>
        <div id="tablet"><img :src="tabletPath" alt=""></div>
        <div id="mobile"><img :src="mobilePath" alt=""></div>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
export default{
    name:'botAds',
    setup(){
        const pcPath = ref('');
        const tabletPath = ref('');
        const mobilePath = ref('');

        const isSiren = ref(true);



        const backgroundColor = ref('white'); // 초기 배경색

        const findMostFrequentColor = (event) => {
            const img = event.target;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            const imageData = context.getImageData(0, 0, img.width, img.height).data;

            // 색상 히스토그램 생성
            const colorCounts = {};

            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];
                const rgb = `rgb(${red},${green},${blue})`;

                if (colorCounts[rgb]) {
                    colorCounts[rgb]++;
                } else {
                    colorCounts[rgb] = 1;
                }
            }

            // 가장 많이 분포된 색상 찾기
            let mostFrequentColor = 'white'; // 기본값 설정
            let maxCount = 0;

            for (const color in colorCounts) {
                if (colorCounts[color] > maxCount) {
                    mostFrequentColor = color;
                    maxCount = colorCounts[color];
                }
            }

            backgroundColor.value = mostFrequentColor;
        };



        onMounted(()=>{
            const random = Math.floor(Math.random()*4)+1;
            pcPath.value = '/src/images/botAd/botAd'+random+'.png'
            tabletPath.value = '/src/images/botAd/botAd'+random+'.png'
            mobilePath.value = '/src/images/botAd/botAd'+random+'.png'


            if (location.href.split("/")[3] == 'Siren') {
                isSiren.value = false;
            } else {
                isSiren.value = true;
            }


            const img = document.getElementById('imagePc');
            img.addEventListener('load', findMostFrequentColor);
        })

        return {pcPath, tabletPath, mobilePath, isSiren, backgroundColor}
    }
}
</script>
<style scoped>

.sizeWrapper{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    width:100%;
    margin:0 auto;
}

.sizeWrapper div{
    height:100%;
}

img{
    height:100%;
    margin: 0 auto;
    margin-bottom:-4px;
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
    img{width:100%; height:fit-content;}
}

@media(max-width:490px){
    .sizeWrapper{height:fit-content;}
    img{width:100%; height:fit-content;}
    #pc{ display:none; }
    #tablet{ display:none;}
    #mobile{display:block;}
}
</style>