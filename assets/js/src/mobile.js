// Modular JS file
MOBILE = (function ($) {

	var $fallback = $('#tree-fallback'),
		$pagination = $('.touchpoint-articles-pagination'),
		paged = 0,
		perPage = $fallback.data('per-page'),
		postID = $fallback.data('post-id'),
		doingAjax = false,
		FILTERS = {},

		findPagination = UTILS.debounce(function() {
			if( UTILS.inViewport($pagination) ) {
				infinteScrollPagination();
			}
		}, 150),

		init = function () {
			$(domReady);
		},

		domReady = function() {

			ssm.addState({
				id: 'mobile',
				maxWidth: 991,
				onEnter: function() {
					readyFilters();
					filtersDropdown();

					if( $pagination.length ) {
						$(window).on('scroll', findPagination);
					}

					$('.tp-filter').on('click', '.toggle-switch__option', prepareFilter);
				},
				onLeave: function () {
					resetFiltersDropdown();

					$(window).off('scroll', findPagination);
					$('.tp-filter').off('click', '.toggle-switch__option', prepareFilter);
				}
			}).ready();

		},

		filtersDropdown = function () {

			$('.tp-filter__list').slideUp(0).css({
				'position': 'absolute',
				'left': 0,
				'top': $('.tp-filter__title').height
			});

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
			$('.tp-filter__list').slideDown(0).css({
				'position': '',
				'left': '',
				'top': ''
			});

			$('.tp-filter__title').css('cursor', 'default').removeClass('tp-filter__title--open');
			$('.tp-filter').off('click', '.tp-filter__title');

		},

		readyFilters = function() {
			var filters = $('input.toggle-switch__input');

			for( var i=0; i<filters.length; i++ ) {
				name = $(filters[i]).val();

				FILTERS[name] = $(filters[i]).prop('checked');
			}
		},

		prepareFilter = function () {
			var $this = $(this),
				forInput = $this.attr('for'),
				$input = $('input#' + forInput),
				name = $input.val();

			setTimeout(function () {
				FILTERS[name] = $input.prop('checked');
				applyFilter(name, FILTERS[name], 400);
			}, 400);
		},

		applyFilter = function(name, setting, timing) {

			var adventDays = $('.advent-day').find('.advent-day__container');

			if( setting ) {
				$('.advent-day__item--' + name).slideDown(timing, function() {
					for( var i=0; i < adventDays.length; i++ ) {

						if( $(adventDays[i]).height() > 50 && $(adventDays[i]).find('.advent-day__empty').length ) {

							$(adventDays[i]).find('.advent-day__empty').remove();

						}
					}
				});
			} else {
				$('.advent-day__item--' + name).slideUp(timing, function() {
					for( var i=0; i < adventDays.length; i++ ) {

						if( $(adventDays[i]).height() < 50 && $(adventDays[i]).find('.advent-day__empty').length < 1 ) {

							$(adventDays[i]).prepend('<p class="advent-day__empty">No stories avaiable</p>');

						}
					}
				});
			}
		},

		renderPaginationContent = function(data) {

			if( data.results === true ) {

				if( data.moar === false ) {
					$(window).off('scroll', findPagination);
					$pagination.remove();
				}

				var container = $('<div />');
				$(container).addClass('temp-new-content');
				$(container).html(data.content);
				$fallback.append(container);

				$fallback.data('paged', data.paged);

				$(container).slideUp(0);

				$pagination.removeClass('loading');

				$(container).slideDown(600, function() {
					$(this).find('.advent-day').unwrap();

					for( var key in FILTERS ) {
						if( FILTERS[key] === false ) {
							applyFilter(key, false, 0);
						}
					}

					doingAjax = false;
				});
			}
		},

		infinteScrollPagination = function() {

			if( ! doingAjax ) {
				doingAjax = true;

				paged = $fallback.data('paged');

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
					'posts_per_page': perPage,
					'post_id': postID
				};

				MOD_AJAX.post(args, renderPaginationContent);

			}

		};

	return {
		go : init
	};

})(jQuery);

MOBILE.go();
