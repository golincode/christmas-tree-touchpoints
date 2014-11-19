// Modular JS file
MOD_AJAX = (function ($) {

	// Breakpoints
	var postHandler = function(args, callback) {

			// Set up Nonce in the arguments
			args.nonce = waaAjaxData.waaAjaxNonce;

			// Run ajax call
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: waaAjaxData.url,
				data: args,
				success: callback
			});

		};

	return {
		post : postHandler
	};

})(jQuery);
