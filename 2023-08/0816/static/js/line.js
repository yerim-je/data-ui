const love = [100,95,89,96,75,64,93];
const day = [10,20,50,100,200,300,365];
const ctx = $("#line1")[0];

let 겸지={
    label:"사랑지수",
    data:love,
    borderColor:"pink",
    tension:0.2,
    fill:false,
    backgroundColor:"mistyrose",
    borderCapStyle:"square",
    pointStyle:"rect",  //circle, cross, dash, line, rect, star, triangle, rectRounded
    pointBorderWidth:10,
    pointHoverBorderColor:"red",
    pointHoverBorderWidth:10,
    showLine:true
}

let 향수= {
    data:[100,100,90,80,70,30,20],
    borderColor:"hotpink",
}

const loveData = {
    labels:day,
    datasets:[겸지,향수]
}

const chartOption = {
    plugins:{
        title:{ display:true, text:"기념일에 따른 사랑지수"}
    },
    scales:{
        y:{stacked:true}
    }
}

new Chart(ctx,{
    type:"line",
    data:loveData,
    options:chartOption
})
/*
오늘의 숙제 
혼합 차트 만들기 (막대, 꺽은선)

*/