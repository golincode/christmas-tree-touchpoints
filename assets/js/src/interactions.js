// Modular JS file
INTERACTIONS = (function ($) {

	var mouseX = 0,
		mouseY = 0,
		itemSize = 40,

		hoverEffect = function (e) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;

			var cnv = document.getElementById('tree-canvas');

			sx = cnv.offsetWidth / cnv.width;
			sy = cnv.offsetHeight / cnv.height;

			cnv.style.cursor = 'default';

			for (var i = 0; i < TARGETS.length; i++) {
				var size = TARGETS[i].size * sx,
					tX = TARGETS[i].x * sx,
					tY = TARGETS[i].y * sy;

				if( size > 40 ) {
					size -= 20 *sx;
					tX += 10*sx;
					tY += 10*sy;
				}

				if (mouseX < tX + size && mouseX > tX && mouseY > tY && mouseY < tY + size) {
					cnv.style.cursor = 'pointer';
				}
			}
		},

		clickHandler = function(e) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;

			var cnv = document.getElementById('tree-canvas');

			sx = cnv.offsetWidth / cnv.width;
			sy = cnv.offsetHeight / cnv.height;

			for (var i = 0; i < TARGETS.length; i++) {
				var size = TARGETS[i].size * sx,
					tX = TARGETS[i].x * sx,
					tY = TARGETS[i].y * sy;

				if( size > 40 ) {
					size -= 20 *sx;
					tX += 10*sx;
					tY += 10*sy;
				}

				if (mouseX < tX + size && mouseX > tX && mouseY > tY && mouseY < tY + size) {
					// open popup!
					var day = TARGETS[i].day,
						idx = TARGETS[i].idx;

					if( $('.advent-day__item--popup').length ) {
						CONTENT.close();
					}
				
					CONTENT.renderContent(day, idx);
				}
			}
		},

		filtersDropdown = function () {

			$('.tp-filter__list').slideUp();
		};

	return {
		clickHandler : clickHandler,
		hover : hoverEffect
	};

})(jQuery);
