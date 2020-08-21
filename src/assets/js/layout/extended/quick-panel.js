"use strict";

var CWCLayoutQuickPanel = function() {
    // Private properties
    var _element;
    var _offcanvasObject;
    var _notificationsElement;
    var _logsElement;
    var _settingsElement;

    // Private functions
    var _getContentHeight = function() {
        var height;

        var header = CWCUtil.find(_element, '.offcanvas-header');
        var content = CWCUtil.find(_element, '.offcanvas-content');

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

    var _init = function() {
        _offcanvasObject = new CWCOffcanvas(_element, {
            overlay: true,
            baseClass: 'offcanvas',
            placement: 'right',
            closeBy: 'kt_quick_panel_close',
            toggleBy: 'kt_quick_panel_toggle'
        });
    }

    var _initNotifications = function() {
        CWCUtil.scrollInit(_notificationsElement, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return _getContentHeight();
            }
        });
    }

    var _initLogs = function() {
        CWCUtil.scrollInit(_logsElement, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return _getContentHeight();
            }
        });
    }

    var _initSettings = function() {
        CWCUtil.scrollInit(_settingsElement, {
            mobileNativeScroll: true,
            resetHeightOnDestroy: true,
            handleWindowResize: true,
            height: function() {
                return _getContentHeight();
            }
        });
    }

    var _updateScrollbars = function() {
        $(_element).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            CWCUtil.scrollUpdate(_notificationsElement);
            CWCUtil.scrollUpdate(_logsElement);
            CWCUtil.scrollUpdate(_settingsElement);
        });
    }

    // Public methods
    return {
        init: function(id) {
            _element = CWCUtil.getById(id);
            _notificationsElement = CWCUtil.getById('kt_quick_panel_notifications');
            _logsElement = CWCUtil.getById('kt_quick_panel_logs');
            _settingsElement = CWCUtil.getById('kt_quick_panel_settings');

            _init();
            _initNotifications();
            _initLogs();
            _initSettings();

            
        }
    };
}();



export default CWCLayoutQuickPanel;