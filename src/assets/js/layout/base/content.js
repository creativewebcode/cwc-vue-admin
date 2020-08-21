"use strict";

var CWCLayoutContent = function() {
    // Private properties
    var _element;

	// Private functions
	var _getHeight = function() {
		var height;

		height = CWCUtil.getViewPort().height;

        if (_element) {
            height = height - parseInt(CWCUtil.css(_element, 'paddingTop')) - parseInt(CWCUtil.css(_element, 'paddingBottom'));
        }

        height = height - CWCLayoutHeader.getHeight();
        height = height - CWCLayoutSubheader.getHeight();
        height = height - CWCLayoutFooter.getHeight();

		return height;
	}

    // Public methods
	return {
		init: function(id) {
            _element = CWCUtil.getById(id);
		},

		getHeight: function() {
			return _getHeight();
		},

        getElement: function() {
            return _element;
        }
	};
}();



export default CWCLayoutContent;