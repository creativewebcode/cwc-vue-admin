"use strict";

var CWCLayoutQuickUser = function() {
    // Private properties
    var _element;
    var _offcanvasObject;

    // Private functions
    var _init = function() {
        var header = CWCUtil.find(_element, '.offcanvas-header');
        var content = CWCUtil.find(_element, '.offcanvas-content');

        _offcanvasObject = new CWCOffcanvas(_element, {
            overlay: true,
            baseClass: 'offcanvas',
            placement: 'right',
            closeBy: 'kt_quick_user_close',
            toggleBy: 'kt_quick_user_toggle'
        });

        CWCUtil.scrollInit(content, {
            disableForMobile: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                var height = parseInt(CWCUtil.getViewPort().height);

                if (header) {
                    height = height - parseInt(CWCUtil.actualHeight(header));
                    height = height - parseInt(CWCUtil.css(header, 'marginTop'));
                    height = height - parseInt(CWCUtil.css(header, 'marginBottom'));
                }

                if (content) {
                    height = height - parseInt(CWCUtil.css(content, 'marginTop'));
                    height = height - parseInt(CWCUtil.css(content, 'marginBottom'));
                }

                height = height - parseInt(CWCUtil.css(_element, 'paddingTop'));
                height = height - parseInt(CWCUtil.css(_element, 'paddingBottom'));

                height = height - 2;

                return height;
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

            // Initialize
            _init();
        },

        getElement: function() {
            return _element;
        }
    };
}();



export default CWCLayoutQuickUser;