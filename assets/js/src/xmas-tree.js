// Modular JS file
XMAS_TREE = (function () {

	// Breakpoints
	// Useful variables (for size and position)
	var	canvas = null,
		c = null, // init the context variable

		days = DAYS,
		branches = DAYS + 2,

		start = {
			left: UTILS.winW / 2,
			top: 100
		},

		hTop = 125, // Top section of the tree
		hMiddle = 65 * branches, // Middle section of branches
		hBottom = 60 + (2*branches), // bottom section of the tree

		init = function () {
			// Create the canvas and add to page
			canvas = document.createElement('canvas');
			canvas.setAttribute('id', 'tree-canvas');
			document.getElementById('xmas-tree').appendChild(canvas);
			document.getElementById('tree-fallback').style.display = 'none';
			// document.body.appendChild(canvas);

			canvas.width = UTILS.winW;
			// Add ALL THE THINGS
			canvas.height = start.top + hTop + hMiddle + hBottom + RENDER.trunkHeight + 60; // + 60 for presents - keeps the background in a good place

			// Get the canvas Context to draw to
			c = canvas.getContext('2d');

			UTILS.loadImages(RENDER.images, buildTree);
		},

		buildTree = function() {

			RENDER.trunk(c, branches);
			RENDER.tree(c, false); // Right side
			RENDER.tree(c, true); // Left side

			// highlightBranches();

			RENDER.leaves(c, branches);
			RENDER.decs(c);

			// This needs to be called by the content setup function
			// setupDays(days);

			RENDER.snow(c);

			CONTENT.go();
		},

		setupDays = function(days, itemsArray) {

			var items = [],
				ribbonBranch = branches + 1,
				rows = 1;

			for( var i=0; i<days; i++ ) {
				var branch = ribbonBranch - i,
					day = i + 1;

				if( i >= (days - 2) ) {
					--branch;
					--ribbonBranch;
					rows = 2;
				}

				items = itemsArray[i];

				RENDER.ribbon(c, day, branch);
				RENDER.items(c, branch, day, items, rows);
			}

			canvas.onclick = INTERACTIONS.clickHandler;
			document.addEventListener('mousemove', INTERACTIONS.hover, false);
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
		go : init,
		setupDays : setupDays,

		days : days,
		branches : branches,

		treeTop : hTop,
		treeMiddle : hMiddle,
		treeBottom : hBottom,

		start : start
	};

})();

if( window.innerWidth > 992 ) {
	XMAS_TREE.go();
}

