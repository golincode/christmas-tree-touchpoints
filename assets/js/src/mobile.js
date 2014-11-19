// Modular JS file
MOBILE = (function ($) {

	var init = function () {
			$(domReady);
		},

		domReady = function() {
			if( window.innerWidth <= 992 ) {
				filtersDropdown();
			}
		},

		filtersDropdown = function () {

			$('.tp-filter__list').slideUp(0);
			$('.tp-filter__title').css('cursor', 'pointer');

			$('.tp-filter').on('click', '.tp-filter__title', function() {
				var $this = $(this);

				if( $this.hasClass('tp-filter__title--open') ) {
					$('.tp-filter__list').stop().slideUp();
				} else {
					$('.tp-filter__list').stop().slideDown();
				}

				$this.toggleClass('tp-filter__title--open');
			});
		};

	return {
		go : init
	};

})(jQuery);

MOBILE.go();
