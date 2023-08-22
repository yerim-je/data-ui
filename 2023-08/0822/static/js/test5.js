$(function(){
    $("#detail_bt").click(function(){
        // console.log("안녕");
        $(".search_detail").toggleClass("hide");
        $(".search_detail").toggleClass("show");
    });

    $.getJSON("./data/test5.json",function(data){
        var teacher = data.담임;
        $("#main_title").text(data.학교명);

        $.each(data.학생,function(i,item){
            var tName = "";

            for(var t in teacher){ if(teacher[t].반 == item.반){ tName = teacher[t].이름; break;}}
            var r = item.시력.slice(0,3);
            var l = item.시력.slice(4);
            
            $("#list_wrap").append("<div class='info'>"+
            "<ul class='bt'><li class='name'>"+item.이름+"</li>"+
            "<li class='ban'>"+item.반+"반 </li>"+
            "<li class='myTeacher'> 담임 : "+tName+"</li>"+
            "<li class='t'> 키 : "+item.키+"cm </li>"+
            "<li class='e'> 시력 : 좌"+r+" 우"+l+"</li>"+
            "<li class='w'> 몸무게 : "+item.몸무게+"kg </li>"+
            "</div>")
        });
    });

    $("#word").on("keyup", default_search);
    $("#word").next().click(default_search);

    $(".search_detail input").on("keyup",detail_search);
    $("#cls").change(detail_search);
});

function detail_search(){
    var minT=0, maxT=0, minW=0, maxW=0;
    minT = parseInt($("#minTall").val()==''?0: $("#minTall").val());
    maxT = parseInt($("#maxTall").val()==''?0: $("#maxTall").val());
    minW = parseInt($("#minEyes").val()==''?0: $("#minEyes").val());
    maxT = parseInt($("#maxEyes").val()==''?0: $("#maxEyes").val());
    var isShow = true;
    $(".info").filter(function(){
        if(minT != 0){  // 상세검색에서 키를 입력했다면 minT변수는 0이 아니다.
            var T =  parseInt( $(this).find(".t").text().slice(3) )
            //화면에 표시된 키는 cm단위를 가지고 있기 때문에 앞의 숫자만 parseInt로 걸러온다.
            if(minT > T || maxT < T)
                isShow = false;
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

