// Modular JS file
var ASSETS = [],
	TARGETS = [], // All clickable items on the tree
	DAYS = 5,
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
		trunkHeight: 130,

		imgSources: {
			'background': ['background'],
			'snow-flakes': ['big-1', 'big-2', 'big-3', 'small-1', 'small-2', 'small-3'],
			'decorations': ['bell', 'candy-stick', 'yellow-ribbon', 'star', 'presents'],
			'items': ['facebook', 'facebook-glow', 'twitter', 'twitter-glow', 'news', 'news-glow', 'youtube', 'youtube-glow', 'personal', 'personal-glow' ],
			'ribbon': ['ribbon', 'ribbon-glow'],
			'leaves': ['top', 'group-1', 'twig-1', 'twig-2', 'dot-1', 'dot-2']
		}
	};
