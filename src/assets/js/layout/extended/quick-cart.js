"use strict";

var CWCLayoutQuickCartPanel = function() {
    // Private properties
    var _element;
    var _offcanvasObject;

    // Private functions
    var _init = function() {
        _offcanvasObject = new CWCOffcanvas(_element, {
            overlay: true,
            baseClass: 'offcanvas',
            placement: 'right',
            closeBy: 'kt_quick_cart_close',
            toggleBy: 'kt_quick_cart_toggle'
        });

        var header = CWCUtil.find(_element, '.offcanvas-header');
        var content = CWCUtil.find(_element, '.offcanvas-content');
        var wrapper = CWCUtil.find(_element, '.offcanvas-wrapper');
        var footer = CWCUtil.find(_element, '.offcanvas-footer');

        CWCUtil.scrollInit(wrapper, {
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

                if (wrapper) {
                    height = height - parseInt(CWCUtil.css(wrapper, 'marginTop'));
                    height = height - parseInt(CWCUtil.css(wrapper, 'marginBottom'));
                }

                if (footer) {
                    height = height - parseInt(CWCUtil.actualHeight(footer));
                    height = height - parseInt(CWCUtil.css(footer, 'marginTop'));
                    height = height - parseInt(CWCUtil.css(footer, 'marginBottom'));
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
        }
    };
}();



export default CWCLayoutQuickCartPanel;