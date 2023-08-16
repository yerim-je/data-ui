const tall=[161,168,174,159];
const name=["송은선","임민지","이상준","김선향"];
const weight=[43,59,72,46];

let avg = tall_avg();
$("#reg_bt").click(function(){
    if( $("#tall").val()=='' || $("#name").val()=='' ){
        alert("키 또는 이름을 입력하세요");
        $("#tall").val()=='' ? $("#tall").focus():$("#name").focus();
        return;
    }
    if( $("#weight").val()==''){
        alert("몸무게를 입력하시오.");
        $("#weight").focus();
        return;
    }
    tall.push( Number($("#tall").val()) );
    name.push( $("#name").val() );
    weight.push(  $("#weight").val() );

    avg=tall_avg();
    chart.destroy();
    draw();
    $("#tall").val("");
    $("#name").val("").focus();
    
});

const ctx=$("#bar_chart")[0].getContext("2d");
let chart='';
draw();

function draw(){
    chart = new Chart(ctx,{
        
        type:'bar',
        data:{
            labels:name,
            datasets:[
                {
                    label:"201호 키 조사",
                    data:tall,
                    borderWidth:1,
                    backgroundColor: avg_color(),
                    // tall.map(function(t) {return t >= avg ? '#FF8F6A' : '#79B1BF';}),
                    barPercentage:0.5,
                    indexAxis:"y"
                },
                {
                    label:"201호 몸무게 조사",
                    data:weight,
                    borderWidth:1,
                    backgroundColor:"yellow",
                    // tall.map(function(t) {return t >= avg ? '#FF8F6A' : '#79B1BF';}),
                    barPercentage:0.5,
                    indexAxis:"y"
                }
            ]
        },
        options:{
            
        }
    });
}
function avg_color(){
    var a=[];
    $.each(tall,function(i,t){a.push(t >= avg ? '#79B1BF' : '#FF8F6A' )});
    return a;
}
function tall_avg(){
    var sum=0;
    $.each(tall, function(i,t){
        sum+=t;
    });
    return sum/tall.length;
}
