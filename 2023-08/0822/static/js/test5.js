let school = new Object();  //json 전체 데이터 저장
let swt = true;     // 차트와 목록 전환 판단용
let std_chart = '';

let chartColor=["#065535","#004791","#6449a6","#ff7f59","#4b4453","#67948f",
                "#4a8d00","#103e5d","#607827","#15e79c"];
// 변수이름, 함수이름 등등 이름을 정할때 대표적인 표기 방법
// 카멜 표기법(camelCade), 스네이크표기법(snake_case)
// 카멜표기법 - 소문자 사이에 대문자를 사용하여 낙타의 등 처럼 표기(예 : studentChartDraw)
// 스네이크표기법 - 뱀이 지나가는 것처럼 언더바를 사용해 구분하여 표기(예 : student_chart_draw)
// 케밥표기법 - student-chart-draw( 모든 단어 사이에 하이픈(-)을 사용)
// 파스칼표기법 - StudentChartDraw( 모든 단어의 첫글자를 대문자로 표기)

$(function(){
    $("#detail_bt").click(function(){
        // console.log("안녕");
        $(".search_detail").toggleClass("hide");
        $(".search_detail").toggleClass("show");
    });

    $.getJSON("./data/test5.json",function(data){
        var teacher = data.담임;
        $("#main_title").text(data.학교명);

        school = data;

        $.each(data.학생,function(i,item){
            var tName = "";

            for(var t in teacher){ if(teacher[t].반 == item.반){ tName = teacher[t].이름; break;}}
            var r = item.시력.slice(0,3);
            var l = item.시력.slice(4);
            
            $("#list_wrap").append("<div class='info'>"+
            "<ul class='bt'><li class='name'>"+item.이름+"</li>"+
            "<li class='ban'>"+item.반+"반 </li>"+
            "<li class='myTeacher'> 담임 : "+tName+"</li>"+
            "<li class='t'>키 : "+item.키+"cm </li>"+
            "<li class='e'> 시력 : 좌"+r+" 우"+l+"</li>"+
            "<li class='w'> 몸무게 : "+item.몸무게+"kg </li>"+
            "</div>")
        });
    });

    $("#word").on("keyup", default_search);
    $("#word").next().click(default_search);

    $(".search_detail input").on("keyup",detail_search);
    $("#cls").change(function(){
        if(swt) // 반을 변경했을 때 detail_search함수실행이냐 차트 업데이트냐
            detail_search();
        else{
            var ban = $("#cls").val();
            std_chart.destroy();
            drawChart(ban);}
    });

    $("#chartBt").click(switchScreen);
});
function switchScreen(){
    var ban = $("#cls").val();
    if( ban==''){alert("먼저 반을 선택하세요"); return;}

    if( swt ){
        $(this).text("목록");
        $("#list_wrap").hide();
        $("#student_chart").show();
        $(".search_input").hide();
        $(".tall_range").hide();
        $(".eyes_range").hide();
        if(std_chart != '')std_chart.destroy();
        drawChart(ban);
        swt = false;
    }else {
        $(this).text("차트");
        $("#list_wrap").show();
        $("#student_chart").hide();
        $(".search_input").show();
        $(".tall_range").show();
        $(".eyes_range").show();
        swt=true;
    }
}
function drawChart(ban){
    var ctx = $("#student")[0];
// 선택한 반의 키를 구하기
    var tall=[];
    var name=[];
    var avg = 0, tot = 0; // 전체학생의 평균키에 사용할 변수
    $.each(school.학생,function(idx,std){
        tot += std.키;
        if(std.반 == ban){
            tall.push(std.키);
            name.push(std.이름);
        }
    });
    avg = tot/school.학생.length;

    console.log(avg, tot);
    std_chart = new Chart(ctx,{
        type:"bar",
        data:{
            labels:name,
            datasets:[
                {
                    data:tall,
                    backgroundColor: chartColor,
                    base:170,
                }
            ]
        },options:{
                scales:{
                    y:{min:150, max:200}
                }
            }
    })
}
function detail_search(){
    var minT=0, maxT=0, minE=0, maxE=0;
    minT = parseInt($("#minTall").val()==''?0: $("#minTall").val());
    maxT = parseInt($("#maxTall").val()==''?0: $("#maxTall").val());
    minE = parseInt($("#minEyes").val()==''?0: $("#minEyes").val());
    maxE = parseInt($("#maxEyes").val()==''?0: $("#maxEyes").val());

    var ban = $("#cls").val(); // 반 선택 값

    $(".info").filter(function(){
        var isShow=true;
        if(minT != 0 ){  //  상세 검색에서 키를 입력ㄷ했다면 minT변수는 0이 아니다
            var T=parseInt( $(this).find(".t").text().slice(3) ); 
// 화면에 표시된 키는 cm단위를 가지고있는 텍스트이기때문에 parseInt를 통해 앞쪽의 숫자만 걸러온다
            if( minT > T || maxT < T )
                isShow=false;
        }
        if(minE != 0 && isShow==false){ // 키 검색 한것에 추가 검색이 되도록 할것인지  
             //  키와 시력둘중하나 검색이되게 할것인지 정해야한다.
            var text = $(this).find(".e").text();
            var temp = [ parseFloat(text.slice(text.indexOf("좌")+1)) ,parseFloat(text.slice(text.indexOf("우")+1)) ];
            var E = Math.min(...temp);
            if(minE > E || maxE < E)
                isShow=false;
            else isShow=true;
        }
        if( isShow ){
            if( $(this).find(".ban").text().indexOf(ban) == -1 )
                isShow=false;
        }
        $(this).toggle(isShow);
    });
}

function default_search(){
    var word = $("#word").val();
    $(".info").filter(function(){
        $(this).toggle( $(this).find(".name").text().indexOf(word) > -1);
    });
}
