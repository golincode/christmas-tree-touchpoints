// Modular JS file
UTILS = (function () {

	// Breakpoints
	var windowWidth = 1170, // window.innerWidth,
		windowHeight = window.innerHeight,

		imageLoader = function(images, callback) {
			var imageCount = 0,
				loaded = 0,
				path = '/wp-content/plugins/christmas-tree-touchpoints/images/'; // Get this from the HTML

			for( var dir in images ) {
				imageCount += images[dir].length;
			}
			for( dir in images ) {
				var imgArray = images[dir];
				ASSETS[dir] = [];

				for( var i=0; i<imgArray.length; i++) {
					var filename = imgArray[i];

					ASSETS[dir][filename] = new Image();
					ASSETS[dir][filename].src = path + dir + '/' + filename + '.png';

					ASSETS[dir][filename].onload = function() {
						if(++loaded >= imageCount) {
							callback();
						}
					};
				}
			}
		},

		getImage = function(group, imageName) {
			return ASSETS[group][imageName];
		},

		randomNumber = function(min, max, wholeNumber) {
			wholeNumber = wholeNumber || 0;
			var rand = (Math.random() * (max - min + wholeNumber)) + min;
			return wholeNumber ? ~~rand : rand;
		},

		setPositionSubtraction = function(cur, mod, leftSide) {
			if( leftSide ) {
				return cur - mod;
			} else {
				return cur + mod;
			}
		},

		setPositionAddition = function(cur, mod, leftSide) {
			if( leftSide ) {
				return cur + mod;
			} else {
				return cur - mod;
			}
		},

		shuffleArray = function (arr){ //v1.0
			for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);

			return arr;
		},

		isElementInViewport = function(el) {

			//special bonus for those using jQuery
			if (typeof jQuery === "function" && el instanceof jQuery) {
				el = el[0];
			}

			var rect = el.getBoundingClientRect();

			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
			);
		},

		debounce = function(func, wait, immediate) {
			var timeout;
			return function() {
				var context = this, args = arguments;
				var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		},

		/**
		 * Function to highlight each branches area on the tree.
		 * Use these calculations to work out the range to place
		 * items on the tree
		 *
		 * @author Adam Onishi (aonishi@wearearchitect.com)
		 */
		highlightBranches = function() {
			var pos = {
				x: start.left,
				y: start.top + hTop
			};

			var color = 0;

			for( var i=0; i<=branches; i++ ) {
				color+= 50;

				c.fillStyle = 'hsla(' + color + ',100%,50%,0.3)';

				highlightW = ((15*i) - 30) * 2;
				highlightH = 65;

				if( i === branches ) {
					highlightH = hBottom;
					highlightW+= 20;
				}

				c.fillRect(pos.x-highlightW/2,pos.y, highlightW, highlightH );
				pos.y+=65;
			}
		};

	return {
		loadImages : imageLoader,
		getImage : getImage,
		random : randomNumber,
		setPosNeg : setPositionSubtraction,
		setPosAdd : setPositionAddition,
		shuffle : shuffleArray,
		inViewport : isElementInViewport,
		debounce : debounce,

		winW : windowWidth,
		winH : windowHeight
	};

})();
