// Modular JS file
MOBILE = (function ($) {

	var paged = 0,
		perPage = 0,
		$fallback = $('#tree-fallback'),
		$pagination = $('.touchpoint-articles-pagination'),
		doingAjax = false,

		findPagination = UTILS.debounce(function() {
			if( UTILS.inViewport($pagination) ) {
				infinteScrollPagination();
			}
		}, 50),

		init = function () {
			$(domReady);
		},

		domReady = function() {

			ssm.addState({
				id: 'mobile',
				maxWidth: 991,
				onEnter: function() {
					filtersDropdown();
					window.addEventListener('scroll', findPagination, false);
				},
				onLeave: function () {
					resetFiltersDropdown();
					window.removeEventListener('scroll', findPagination, false);
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

		renderPaginationContent = function(data) {
			if( data.results === true ) {

				var container = $('<div />');
				$(container).addClass('temp-new-content');
				$(container).html(data.content);

				$fallback.data('paged', data.paged);
				$fallback.append(container);

				$(container).slideUp(0);

				$pagination.removeClass('loading');

				$(container).slideDown(600, function() {
					$(this).find('.advent-day').unwrap();
					doingAjax = false;

					if( data.moar === false ) {
						window.removeEventListener('scroll', findPagination, false);
						$pagination.remove();
					}
				});
			}
		},

		infinteScrollPagination = function() {
			paged = $fallback.data('paged');
			perPage = $fallback.data('per-page');

			if( ! doingAjax ) {
				doingAjax = true;

				// Add loading gif
				$pagination.addClass('loading');

				// Get content ajax request
				if( paged === 0 ) {
					paged = 2;
				} else {
					paged++;
				}

				var args = {
					'action': 'waa_pagination_content',
					'paged': paged,
					'posts_per_page': perPage
				};

				MOD_AJAX.post(args, renderPaginationContent);
			}

		};

	return {
		go : init
	};

})(jQuery);

MOBILE.go();
