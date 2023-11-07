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
    $(".des a").hover(
        function(){
            $(this).animate({top:-5},'fast');
        },
        function(){
            $(this).animate({top:0},'fast');
        }
    )
    var imgs = $('.pj_2 .pj_img img');
    var currentIndex = 0;

    imgs.eq(currentIndex).show();

    function nextImage() {
        imgs.eq(currentIndex).hide();
        currentIndex = (currentIndex + 1) % imgs.length;
        imgs.eq(currentIndex).show();
    }

    var slideInterval = setInterval(nextImage, 5000);

    imgs.mouseover(function() {
        clearInterval(slideInterval);
    });

    imgs.mouseout(function() {
        slideInterval = setInterval(nextImage, 5000);
    });
})