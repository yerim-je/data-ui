const category=[
    ["급여","캐시백"," 복권","환급금","기타수익","이자"],
    ["교통","통신비","외식","주유","연애","문화생활","쇼핑"]
]
let ctx1="", ctx2="", pi1='',pi2='';
const income=[];
const expen=[];



$(function(){
    ctx1=$("#pi1")[0];
    ctx2=$("#pi2")[0];

    //머니배열 초기화
    for(var i=0; i<category[0].length; i++) income.push((10-i)*10000);
    for(var i=0; i<category[1].length; i++) expen.push((Math.floor(Math.random()*100))*10000);
    income_pi();
    expen_pi();

    $(".labels").click(function(){
        if( $(this).hasClass("choice") ) return;    //클릭한 녀석의 배경색을 바꿔주기 위해
        // 없으면 어느버튼이던 클릭할때마다 바뀐다.
        $(".labels").toggleClass("choice");
        $(".input_wrap").toggle();
    });

    $.each(category,function(i,c){
        $.each(category[i],function(k,t){
            $(".category").eq(i).append("<option value='"+i+"-"+k+"'>"+t+"</option>")

        })
    });
    $("#income_bt").click(income_chart);
    $("#expen_bt").click(expen_chart);
});

function income_chart(){
    if( $("#income_money").val()==''){
        alert("수입금액을 입력하세요");
        $("#income_money").focus(); return;
    }
    var cidx = $("#income_category").val().split("-");
    income[cidx[1]] += parseInt($("#income_money").val());
    if(pi1 != '') pi1.destroy();
    income_pi();
}
function expen_chart(){
    if( $("#expen_money").val()==''){
        alert("지출금액을 입력하세요")
        $("#expen_money").focus(); return;
    }
}
function income_pi(){
    pi1 = new Chart(ctx1,{
        plugins:[ChartDataLabels],
        type:"pie",
        data:{
            labels:category[0],
            datasets:[{
                label:"수입",
                data:income,
                backgroundColor:[
                    "#dcdcbb","#244c3c","#526c5b",
                    "#425e6a","#fa6e06","#6E6E5D"
                ],
                // borderAlign:"inner",
                // borderWidth:2,
                // borderColor:"black",
                // borderDash:[5,5],
                // borderDashOffset:2,
                rotation:45,
            }]
        },
        options:{
            plugins:{
                datalabels:{

                    formatter:
                    function(value,context){ 
                        var idx = context.dataIndex;
                        var lb = context.chart.data.labels[idx];
                        return lb+" "+value.toLocaleString()+"원";},
                    color:"white",
                },
                labels:{
                    render:"label",
                    fontSize:15,
                    fontStyle:"bold"
                }   
            },
            
        }
    })
}
function expen_pi(){

}