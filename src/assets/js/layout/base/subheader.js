"use strict";

var CWCLayoutSubheader = function() {
    // Private properties
    var _element;

    // Private functions
    var _getHeight = function() {
        var height = 0;

        if (_element) {
            height = CWCUtil.actualHeight(_element);
        }

        return height;
    }

    // Public methods
	return {
		init: function(id) {
            _element = CWCUtil.getById(id);

            if (!_element) {
                return;
            }
		},

        isFixed: function() {
            return CWCUtil.hasClass(CWCUtil.getBody(), 'subheader-fixed');
        },

        getElement: function() {
            return _element;
        },

        getHeight: function() {
            return _getHeight();
        }
	};
}();



export default CWCLayoutSubheader;