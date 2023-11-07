<template>
    <div id="chartWrap">
        <canvas id="chart" width="500" height="320"></canvas>
    </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import { onMounted,onBeforeUnmount , inject, watch, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
export default {
    name: 'lineChart',
    setup() {
        const aud = JSON.parse(localStorage.getItem('aud'));
        let date = inject('date');
        let audience = inject('audience');
        console.log(date, audience)
        const router = useRouter();
        let line = null;
        const isCharted = ref(false);


        const makeLine = () => {
            const chartWrap = document.getElementById('chartWrap');
            const rect = chartWrap.getBoundingClientRect();
            if (isCharted.value == false && rect.top < window.innerHeight && rect.bottom >= 0) {
                chartMaker();
                isCharted.value = true;
            }
        };

        const chartMaker = () => {
            if( line && isCharted.value == false ) line.destroy()
            const ctx = document.getElementById('chart');
            line = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: date,
                    datasets: [{
                        data: audience,
                        borderWidth: 3,
                        borderColor: '#F9C041',
                        pointBorderWidth: 0,
                        pointStyle: false,
                        fill: true,
                        backgroundColor: '#F9C04180'
                    }]
                },
                options: {
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuad'
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        };

        const setupScrollListener = () => {
            window.addEventListener('scroll', makeLine);
        };

        const removeScrollListener = () => {
            window.removeEventListener('scroll', makeLine);
        };

        onMounted(() => {
            setupScrollListener();
        });

        onBeforeUnmount(() => {
            removeScrollListener();
        });


        // 차트 업데이트
        watch(
            () => router.currentRoute.value.query,
            (newQuery, oldQuery) => {
                isCharted.value = false;

                const trimed = newQuery.movieName.trim()
                date = reactive([]);
                audience = reactive([]);
                for (var key in aud[trimed]) date.push(key);
                date = date.sort((a, b) => b - a).slice(0, 10);
                for (var i of date) audience.push(aud[trimed][i]);
                date = [...date].map(function (d) {
                    var temp = d.substring(4, 8);
                    var a = temp.slice(0, 2);
                    var b = temp.slice(2, 4);
                    return a + '.' + b;
                })
                date.reverse(); audience.reverse();
            }
        );

        return {
            date,
            audience
        };
    }
}
</script>

<style scoped>
#chartWrap {
    width: 100%;
}

#chart {
    width: 450px;
    height: 320px;
}

@media(max-width:490px) {
    #chart {
        height: 250px;
    }
}
</style>