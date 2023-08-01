let ri = 1;



$(function(){
    $("#setImage").click(function(){
        var data=$("#imageName").val()+(ri++);

        $("#gallery").append("<div class='img_box'><img src='"+data+"'></div>");
    });
    $("#3n").click(function(){
        //$("#gallery").css("grid-template-columns","repeat(3, 1fr");
        $("#gallery").removeClass("grid-4n");
        $("#gallery").addClass("grid-3n");
        $("#gallery").removeClass("slide-active");
        $("#gallery").addClass("slide-off");
        $("#gallery").append($(".img_box"));
    });
    $("#4n").click(function(){
        $("#gallery").removeClass("grid-3n");
        $("#gallery").addClass("grid-4n");
        $("#gallery").removeClass("slide-active");
        $("#gallery").addClass("slide-off");
        $("#gallery").append($(".img_box"));
    })
     
    //슬라이드
    //https://loremflickr.com/1200/400/random
    $("#slide").click(function(){
        $("#gallery").removeClass("grid-3n");
        $("#gallery").removeClass("grid-4n");
        $("#gallery").removeClass("slide-off");
        $("#gallery").addClass("slide-active");
        $("#slide_box").append($(".img_box"));
        var len = $(".img_box").length;
        $("#slide_box").css("width",len*1200+"px");
    });


});
