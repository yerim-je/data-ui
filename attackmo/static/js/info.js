$(function(){
    $(".rec_movie").append("<div class='summary'> 영화 줄거리</div>");
    $(".rec_movie").on("mouseover",function(){
        $(this).find(".summary").show();
    });
    $(".rec_movie").on("mouseout",function(){
        $(this).find(".summary").hide();
    });

})