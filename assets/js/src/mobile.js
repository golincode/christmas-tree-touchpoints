// Modular JS file
MOBILE = (function ($) {

	var paged = 0,
		perPage = 0,

		init = function () {
			$(domReady);
		},

		domReady = function() {

			ssm.addState({
				id: 'mobile',
				maxWidth: 991,
				onEnter: function() {
					filtersDropdown();
					infinteScrollPagination();
				},
				onLeave: function () {
					resetFiltersDropdown();
				}
			}).ready();

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
		},

		resetFiltersDropdown = function() {
			$('.tp-filter__list').slideDown(0);
			$('.tp-filter__title').css('cursor', 'default').removeClass('tp-filter__title--open');

			$('.tp-filter').off('click', '.tp-filter__title');
		},

		infinteScrollPagination = function() {
			var $fallback = $('#tree-fallback');

			paged = $fallback.data('paged');
			perPage = $fallback.data('per-page');



		};

	return {
		go : init
	};

})(jQuery);

MOBILE.go();
