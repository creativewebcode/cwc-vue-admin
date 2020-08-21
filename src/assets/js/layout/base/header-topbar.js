"use strict";

var CWCLayoutHeaderTopbar = function() {
    // Private properties
	var _toggleElement;
    var _toggleObject;

    // Private functions
    var _init = function() {
			_toggleObject = new CWCToggle(_toggleElement, {
				target: CWCUtil.getBody(),
				targetState: 'topbar-mobile-on',
				toggleState: 'active',
			});
    }

    // Public methods
	return {
		init: function(id) {
            _toggleElement = CWCUtil.getById(id);

			if (!_toggleElement) {
                return;
            }

            // Initialize
            _init();
		},

        getToggleElement: function() {
            return _toggleElement;
        }
	};
}();



export default CWCLayoutHeaderTopbar;