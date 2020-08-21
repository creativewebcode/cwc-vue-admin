"use strict";

import CWCUtil from "./util";

// Component Definition 
var CWCImageInput = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = CWCUtil.getById(elementId);
    var body = CWCUtil.getBody();

    if (!element) {
        return;
    }

    // Default options
    var defaultOptions = {
        editMode: false
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (CWCUtil.data(element).has('imageinput')) {
                the = CWCUtil.data(element).get('imageinput');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                CWCUtil.data(element).set('imageinput', the);
            }

            return the;
        },

        /**
         * Init avatar
         */
        init: function(options) {
            the.element = element;
            the.events = [];

            the.input = CWCUtil.find(element, 'input[type="file"]');
            the.wrapper = CWCUtil.find(element, '.image-input-wrapper');
            the.cancel = CWCUtil.find(element, '[data-action="cancel"]');
            the.remove = CWCUtil.find(element, '[data-action="remove"]');
            the.src = CWCUtil.css(the.wrapper, 'backgroundImage');
            the.hidden = CWCUtil.find(element, 'input[type="hidden"]');

            // merge default and user defined options
            the.options = CWCUtil.deepExtend({}, defaultOptions, options);
        },

        /**
         * Build
         */
        build: function() {
            // Handle change
            CWCUtil.addEvent(the.input, 'change', function(e) {
                e.preventDefault();

	            if (the.input && the.input.files && the.input.files[0]) {
	                var reader = new FileReader();
	                reader.onload = function(e) {
	                    CWCUtil.css(the.wrapper, 'background-image', 'url('+e.target.result +')');
	                }
	                reader.readAsDataURL(the.input.files[0]);

	                CWCUtil.addClass(the.element, 'image-input-changed');
                    CWCUtil.removeClass(the.element, 'image-input-empty');

                    // Fire change event
                    Plugin.eventTrigger('change');
	            }
            });

            // Handle cancel
            CWCUtil.addEvent(the.cancel, 'click', function(e) {
                e.preventDefault();

                // Fire cancel event
                Plugin.eventTrigger('cancel');

	            CWCUtil.removeClass(the.element, 'image-input-changed');
                CWCUtil.removeClass(the.element, 'image-input-empty');
	            CWCUtil.css(the.wrapper, 'background-image', the.src);
	            the.input.value = "";

                if (the.hidden) {
                    the.hidden.value = "0";
                }
            });

            // Handle remove
            CWCUtil.addEvent(the.remove, 'click', function(e) {
                e.preventDefault();

                // Fire cancel event
                Plugin.eventTrigger('remove');

	            CWCUtil.removeClass(the.element, 'image-input-changed');
                CWCUtil.addClass(the.element, 'image-input-empty');
	            CWCUtil.css(the.wrapper, 'background-image', "none");
	            the.input.value = "";

                if (the.hidden) {
                    the.hidden.value = "1";
                }
            });
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name) {
            //CWCUtil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            return event.handler.call(this, the);
                        }
                    } else {
                        return event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };

    /**
     * Attach event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};

// webpack support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = CWCImageInput;
}

export default CWCImageInput;