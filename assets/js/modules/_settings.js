// Modular JS file
var ASSETS = [],
	TARGETS = [], // All clickable items on the tree
	DAYS = parseInt( document.getElementById('xmas-tree').dataset.days ) || parseInt( document.getElementById('xmas-tree').getAttribute('data-days') ),
	BRANCHES = DAYS + 2,
	windowW = window.innerWidth,
	windowH = window.innerHeight,
	SETTINGS = {
		winW: windowW,
		winH: windowH,

		canvas: null,
		c: null, // init the context variable

		branches: BRANCHES,

		start: {
			left: windowW / 2,
			top: 100
		},

		hTop: 125, // Top section of the tree
		hMiddle: 65 * BRANCHES, // Middle section of branches
		hBottom: 60 + (2*BRANCHES), // bottom section of the tree

		trunkWidth: 80,
		trunkHeight: 130
	};
