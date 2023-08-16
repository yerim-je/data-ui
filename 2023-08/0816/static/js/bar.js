const tall=[161,168,174,159];
const name=["송은선","임민지","이상준","김선향"];

const avg = tall_avg();
$("#reg_bt").click(function(){
    if( $("#tall").val()=='' || $("#name".val()=='')){
        alert("키 또는 이름을 입력하시오.");
        $("#tall").val()=='' ? $("#tall").focus():$("#name").focus();
        return;
    }
    tall.push( Number($("#tall").val()) );
    name.push( $("#name").val() );
});

const ctx=$("#bar_chart")[0].getContext("2d");
let chart='';
draw();


function draw(){
    chart = new Chart(ctx,{
        
        type:'bar',
        data:{
            labels:name,
            datasets:[{
                label:"201호 키 조사",
                data:tall,
                borderWidth:1,
                backgroundColor:[
                    tall[0]>=avg ? "#A15D74":"#75AE97",
                    tall[1]>=avg ? "#A15D74":"#75AE97",
                    tall[2]>=avg ? "#A15D74":"#75AE97",
                    tall[3]>=avg ? "#A15D74":"#75AE97"
                ],
                barPercentage:0.5,
                barThickness:50,
                borderColor:"black",
                borderSkipped:"start",
                borderRadius:5,
                categoryPercentage:0.1,
                hoverBackgroundColor:"yellow",
                indexAxis:"x",
                base:avg
            }]
        },
        options:{
            scales:{
                y:{
                    min:150,max:200,
                    ticks:{
                        stepSize:10
                    }
                }
            }
        }
    });
}

function tall_avg(){
    var sum=0;
    $.each(tall, function(i,t){
        sum+=t;
    });
    return sum/tall.length;
}