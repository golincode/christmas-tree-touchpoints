// Modular JS file
RENDER = (function () {

	// Breakpoints
	var trunkWidth = 80,
		trunkHeight = 130,

		imgSources = {
			'background': ['background'],
			'snow-flakes': ['big-1', 'big-2', 'big-3', 'small-1', 'small-2', 'small-3'],
			'decorations': ['bell', 'candy-stick', 'yellow-ribbon', 'star', 'presents'],
			'items': ['facebook', 'facebook-glow', 'twitter', 'twitter-glow', 'news', 'news-glow', 'youtube', 'youtube-glow', 'offer', 'offer-glow', 'yammer', 'yammer-glow' ],
			'ribbon-big': ['ribbon', 'ribbon-glow'],
			'leaves': ['top', 'left-1', 'left-2', 'left-3', 'left-4', 'middle-1', 'middle-2', 'middle-3', 'middle-4', 'right-1', 'right-2', 'right-3', 'right-4', 'side-left-1', 'side-left-2', 'side-right-1', 'side-right-2'],
			'twinkles': ['twinkle', 'twinkle_x2']
		},

		treeSide = function(c, leftSide) {
			var posX = XMAS_TREE.start.left,
				posY = XMAS_TREE.start.top,
				curX = 0,
				curY = 0;

			if( leftSide ) {
				posX++;
			}

			// Set fill style (colour - green)
			c.fillStyle = '#20511e';

			c.beginPath();
			c.moveTo(posX,posY);

			// Top of the tree
			// down
			posY += 120;
			curY = XMAS_TREE.start.top + 80;
			posX = UTILS.setPosNeg(posX, 85, leftSide);
			curX = UTILS.setPosNeg(XMAS_TREE.start.left, 20, leftSide);

			c.quadraticCurveTo(curX,curY,posX,posY);

			// back
			posY += 5;
			curY = posY + 10;
			posX = UTILS.setPosAdd(posX, 50, leftSide);
			curX = UTILS.setPosAdd(posX, 10, leftSide);

			c.quadraticCurveTo(curX,curY,posX,posY);

			// Loop through branches...
			for(var i=0; i<XMAS_TREE.branches; i++) {

				// down
				posY += 30;
				curY = posY;

				posX = UTILS.setPosNeg(posX, 80, leftSide);
				curX = UTILS.setPosAdd(posX, 55, leftSide);

				c.quadraticCurveTo(curX,curY,posX,posY);

				// back
				posY += 35;
				curY = posY;
				posX = UTILS.setPosAdd(posX, 65, leftSide);
				curX = UTILS.setPosNeg(posX, 55, leftSide);

				c.quadraticCurveTo(curX,curY,posX,posY);
			}

			posY += 30;
			curY = posY + 5;

			posX = UTILS.setPosNeg(posX, 90, leftSide);
			curX = UTILS.setPosAdd(posX, 60, leftSide);

			c.quadraticCurveTo(curX,curY,posX,posY);

			// back to XMAS_TREE.start
			posY += 40 + (2*XMAS_TREE.branches);
			curX = UTILS.setPosAdd(posX, 60, leftSide);

			c.quadraticCurveTo(curX,posY,XMAS_TREE.start.left,posY);

			c.closePath();
			c.fill();
		},

		trunk = function(c, branches) {
			var trunkTop = XMAS_TREE.treeTop + XMAS_TREE.treeMiddle + XMAS_TREE.treeBottom - 10,
				trunkBottom = trunkTop + trunkHeight - 30;

			c.fillStyle = '#51321e';
			c.fillRect(XMAS_TREE.start.left - (trunkWidth/2), XMAS_TREE.start.top + trunkTop, trunkWidth, trunkHeight);

			presents(c, trunkBottom);
		},

		presents = function(c, trunkBottom) {
			var imgPresents = UTILS.getImage('decorations', 'presents');

			var imgW = imgPresents.width,
				imgH = imgPresents.height,
				imgPX = XMAS_TREE.start.left - (imgW/2),
				imgPY = XMAS_TREE.start.top + trunkBottom - (imgH/2);


			c.drawImage(imgPresents, imgPX, imgPY);
		},

		star = function(c) {
			var imgStar = UTILS.getImage('decorations', 'star'),
				imgW = imgStar.width,
				imgH = imgStar.height,
				imgPX = XMAS_TREE.start.left - (imgW/2),
				imgPY = XMAS_TREE.start.top - (imgH/2) + 40;

			c.drawImage(imgStar, imgPX, imgPY);
		},

		/**
		 * renderbranches
		 * - Render branches down the center of the tree first
		 * - Use specific branches for the edges and render outwards
		 * - Calculate the center portion of the tree and where the branches will be
		 *
		 */
		leaves = function(c, branches) {
			var leaves = [],
				top = {
					x: XMAS_TREE.start.left,
					y: XMAS_TREE.start.top + 15
				},
				sides = {
					x: 0,
					y: 0
				},
				middle = {
					x: 0,
					y: 0
				},
				yMod = 0,
				i = 0, // init loop counter
				img = null; // init image variable

			// GET IMAGES
			for( var idx in imgSources.leaves ) {
				var name = imgSources.leaves[idx];
				leaves[name] = UTILS.getImage('leaves', name);
			}

			// TOP LEAVES OF THE TREE
			var imgCenX = leaves.top.width/2;
			top.x -= imgCenX;
			c.drawImage(leaves.top, top.x, top.y);

			top.x = XMAS_TREE.start.left + 10;
			top.y += leaves.top.height - 60;
			c.drawImage(leaves['right-3'], top.x, top.y );

			// SIDE LEAVES OF THE TREE
			for( i=2; i<=branches; i++ ) {
				var sideMod = (35 + 85 + (15*i));
				var side = UTILS.random(1, 2, 1);
				sides.y = XMAS_TREE.start.top + XMAS_TREE.treeTop + (65 * i) + 15;

				// left side
				sides.x = XMAS_TREE.start.left - sideMod;
				c.drawImage(leaves['side-left-' + side], sides.x, sides.y);

				// right side
				sides.x = XMAS_TREE.start.left + sideMod - leaves['side-right-' + side].width;
				c.drawImage(leaves['side-right-' + side], sides.x, sides.y);
			}

			// CENTER LEFT/RIGHT
			for( i=3; i<=branches; i++ ) {
				img = leaves['left-' + UTILS.random(1,4,1)];

				middle.y = XMAS_TREE.start.top + XMAS_TREE.treeTop + (65 * i);

				middle.x = XMAS_TREE.start.left - (65 + (15*i)) + UTILS.random(-10,10,1);
				c.drawImage(img, middle.x, middle.y);

				img = leaves['right-' + UTILS.random(1,4,1)];

				middle.x = XMAS_TREE.start.left + (60 + (15*i)) + UTILS.random(-10,10,1) - img.width;
				c.drawImage(img, middle.x, middle.y);
			}

			// CENTER LEAVES
			for( i=3; i<=branches+1; i++ ) {
				var yAdd = UTILS.random(0, 10, 1);

				if( i >= branches ) {
					yAdd = -10;
				}

				middle.y = XMAS_TREE.start.top + XMAS_TREE.treeTop + (65 * i) + yAdd;

				var area = ((15*i) - 30) * 2,
					middleBlocks = Math.floor(area/80);

				middleBlocks = (middleBlocks === 0) ? 1 : middleBlocks;

				for( var b=0; b<middleBlocks; b++ ) {

					img = leaves['middle-' + UTILS.random(1,4,1)];

					if( middleBlocks === 1 ) {
						middle.x = XMAS_TREE.start.left - (img.width/2) + UTILS.random(-10, 10, 1);
					} else {
						middle.x = XMAS_TREE.start.left - (area/2) + (UTILS.random(80, 90, 1)  * b);
					}

					c.drawImage(img, middle.x, middle.y);
				}
			}
		},

		decs = function(c, decorations) {
			star(c);

			var decs = [],
				pos = {
					x:XMAS_TREE.start.left,
					y:XMAS_TREE.start.top
				};

			decs.bell = UTILS.getImage('decorations', 'bell');
			decs['candy-stick'] = UTILS.getImage('decorations', 'candy-stick');
			decs['yellow-ribbon'] = UTILS.getImage('decorations', 'yellow-ribbon');



			pos.x += 40;
			pos.y += XMAS_TREE.treeTop - 20;

			c.drawImage(decs['candy-stick'], pos.x, pos.y);

			pos.x = XMAS_TREE.start.left - decs.bell.width/2 - 40;
			pos.y += 10;

			c.drawImage(decs.bell, pos.x, pos.y);

			pos.x = XMAS_TREE.start.left + 8;
			pos.y += 37;

			c.drawImage(decs['yellow-ribbon'], pos.x, pos.y);

		},

		/**
		 * Create and display the items for each day on the tree
		 * @param  int branch - which branch down the tree
		 * @param  array items - items to display and name
		 * @param  int day - number of the day
		 */
		dayItems = function(c, branch_num, day, items, rows) {
			// If the top two branches (latest 2 days) use the space for two branches
			// else use just the space for 1 branch
			// Randomise where items appear, but make sure they have at least a 10px buffer between them

			var branch = {
					num: branch_num,
					width: (35 + 35 + (15*branch_num)) * 2,
					x: XMAS_TREE.start.left - (35 + 40 + (15*branch_num)),
					y: XMAS_TREE.start.top + XMAS_TREE.treeTop + (65 * (branch_num-1))
				},
				pos = {
					x: branch.x,
					y: branch.y,
					yTop: branch.y + 10,
					yBottom: branch.y + 40
				},
				itemSize = 35,
				newX = branch.x,
				modX = 0;

			if( branch.num === 2 ) {
				itemSize = 40;
			}

			if( branch.num === XMAS_TREE.branches + 1 ) {
				pos.yTop += 10;
				pos.yBottom += 15;
			}

			if( branch.num > 5 ) {
				branch.width = (35 + 35 + (12*branch.num)) * 2;
				newX = XMAS_TREE.start.left - (35 + 35 + (12*branch.num));
			}

			var gap = ~~((branch.width - (itemSize * (items.length + 1))) / (items.length - 1));

			for( var i=0; i<items.length; i++) {
				var name = items[i];

				if( branch.num === 2 ) {
					name += '-glow';
				}

				var itemImg = UTILS.getImage('items', name);

				if( i>0 ) {
					newX += itemSize + gap + 4;
					modX = ~~(gap / 3);
					pos.x = UTILS.random(newX-modX,newX+modX, 1);
				} else {
					pos.x = UTILS.random(newX,newX+15, 1);
				}

				pos.y = UTILS.random(pos.yTop, pos.yBottom, 1);

				if( rows === 2 && (i%2) === 0 ) {
					pos.y+=60;
				}

				c.drawImage(itemImg, pos.x, pos.y );

				var t = {
					size: itemImg.width,
					x: pos.x,
					y: pos.y,
					day: day,
					idx: i
				};

				TARGETS.push(t);
			}

		},

		dayRibbon = function(c, day, branch) {
			var ribbonType = 'ribbon';

			if( branch === 2 ) {
				ribbonType = 'ribbon-glow';
			}

			var ribbon = UTILS.getImage('ribbon-big', ribbonType);

			var posX = XMAS_TREE.start.left - (35 + 110 + (15*branch));
			if( (day % 2) === 0 ) {
				posX = (XMAS_TREE.start.left + (35 + 110 + (15*branch))) - ribbon.width;
			}

			var posY = XMAS_TREE.start.top + XMAS_TREE.treeTop + (65 * (branch-1)) + 25;

			if( branch > XMAS_TREE.branches ) {
				posX-= 10;
			}

			c.drawImage(ribbon, posX, posY);

			// Set up text styles
			c.font = '20px Arial';
			c.fillStyle = 'white';
			c.textAlign = 'center';
			c.textBaseline = 'top';

			var textX = posX + ribbon.width/2;
			c.fillText(day, textX, posY+18);
		},

		snowflakes = function(c) {
			var snow = [
					UTILS.getImage('snow-flakes', 'big-1'),
					UTILS.getImage('snow-flakes', 'big-2'),
					UTILS.getImage('snow-flakes', 'big-3'),
					UTILS.getImage('snow-flakes', 'big-3')
				],
				flakes = [];

			for( var i=0; i<4; i++ ) {
				var flake = {
						img: snow[i]
					};

				if( (i%2) > 0 ) {
					flake.x = UTILS.random(40, XMAS_TREE.start.left - 200 - flake.img.width, 1);
				} else {
					flake.x = UTILS.random(XMAS_TREE.start.left + 200, UTILS.winW - flake.img.width, 1);
				}

				flake.y = UTILS.random(50, 400, 1);

				c.drawImage(flake.img, flake.x, flake.y);
			}

		};

	return {
		trunkHeight : trunkHeight,
		images : imgSources,

		tree : treeSide,
		ribbon : dayRibbon,
		items : dayItems,
		star : star,
		leaves : leaves,
		trunk : trunk,
		decs : decs,
		snow : snowflakes
	};

})();
