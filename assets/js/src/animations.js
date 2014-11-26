// Modular JS file
ANIMATIONS = (function () {

	var MAXFLAKES = 10,
		snowflakes = [],

		init = function () {
			// Create the canvas and add to page
			flakes_canvas = document.createElement('canvas');
			flakes_canvas.setAttribute('id', 'flakes-canvas');
			document.getElementById('xmas-tree').appendChild(flakes_canvas);

			flakes_canvas.width = SETTINGS.main.width;
			flakes_canvas.height = (SETTINGS.main.height * 0.92);

			// Get the canvas Context to draw to
			ctx = flakes_canvas.getContext('2d');

			makeParticle(10);
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
				particle.velX = Math.random()*3 - 0.75; 
				switch(imgNum) {
					case(1):
						particle.velY = UTILS.random(4,8);
						break;
					case(2):
						particle.velY = UTILS.random(2,6);
						break;
					default:
						particle.velY = UTILS.random(1,4);
						break;
				}
				
				particle.size = 1;
				particle.gravity = 0;
				
				// add it to the array
				snowflakes.push(particle); 
			}
		},

		snowflakes_loop = function() {			
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
			 
			// while(snowflakes.length>MAXFLAKES)
			// 	snowflakes.shift(); 
			
		},

		twinkles = function () {

		};

	return {
		go : init
	};

})();
