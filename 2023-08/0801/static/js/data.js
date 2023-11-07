

$(function(){
    // input 태그에 키보드를 눌렀다가 떼는 경우에 동작 - keyup
    // input 태그에 키보드를 눌렀을 경우 동작 - keydown
    $("#search_word").on("keyup",function(){    // 검색기능
       var word = $(this).val();
       // 함수 안에 함수를 넣는 것을 콜백이라고 한다.
       $("#mydata tr").filter(function(){
            $(this).toggle($(this).text().indexOf(word) > -1);
            // true일 경우에만 화면에 표시 false는 화면에 표시되지 않음.
            // index는 0부터 시작하기 때문에 -1인 경우는 같지 않을 때 나온다.
            // toggle은 true와 false로 표시해줄 수 있다.
            // text는 배열로 저장된다. (indexOf로 찾을 중복값을 찾을 수 있음)
       });
    });
});