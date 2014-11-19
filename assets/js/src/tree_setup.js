// Modular JS file
TREE_SETUP = (function () {

	var init = function () {
			// XMAS_TREE.go();

			var args = {
				'action': 'waa_get_tp_content'
			};

			MOD_AJAX.post(args, checkContent);
		},

		checkContent = function(data) {
			console.log(data);
		};

	return {
		go : init
	};

})();

TREE_SETUP.go();
