// Modular JS file
SETUP_CONTENT = (function ($) {

	var init = function () {
			var args = {
				'action': 'waa_get_tp_content'
			};

			MOD_AJAX.post(args, checkContent);
		},

		checkContent = function(data) {
			// console.log(data);
		};

	return {
		go : init
	};

})(jQuery);

SETUP_CONTENT.go();
