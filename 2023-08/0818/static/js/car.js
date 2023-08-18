let data = [];  // 데이터 저장변수
const ctx=$("#car")[0];
let y=[];

async function getData(){
    var temp = await fetch("./static/js/연료별용도별자동차등록현황.json").then((r)=>r.json());
    // console.log(temp); 
    
}
$(async function(){
    data = await getData();
    var car =new Set();
    var y = new Set();

    $.each(data,function(i,item){
        car.add(item.RIDNG_ODR);
        y.add(item.REG_YY);
        
    })
    console.log(car);
})