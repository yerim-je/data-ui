<template>
    <div id="parentDiv" :style="{ backgroundColor: backgroundColor }">
        <img id="childImg" :src="pcPath" @load="findMostFrequentColor">
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    name: 'topAds',
    setup() {
        const pcPath = ref('');
        const tabletPath = ref('');
        const mobilePath = ref('');

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

        onMounted(() => {
            const random = Math.floor(Math.random() * 5) + 1;
            pcPath.value = '/src/images/topAd/topAd' + random + '.png'

            const img = document.getElementById('childImg');
            img.addEventListener('load', findMostFrequentColor);
        })

        return { pcPath, tabletPath, mobilePath, backgroundColor }
    }
}
</script>

<style scoped>
#parentDiv{
    width:100%;
    height: 90px;
    display: flex;
    justify-content: center;
}

@media(max-width:1194px) {
    #parentDiv {
        display: none;
    }
}

img {
    height:100%;
    position: relative;
}
@media(max-width:1440px){
    #parentDiv {
    height: fit-content;
    }
    img{
        width:100%;
    }
}
</style>