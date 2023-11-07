 export default function() {
    $(".rec_movie").on("mouseover", function () {
      $(this).find(".summary").show();
    });
    $(".rec_movie").on("mouseout", function () {
      $(this).find(".summary").hide();
    });
  };


  