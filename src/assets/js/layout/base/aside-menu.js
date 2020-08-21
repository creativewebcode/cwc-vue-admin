"use strict";

var CWCLayoutAsideMenu = function() {
    // Private properties
    var _element;
    var _menuObject;

	// Initialize
	var _init = function() {
		var menuDesktopMode = (CWCUtil.attr(_element, 'data-menu-dropdown') === '1' ? 'dropdown' : 'accordion');
        var scroll;

		if (CWCUtil.attr(_element, 'data-menu-scroll') === '1') {
			scroll = {
				rememberPosition: true, // remember position on page reload
				height: function() { // calculate available scrollable area height
					var height = parseInt(CWCUtil.getViewPort().height);

					if (CWCUtil.isBreakpointUp('lg')) {
						height = height - CWCLayoutBrand.getHeight();
					}

					height = height - (parseInt(CWCUtil.css(_element, 'marginBottom')) + parseInt(CWCUtil.css(_element, 'marginTop')));

					return height;
				}
			};
		}

		_menuObject = new CWCMenu(_element, {
			// Vertical scroll
			scroll: scroll,

			// Submenu setup
			submenu: {
				desktop: menuDesktopMode,
				tablet: 'accordion', // menu set to accordion in tablet mode
				mobile: 'accordion' // menu set to accordion in mobile mode
			},

			// Accordion setup
			accordion: {
				expandAll: false // allow having multiple expanded accordions in the menu
			}
		});

        // Disable menu click if aside is fixed and minimized
        _menuObject.on('submenuToggle', function(menu) {
            if (CWCLayoutAside.isMinimized() === true  && CWCLayoutAside.isHoverable() === false) {
                return false;
            }
        });

        // Close aside offcanvas panel before page reload On tablet and mobile
        _menuObject.on('linkClick', function(menu) {
            if (CWCUtil.isBreakpointDown('lg')) { // Tablet and mobile mode
                CWCLayoutAside.getOffcanvas().hide(); // Hide offcanvas after general link click
            }
        });
	}

    // Public methods
	return {
		init: function(id) {
            _element = CWCUtil.getById(id);

            if (!_element) {
                return;
            }

            // Initialize menu
            _init();
		},

		getElement: function() {
			return _element;
		},

        getMenu: function() {
			return _menuObject;
		},

        pauseDropdownHover: function(time) {
			if (_menuObject) {
				_menuObject.pauseDropdownHover(time);
			}
		},

		closeMobileOffcanvas: function() {
			if (_menuObject && CWCUtil.isMobileDevice()) {
				_menuObject.hide();
			}
		}
	};
}();



export default CWCLayoutAsideMenu;