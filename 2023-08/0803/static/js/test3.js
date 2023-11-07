
$(function(){
    $.getJSON("https://jsonplaceholder.typicode.com/photos", function(data){
        $(".thumbnail").each(function(i) {
            var randomIndex = Math.floor(Math.random() * data.length);
            var randomPhoto = data[randomIndex];
            $(this).data('id',randomPhoto.id);
            $(this).attr("src",randomPhoto.thumbnailUrl);
        });

        $(".thumbnail").click(function(){
            var id = $(this).data('id');
            $.getJSON("https://jsonplaceholder.typicode.com/photos?id=" + id, function(data){
                data = data[0];
                $("#original").attr("src", data.url);
                $("#title").text(data.title);
                $("#albId").text(data.albumId);
                $("#modal").show();
            });
        });
    });
    $("#modal_bg").click(function(){
        $("#modal").hide();
    });
});
