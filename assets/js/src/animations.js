// Modular JS file
ANIMATIONS = (function () {

	var MAXFLAKES = 200,
		snowflakes = [],
		twinkles = [],
		delayCounter = 0,
		delayTime = 15,
		twinkleDelayCount = 0,
		twinkleDelayTime = 2,
		twinkleTargets = [],

		initSnowflakes = function () {
			// Create the canvas and add to page
			flakes_canvas = document.createElement('canvas');
			flakes_canvas.setAttribute('id', 'flakes-canvas');
			document.getElementById('xmas-tree').appendChild(flakes_canvas);

			flakes_canvas.width = SETTINGS.main.width;
			flakes_canvas.height = SETTINGS.main.height;

			// Get the canvas Context to draw to
			ctx = flakes_canvas.getContext('2d');

			makeParticle(1);
			setInterval(snowflakes_loop, 1000 / 30);
		},

		makeParticle = function(particleCount) {
			var velYMin = 1,
				velYMax = 6;

			for(var i=0; i<particleCount;i++) {
				var imgNum = UTILS.random(1,3,1);
				snowflakeImage = UTILS.getImage('snow-flakes','small-' + imgNum);

				// create a new particle in the middle of the stage
				var particle = new imageParticle(snowflakeImage, UTILS.random(-20,SETTINGS.main.width-50, 1), UTILS.random(-50,0, 1));
				//var particle = new ImageParticle(particleImage, mouseX, mouseY);

				// give it a random x and y velocity
				// particle.velX = UTILS.random(0.1,3);
				particle.velX = Math.random()*2 - 0.75;
				switch(imgNum) {
					case(1):
						particle.velY = UTILS.random(2,4);
						break;
					case(2):
						particle.velY = UTILS.random(2,3);
						break;
					default:
						particle.velY = UTILS.random(1,2);
						break;
				}

				particle.size = 1;
				particle.gravity = 0;

				// add it to the array
				snowflakes.push(particle);
			}
		},

		snowflakes_loop = function() {
			// Make particles
			if( delayCounter > delayTime ) {
				makeParticle(1);
				delayCounter = 0;
			}

			// clear the canvas
		  	ctx.clearRect(0,0, SETTINGS.main.width, SETTINGS.main.height);

		  	// iteratate through each particle
			for (i=0; i<snowflakes.length; i++) {
				var particle = snowflakes[i];

				// render it
				particle.render(ctx);

				// and then update. We always render first so particle
				// appears in the starting point.
				particle.update();
			}

			delayCounter++;

			while(snowflakes.length>MAXFLAKES)
				snowflakes.shift();

		},

		initTwinkles = function () {
			// Get items
			var twinkleCount = ( DAYS > 4 ) ? 4 : DAYS;

			twinkleTargets = UTILS.shuffle(TARGETS).slice(-twinkleCount);

			twinkle_canvas = document.createElement('canvas');
			twinkle_canvas.setAttribute('id', 'twinkle-canvas');
			document.getElementById('xmas-tree').appendChild(twinkle_canvas);

			twinkle_canvas.width = SETTINGS.main.width;
			twinkle_canvas.height = SETTINGS.main.height;

			// Get the canvas Context to draw to
			tctx = twinkle_canvas.getContext('2d');

			setInterval(twinkles_loop, 1000 / 30);
		},


		twinkles_loop = function() {
			// Make particles
			if( twinkleDelayCount > twinkleDelayTime ) {
				for( i=0; i<twinkleTargets.length;i++ ) {
					makeTwinkleParticle(1, twinkleTargets[i]);
				}
				twinkleDelayCount = 0;
			}


			// clear the canvas
		  	tctx.clearRect(0,0, SETTINGS.main.width, SETTINGS.main.height);

		  	// iteratate through each particle
			for (i=0; i<twinkles.length; i++) {
				var particle = twinkles[i];

				// render it
				particle.render(tctx);

				// and then update. We always render first so particle
				// appears in the starting point.
				particle.update();
			}

			twinkleDelayCount++;

			while(twinkles.length>MAXFLAKES)
				twinkles.shift();

		},

		makeTwinkleParticle = function(particleCount, target) {
			var twinkleImage = UTILS.getImage('twinkles','twinkle-big'),
				startX = target.x + (target.size/2),
				startY = target.y + (target.size/2);

			for(var i=0; i<particleCount;i++) {

				// create a new particle in the middle of the stage
				var particle = new imageParticle(twinkleImage, startX, startY);

				particle.velX = UTILS.random(-3,3);
				particle.velY = UTILS.random(-3,3);

				particle.size = UTILS.random(0.2,0.4);
				particle.gravity = 0;
				particle.drag = 1;
				particle.shrink = 1.07;
				particle.fade = 0.06;

				// add it to the array
				twinkles.push(particle);
			}
		};

	return {
		snow : initSnowflakes,
		twinkles : initTwinkles
	};

})();
