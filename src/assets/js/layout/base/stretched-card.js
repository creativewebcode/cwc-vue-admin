"use strict";

var CWCLayoutStretchedCard = function() {
    // Private properties
	var _element;

	// Private functions
	var _init = function() {
		var scroll = CWCUtil.find(_element, '.card-scroll');
		var cardBody = CWCUtil.find(_element, '.card-body');
		var cardHeader = CWCUtil.find(_element, '.card-header');

		var height = CWCLayoutContent.getHeight();

		height = height - parseInt(CWCUtil.actualHeight(cardHeader));

		height = height - parseInt(CWCUtil.css(_element, 'marginTop')) - parseInt(CWCUtil.css(_element, 'marginBottom'));
		height = height - parseInt(CWCUtil.css(_element, 'paddingTop')) - parseInt(CWCUtil.css(_element, 'paddingBottom'));

		height = height - parseInt(CWCUtil.css(cardBody, 'paddingTop')) - parseInt(CWCUtil.css(cardBody, 'paddingBottom'));
		height = height - parseInt(CWCUtil.css(cardBody, 'marginTop')) - parseInt(CWCUtil.css(cardBody, 'marginBottom'));

		height = height - 3;

		CWCUtil.css(scroll, 'height', height + 'px');
	}

    // Public methods
	return {
		init: function(id) {
            _element = CWCUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize
			_init();

            // Re-calculate on window resize
            CWCUtil.addResizeHandler(function() {
				_init();
			});
		},

		update: function() {
			_init();
		}
	};
}();



export default CWCLayoutStretchedCard;