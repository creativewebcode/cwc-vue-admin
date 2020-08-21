"use strict";

var CWCLayoutHeader = function() {
    // Private properties
    var _element;
    var _elementForMobile;
    var _object;

	// Private functions
    // Get Height
    var _getHeight = function() {
        var height = 0;

        if (_element) {
            height = CWCUtil.actualHeight(_element) + 1;
        }

        return height;
    }

    // Get Height
    var _getHeightForMobile = function() {
        var height;

        height = CWCUtil.actualHeight(_elementForMobile);

        return height;
    }

    // Public Methods
	return {
		init: function(id, idForMobile) {
            _element = CWCUtil.getById(id);
            _elementForMobile = CWCUtil.getById(idForMobile);

            if (!_element) {
                return;
            }
		},

        isFixed: function() {
            return CWCUtil.hasClass(CWCUtil.getBody(), 'header-fixed')
        },

        isFixedForMobile: function() {
            return CWCUtil.hasClass(CWCUtil.getBody(), 'header-mobile-fixed')
        },

        getElement: function() {
            return _element;
        },

        getElementForMobile: function() {
            return _elementForMobile;
        },

        getHeader: function() {
            return _object;
        },

        getHeight: function() {
            return _getHeight();
        },

        getHeightForMobile: function() {
            return _getHeightForMobile();
        }
	};
}();



export default CWCLayoutHeader;