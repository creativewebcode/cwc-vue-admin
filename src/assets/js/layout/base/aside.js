"use strict";

var CWCLayoutAside = function() {
    // Private properties
    var _body;
    var _element;
    var _offcanvasObject;

    // Private functions
	// Initialize
	var _init = function() {
		var offcanvasClass = CWCUtil.hasClass(_element, 'aside-offcanvas-default') ? 'aside-offcanvas-default' : 'aside';

        // Initialize mobile aside offcanvas
		_offcanvasObject = new CWCOffcanvas(_element, {
			baseClass: offcanvasClass,
			overlay: true,
			closeBy: 'kt_aside_close_btn',
			toggleBy: {
				target: 'kt_aside_mobile_toggle',
				state: 'mobile-toggle-active'
			}
		});

		// Handle Minimized Aside Hover
		if (CWCUtil.hasClass(_body, 'aside-fixed') && CWCUtil.hasClass(_body, 'aside-minimize-hoverable')) {
			var insideTm;
			var outsideTm;

            // Handle Aside Hover Mode
			CWCUtil.addEvent(_element, 'mouseenter', function(e) {
				e.preventDefault();

				if (CWCUtil.isBreakpointUp('lg') === false) {
					return;
				}

				if (outsideTm) {
					clearTimeout(outsideTm);
					outsideTm = null;
				}

				insideTm = setTimeout(function() {
					if (CWCUtil.hasClass(_body, 'aside-minimize') && CWCUtil.isBreakpointUp('lg')) {
						CWCUtil.removeClass(_body, 'aside-minimize');

						// Hover class
						CWCUtil.addClass(_body, 'aside-minimize-hover');

						CWCLayoutAsideMenu.getMenu().scrollUpdate();
						CWCLayoutAsideMenu.getMenu().scrollTop();
					}
				}, 50);
			});

			CWCUtil.addEvent(_element, 'mouseleave', function(e) {
				e.preventDefault();

				if (CWCUtil.isBreakpointUp('lg') === false) {
					return;
				}

				if (insideTm) {
					clearTimeout(insideTm);
					insideTm = null;
				}

				outsideTm = setTimeout(function() {
				    if (CWCUtil.hasClass(_body, 'aside-minimize-hover') && CWCUtil.isBreakpointUp('lg')) {
					    CWCUtil.removeClass(_body, 'aside-minimize-hover');
					    CWCUtil.addClass(_body, 'aside-minimize');

						// Hover class
                        CWCLayoutAsideMenu.getMenu().scrollUpdate();
						CWCLayoutAsideMenu.getMenu().scrollTop();
					}
				}, 100);
			});
		}
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

        getOffcanvas: function() {
            return _offcanvasObject;
        },

        isFixed: function() {
            return CWCUtil.hasClass(_body, 'aside-fixed');
        },

        isMinimized: function() {
            return (CWCUtil.hasClass(_body, 'aside-fixed') && CWCUtil.hasClass(_body, 'aside-minimize'));
        },

        isHoverable: function() {
            return (CWCUtil.hasClass(_body, 'aside-fixed') && CWCUtil.hasClass(_body, 'aside-minimize-hoverable'));
        }
	};
}();



export default CWCLayoutAside;