let data_list = new Object();  // 데이터 저장객체
const ctx=$("#car")[0];
var y = new Set();
var usage = new Set();
var car = new Set();
var ele = new Set();
var hydro = new Set();
var hybrid = new Set();
var via = new Set();
var gasoline = new Set();


async function getData(){
    var data = await fetch("./연료별용도별자동차등록현황.json").then((r)=>r.json());
    return data;
}

    // json파일에서 json 가져오기
    // json 데이터 중에서 용도가 비사업용인 승용차의 연료별 총합을 구하기
    // 연료는 전기, 하이브리드, 휘발류, 경유, 수소 만 구하기

$(async function(){
    data_list = await getData();
    
    $.each(data_list,function(i,item){
        y.add(Number(item.REG_YY));
        car.add(item.RIDNG_ODR);
        if(item.PURPOS_DIV==="비사업용") usage.add(this);
        if(usage.DTCONT === "전기") ele.add(this);
    })
    
    console.log(usage);
})
