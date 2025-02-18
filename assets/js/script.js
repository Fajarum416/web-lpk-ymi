$(document).ready(function() {

    // HAMBURGER MENU
    $('.icon-menu').click(function () {
        $('.navSp').toggleClass('active');
        $('.navSp').stop().slideToggle("slow");
        $(this).toggleClass('is-active');
    });

    $('.navSp .hasChild i').click(function() {
        $(this).parent().children('ul.ddown-sp').stop().slideToggle();
        $(this).toggleClass('_show');
    });

    $('.navSp .linkSp').click(function() {
        $('.navSp').removeClass('active');
        $('.navSp').stop().slideUp("slow");
        $('.icon-menu').removeClass('is-active');
    }) ;



    }
);


$(window).scroll(function () {
    st = $(this).scrollTop();

    if (st > 100) {
        $('#header-fixed').addClass('bg');
	} else {
        $('#header-fixed').removeClass('bg');
	};
});



