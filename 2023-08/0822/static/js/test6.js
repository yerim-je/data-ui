let house=new Object();
let isShow = false;
const color1=["#fed2e0","#f7bed0","#e2b3d5","#c9b3d8","#a6afda"];
const color2=["#a0c8e0","#d4e6f1","#b0c4de","#b0e0e6","#c3cde6"];


$(function(){
   
    $("#icon").click(function(){
        $(this).toggleClass("open");
        $("#side").toggleClass("sideopen");
    });

    $.getJSON("./data/test6.json",function(data){
        house = data;

        $("#main").append("<div id='expen'>"+
        "<h2 class='title'>지출</h2>"+
        "<div class='expen_t'>"+
        "<table>"+
        "<thead><th class='cate'>분류</th>"+
        "<th class='m'>금액</th>"+
        "<th class='c'>내용</th></thead>"+
        "<tbody></tbody>"+
        "</table></div></div>"+

        "<div id='income'>"+
        "<h2 class='title'>수입</h2>"+
        "<div class='income_t'>"+
        "<table>"+
        "<thead><th class='cate'>분류</th>"+
        "<th class='m'>금액</th>"+
        "<th class='c'>내용</th></thead>"+
        "<tbody></tbody></table>"+"</div></div>")



        $.each(data.지출,function(i,item){
            var money = item.금액.toLocaleString();
            $(".expen_t").find("tbody").append("<tr>"+
            "<td class='categoryText'>"+item.분류+"</td><td class='moneyText'>"+money+"원</td><td class='detailText'>"+item.내용+"</td></tr>")
        })
        $.each(data.수입,function(i,item){
            var money = item.금액.toLocaleString();
            $(".income_t").find("tbody").append("<tr>"+
            "<td class='categoryText'>"+item.분류+"</td><td class='moneyText'>"+money+"원</td><td class='detailText'>"+item.내용+"</td></tr>")
        
        })
        $(".chart_bt").click(chartShow);
        $(".list_bt").click(listShow);

        $("#word").on("keyup",search_word);
        $("#money").on("keyup",search_money);


        $("input[name=category]").change(categorySearch);
    });
    
})
function categorySearch(){
    var ctg = [];

    $("input[name=category]:checked").each(function(){
        ctg.push( $(this).val() );
    })
    $("tbody>tr").filter(function(){
        var isShow = true;
        var text = $ (this).find(".categoryText").text();
        if(ctg.indexOf(text) == -1 && ctg.length!=0) isShow = false;
        $(this).toggle(isShow);
    })
}
let house_chart = '';
function chartShow(){
    $("#chart_wrap").show();
    $("#main").hide();
    $(".chart_bt").css({background:"#595c7a"});
    $(".list_bt").css({background:"#b175dc"});

    if(house_chart == ''){
        var ctx = $("#chart")[0];
        var ctx2 = $("#incomeChart")[0];

        var setE = new Set();       //지출 분류
        var totalE = new Array();   //지출 분류별 총금액

        var setI = new Set();
        var totalI= new Array();

        $.each(house.지출,function(idx, data){
            var 분류 = data.분류;
            var 금액 = Number(data.금액);
            if( setE.has(분류) ){
                totalE[분류]+=금액;
            }else {
                totalE[분류]=금액;
            }
            setE.add(분류);
        });
        console.log(house.지출);

        $.each(house.수입,function(idx,data){
            if( setI.has(data.분류) ){
                    totalI[data.분류] += Number(data.금액);
            }else {
                totalI[data.분류]= Number(data.금액);
            }
            setI.add(data.분류)
        })
        new Chart(ctx,{
            plugins:[ChartDataLabels],
            type: "pie",
            data:{
                labels: Array.from(setE) ,
                datasets:[
                    {
                        data: Object.values(totalE),
                        backgroundColor:color1
                    }
                ]
            }
        })
        new Chart(ctx2,{
            type:"pie",
            data:{
                labels:Array.from(setI),
                datasets:[
                    {
                        data: Object.values(totalI),
                        backgroundColor:color2,
                    }
                ]
            },
            options:{
                plugins:{
                    datalabels:{
                        formatter:function(){
                            
                    }}
                }
            }
        });
    }
}
function listShow(){
    $("#main").show();
    $("#chart_wrap").hide();
    $(".chart_bt").css({background:"#b175dc"});
    $(".list_bt").css({background:"#595c7a"});
}
function search_word(){
    var word = $("#word").val();
    $("tbody>tr").filter(function(){
        $(this).toggle( $(this).text().indexOf(word) > -1);
    })
}
function search_money() {
    var money = $("#money").val();
    $("tbody>tr").filter(function () {
        var rowMoney = $(this).find(".moneyText").text();
        rowMoney = rowMoney.replace("원", "").replace(/,/g, "");
        return parseInt(rowMoney) <= parseInt(money); // 이하 조건으로 변경
    }).toggle(true);

    $("tbody>tr").not(function () {
        var rowMoney = $(this).find(".moneyText").text();
        rowMoney = rowMoney.replace("원", "").replace(/,/g, "");
        return parseInt(rowMoney) <= parseInt(money); // 이하 조건으로 변경
    }).toggle(false);    //>gpt
    // if(moneyB !=''){
    //     $(".detail").filter(function(){
    //         var isShow=true;
    //         var m = $(this).find(".moneyText").text().replace("원","").replace(/,/g,"");
    //         if( Number(moneyB) < m) isShow=false;
    //         $(this).toggle( isShow );
    //     });
    // }
}