"use strict";

var CWCLayoutAsideToggle = function() {
    // Private properties
    var _body;
    var _element;
    var _toggleObject;

	// Initialize
	var _init = function() {
		_toggleObject = new CWCToggle(_element, {
			target: _body,
			targetState: 'aside-minimize',
			toggleState: 'active'
		});

		_toggleObject.on('toggle', function(toggle) {
            // Update sticky card
            if (typeof CWCLayoutStickyCard !== 'undefined') {
                CWCLayoutStickyCard.update();
            }

            // Pause header menu dropdowns
            if (typeof CWCLayoutHeaderMenu !== 'undefined') {
                CWCLayoutHeaderMenu.pauseDropdownHover(800);
            }

            // Pause aside menu dropdowns
            if (typeof CWCLayoutAsideMenu !== 'undefined') {
                CWCLayoutAsideMenu.pauseDropdownHover(800);
            }

            // Remember state in cookie
			CWCCookie.setCookie('kt_aside_toggle_state', toggle.getState());
			// to set default minimized left aside use this cookie value in your
			// server side code and add "kt-primary--minimize aside-minimize" classes to
			// the body tag in order to initialize the minimized left aside mode during page loading.
		});

		_toggleObject.on('beforeToggle', function(toggle) {
			if (CWCUtil.hasClass(_body, 'aside-minimize') === false && CWCUtil.hasClass(_body, 'aside-minimize-hover')) {
				CWCUtil.removeClass(_body, 'aside-minimize-hover');
			}
		});
	}

    // Public methods
	return {
		init: function(id) {
            _element = CWCUtil.getById(id);
            _body = CWCUtil.getBody();

            if (!_element) {
                return;
            }

            // Initialize
            _init();
		},

        getElement: function() {
            return _element;
        },

        getToggle: function() {
			return _toggleObject;
		},

		onToggle: function(handler) {
			if (typeof _toggleObject.element !== 'undefined') {
				_toggleObject.on('toggle', handler);
			}
		}
	};
}();



export default CWCLayoutAsideToggle;