// Modular JS file
CONTENT = (function ($) {

	var CONTENT = [],

		init = function () {
			var loader = $('<div />');

			$(loader).addClass('touchpoints-loading-content');
			$(loader).html('<p>Loading stories...</p>');
			$('#xmas-tree').append(loader);

			var args = {
				'action': 'waa_get_tp_content'
			};

			MOD_AJAX.post(args, prepareDayItems);

			$('#xmas-tree').on('click', '.advent-day__close', closePopup);
		},

		prepareDayItems = function(data) {
			var content = data.data,
				dayItems = [],
				dayContent = false;

			for( var day in content ) {
				dayContent = content[day];

				dayItems.push(dayContent.types);
			}

			XMAS_TREE.setupDays(DAYS, dayItems);

			removeLoader();

			prepareDayContent(content);
		},

		prepareDayContent = function(content) {

			for( var idx in content ) {

				var day = parseInt(idx) + 1,
					dayContent = content[idx].content;

				CONTENT[day] = [];

				for( var i=0; i<dayContent.length; i++) {

					CONTENT[day].push(dayContent[i]);

				}
			}

		},

		renderContentPopup = function(day, idx) {
			var content = CONTENT[day][idx],
				popup = '';


			popup += '<div class="advent-day__image--square" style="background-image:url(' + content.image + ');"></div>';
			popup += '<div class="advent-day__content">';
			popup += '<h3><i class="advent-day__icon advent-day__icon--' + content.type + '"></i>' + content.title + '</h3>';
			popup += '<p>' + content.content + '</p>';
			popup += '<p><a href="' + content.link + '">Read more &rsaquo;</a></p>';
			popup += '</div>';
			popup += '<button type="button" class="advent-day__close"></button>';

			var section = document.createElement('section');
			section.className = 'advent-day__item advent-day__item--popup';
			section.innerHTML = popup;
			section.style.display = 'none';

			$('#xmas-tree').append(section);
			$(section).fadeIn();
		},

		closePopup = function(e) {
			e.preventDefault();

			$('#xmas-tree').find('.advent-day__item--popup').fadeOut(400, function () {
				$(this).remove();
			});

		},

		removeLoader = function() {
			$('.touchpoints-loading-content').fadeOut(400, function() {
				$(this).remove();
			});
		};

	return {
		go : init,

		renderContent : renderContentPopup
	};

})(jQuery);
