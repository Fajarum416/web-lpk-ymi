// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 2);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // if(Math.abs(lastScrollTop - st) <= delta)
    //     return;
    // if (st > lastScrollTop && st > navbarHeight){
    //     // Scroll Down
    //     $('.header').addClass('header--up');
    // } else {
    //     // Scroll Up
    //     if(st + $(window).height() < $(document).height()) {
    //         $('.header').removeClass('header--up')
    //     }
	// }
	
	if (st > 10) {
		$('.header').addClass('header--solid');
	} else {
		$('.header').removeClass('header--solid');
	}
    
    lastScrollTop = st;
}

$(document).ready(function () {

	//Header Drawer
	$('.header__drawer-btn').click(function () {
		$(this).toggleClass('_active');
		$('.header').toggleClass('header--tp');
		$('.header__logo').toggleClass('_logo-white');
		$('.header__back').toggleClass('_icon-white');
		$('.drawer').toggleClass('_show');
		$('.hwds').toggleClass('_true');
		$('body').toggleClass('no-overflow');
	});
    
    // Show Hide Summernote's Toolbar
    $('.sn-editor-toolbar-btn').click(function () {
        $(this).siblings('.note-editor.note-frame.card').find('.note-toolbar.card-header').slideToggle();
        // $(this).find('svg').toggleClass('fa-times', 'fa-ellipsis-v')
    });

    // Slicing Question
    var soalShow = 1
    $('.question-set .form-set').slice( 1, 10).slideUp();

    $('.question-set .add-question').click(function () {
        $(this).parent().find('.form-set[style="display: none;"]:first').slideDown();
        soalShow ++

        if (soalShow > 9) {
            $(this).css('display', 'none');
        }
    });
});

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