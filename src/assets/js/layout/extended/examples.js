"use strict";

var CWCLayoutExamples = function() {

    var initDefaultMode = function(element) {
        var elements = element;
        if (typeof elements === 'undefined') {
            elements = document.querySelectorAll('.example:not(.example-compact):not(.example-hover):not(.example-basic)');
        }

        for (var i = 0; i < elements.length; ++i) {
            var example = elements[i];
            var copy = CWCUtil.find(example, '.example-copy');

            var clipboard = new ClipboardJS(copy, {
                target: function(trigger) {
                    var example = trigger.closest('.example');
                    var el = CWCUtil.find(example, '.example-code .tab-pane.active');

                    if (!el) {
                        el = CWCUtil.find(example, '.example-code');
                    }

                    return el;
                }
            });

            clipboard.on('success', function(e) {
                CWCUtil.addClass(e.trigger, 'example-copied');
                e.clearSelection();

                setTimeout(function() {
                    CWCUtil.removeClass(e.trigger, 'example-copied');
                }, 2000);
            });
        }
    }

    var initCompactMode = function(element) {
        var example,code,toggle,copy, clipboard;
        var elements = element;
        if (typeof elements === 'undefined') {
            var elements = document.querySelectorAll('.example.example-compact');
        }

        for (var i = 0; i < elements.length; ++i) {
            var example = elements[i];
            var toggle = CWCUtil.find(example, '.example-toggle');
            var copy = CWCUtil.find(example, '.example-copy');

            // Handle toggle
            CWCUtil.addEvent(toggle, 'click', function() {
                var example = this.closest('.example');
                var code =  CWCUtil.find(example, '.example-code');
                var the = this;

                if (CWCUtil.hasClass(this, 'example-toggled')) {
                    CWCUtil.slideUp(code, 300, function() {
                        CWCUtil.removeClass(the, 'example-toggled');
                        CWCUtil.removeClass(code, 'example-code-on');
                        CWCUtil.hide(code);
                    });
                } else {
                    CWCUtil.addClass(code, 'example-code-on');
                    CWCUtil.addClass(this, 'example-toggled');
                    CWCUtil.slideDown(code, 300, function() {
                        CWCUtil.show(code);
                    });
                }
            });

            // Handle copy
            var clipboard = new ClipboardJS(copy, {
                target: function(trigger) {
                    var example = trigger.closest('.example');
                    var el = CWCUtil.find(example, '.example-code .tab-pane.active');

                    if (!el) {
                        el = CWCUtil.find(example, '.example-code');
                    }

                    return el;
                }
            });

            clipboard.on('success', function(e) {
                CWCUtil.addClass(e.trigger, 'example-copied');
                e.clearSelection();

                setTimeout(function() {
                    CWCUtil.removeClass(e.trigger, 'example-copied');
                }, 2000);
            });
        }
    }

    return {
        init: function(element, options) {
            initDefaultMode(element);
            initCompactMode(element);
        }
    };
}();



export default CWCLayoutExamples;