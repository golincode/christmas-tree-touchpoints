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
		};

	return {
		loadImages : imageLoader,
		getImage : getImage,
		random : randomNumber,
		setPosNeg : setPositionSubtraction,
		setPosAdd : setPositionAddition,
		shuffle : shuffleArray,

		winW : windowWidth,
		winH : windowHeight
	};

})();
