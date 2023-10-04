$(function(){
    $("#soju").click(function(){
        $("#soju_list").slideToggle();
    });
    $("#beer").click(function(){
        $("#beer_list").slideToggle();
    });
    $("#liquor").click(function(){
        $("#liquor_list").slideToggle();
    });
    
    $(".image").mouseover(function(){
        $(this).find('.big').show();
    });
    $(".image").mouseleave(function(){
        $(this).find('.big').hide();
    });
});