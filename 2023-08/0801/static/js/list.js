

$(function(){
    $("#keyword").on("keyup",function(){
        var word = $(this).val();
        $(".data img").filter(function(){
            $(this).parent().toggle($(this).attr("alt").indexOf(word) > -1 );
        });
    });
});
// attr() - 속성가져오기 