"use strict";

var CWCLayoutStickyCard = function() {
    // Private properties
	var _element;
    var _object;

	// Private functions
	var _init = function() {
		var offset = 300;

		if (typeof CWCLayoutHeader !== 'undefined') {
			offset = CWCLayoutHeader.getHeight();
		}

        _object = new CWCCard(_element, {
			sticky: {
				offset: offset,
				zIndex: 90,
				position: {
					top: function() {
						var pos = 0;
                        var body = CWCUtil.getBody();

						if (CWCUtil.isBreakpointUp('lg')) {
							if (typeof CWCLayoutHeader !== 'undefined' && CWCLayoutHeader.isFixed()) {
								pos = pos + CWCLayoutHeader.getHeight();
							}

							if (typeof CWCLayoutSubheader !== 'undefined' && CWCLayoutSubheader.isFixed()) {
								pos = pos + CWCLayoutSubheader.getHeight();
							}
						} else {
							if (typeof CWCLayoutHeader !== 'undefined' && CWCLayoutHeader.isFixedForMobile()) {
								pos = pos + CWCLayoutHeader.getHeightForMobile();
							}
						}

						pos = pos - 1; // remove header border width

						return pos;
					},
					left: function(card) {
						return CWCUtil.offset(_element).left;
					},
					right: function(card) {
						var body = CWCUtil.getBody();

						var cardWidth = parseInt(CWCUtil.css(_element, 'width'));
						var bodyWidth = parseInt(CWCUtil.css(body, 'width'));
						var cardOffsetLeft = CWCUtil.offset(_element).left;

						return bodyWidth - cardWidth - cardOffsetLeft;
					}
				}
			}
		});

		_object.initSticky();

		CWCUtil.addResizeHandler(function() {
			_object.updateSticky();
		});
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
		},

		update: function() {
			if (_object) {
				_object.updateSticky();
			}
		}
	};
}();



export default CWCLayoutStickyCard;