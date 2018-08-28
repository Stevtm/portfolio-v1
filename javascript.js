// These make the navbar function as intended
$(document).ready(function(){
  // Disable Auto-Scrolling
  $(".carousel").carousel({
    interval: false
  });
  // Activate the carousel
  $("#nav_carousel").on('slide.bs.carousel', function(){
    $(".nav_carousel-target.active").removeClass("active");
        $('#nav_carousel').on('slide.bs.carousel', function() {
          var to_slide = $(".carousel-item.active").attr("data-slide-no");
          $(".nav-indicators li[data-slide-to=" + to_slide + "]").addClass("active");
        });
  })
})
$(document).ready(function () {
    $(function () {
        $('li a').click(function (e) {
            $('a').removeClass('active');
            $(this).addClass('active');
        });
    });

});
// These create the transition between landing page and info page
$(document).on("click","#enter_button", function () {
    var newUrl = $(this).attr("href");
    if (!newUrl || newUrl[0] === "#") {
        location.hash = newUrl;
        return;
    }
    $("html").fadeOut(function () {
        location = newUrl;
    });
    return false;
});
$(document).on("click","navbar_brand", function () {
    var newUrl = $(this).attr("href");
    if (!newUrl || newUrl[0] === "#") {
        location.hash = newUrl;
        return;
    }
    $("html").fadeOut(function () {
        location = newUrl;
    });
    return false;
});
// These are the slidetoggle animations for the portfolio carousel slide
$(document).ready(function(){
  $('#portfolio_site-click').click(function(){
    $('#portfolio_site').slideToggle("slow");
  });
});
$(document).ready(function(){
  $('#ileostomy-click').click(function(){
    $('#ileostomy').slideToggle("slow");
  });
});
$(document).ready(function(){
  $('#machine_design-click').click(function(){
    $('#machine_design').slideToggle("slow");
  });
});
$(document).ready(function(){
  $('#vermicomposting-click').click(function(){
    $('#vermicomposting').slideToggle("slow");
  });
});
$(document).ready(function(){
  $('#turbine-click').click(function(){
    $('#turbine').slideToggle("Slow");
  });
});
