$(function(){
    $("#keyword").on("keyup",function(){
        var word = $(this).val();
        $(".story").filter(function(){
            $(this).toggle($(this).children().text().indexOf(word) > -1);
        });
    });








    var cate = $("#category option").val();
    if(cate === "novel"){
        $(".story").filter(function(){
            $(this).toggle($(this).children("h3").text().indexOf("현대소설") > -1);
        });
    }else if(cate === "romance"){
        $(".story").filter(function(){
            $(this).toggle($(this).children("h3").text().indexOf("연애소설") > -1);
        })

    }
});