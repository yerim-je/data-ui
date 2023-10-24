const section = $("#section");
const sections = $(".sections");
let movieScroll = 0;

$(function(){
    $("a").click(function(){
        let target = $(this).attr("href");
        let targetOffset = $(target).offset().top;
        $("html,body").animate({
            scrollTop: targetOffset
        }, 1000);
    })
})