let isLogin=false;


$(function(){
    isLogin=getCookie("isLogin")=="true"? true:false;
    var id=getCookie("id");

    var login='';
    if(isLogin){    //로그인 성공
        login=`<div class="user">
        <p>${id}</p><a href="/?part=logout">로그아웃</a>
        </div>`
    }else { //로그인 실패또는 안한상태
        login='<div class="login_bt"><a href="/login">로그인</a></div>'
    }
    $("#side").append(login);
    setList();
    $("#word").on("keyup",searchWord);
    $(".modalBackground").click(function(){
        $(this).parent().hide();
    })
});
function qsSave(){
    $("#qsModal").hide();   // 완료 버튼 클리시 모달창 닫기
    //json 형식으로 값 전달하기
}
function searchWord(){
    var word = $("#word").val();
    $(".list").filter(function(){
        var t = $(this).find(".qsT").text().indexOf(word) > -1;
        var w = $(this).find(".qsW").text().indexOf(word) > -1;
        $(this).toggle( t || w );
    });
}
function setList(){
    $.getJSON("./data/question.json",function(data){
        $.each(data,function(i,t){
            $("tbody").append("<tr class='list'>"+
            "<td class='qsI'>"+t.id+"</td>"+
            "<td class='qsT'>"+t.title+"</td>"+
            "<td class='qsW'>"+t.writer+"</td>"+
            "<td class='qsD'>"+t.date+"</td>"+
            "<td class='qsTo'>"+( t.to == 0 ? '미확인':'답변완료')+"</td>"+
            "</tr>")
        })
    })
}
function questionWrite(){
    if( isLogin ){
        $("#qsModal").show();
    }else {
        var isOk=confirm("로그인 후 문의하실 수 있습니다. \n 로그인하시겠습니까?");
        if(isOk){
            location.href="/login";
        }
    }
}