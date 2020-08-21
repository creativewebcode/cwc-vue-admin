"use strict";

// Class definition
var CWCLayoutChat = function () {
	// Private functions
	var _init = function (element) {
		var scrollEl = CWCUtil.find(element, '.scroll');
		var cardBodyEl = CWCUtil.find(element, '.card-body');
		var cardHeaderEl = CWCUtil.find(element, '.card-header');
		var cardFooterEl = CWCUtil.find(element, '.card-footer');

		if (!scrollEl) {
			return;
		}

		// initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar)
		CWCUtil.scrollInit(scrollEl, {
			windowScroll: false, // allow browser scroll when the scroll reaches the end of the side
			mobileNativeScroll: true,  // enable native scroll for mobile
			desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop
			resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
			handleWindowResize: true, // recalculate hight on window resize
			rememberPosition: true, // remember scroll position in cookie
			height: function() {  // calculate height
				var height;

				if (CWCUtil.isBreakpointDown('lg')) { // Mobile mode
					return CWCUtil.hasAttr(scrollEl, 'data-mobile-height') ? parseInt(CWCUtil.attr(scrollEl, 'data-mobile-height')) : 400;
				} else if (CWCUtil.isBreakpointUp('lg') && CWCUtil.hasAttr(scrollEl, 'data-height')) { // Desktop Mode
					return parseInt(CWCUtil.attr(scrollEl, 'data-height'));
				} else {
					height = CWCLayoutContent.getHeight();

					if (scrollEl) {
						height = height - parseInt(CWCUtil.css(scrollEl, 'margin-top')) - parseInt(CWCUtil.css(scrollEl, 'margin-bottom'));
					}

					if (cardHeaderEl) {
						height = height - parseInt(CWCUtil.css(cardHeaderEl, 'height'));
						height = height - parseInt(CWCUtil.css(cardHeaderEl, 'margin-top')) - parseInt(CWCUtil.css(cardHeaderEl, 'margin-bottom'));
					}

					if (cardBodyEl) {
						height = height - parseInt(CWCUtil.css(cardBodyEl, 'padding-top')) - parseInt(CWCUtil.css(cardBodyEl, 'padding-bottom'));
					}

					if (cardFooterEl) {
						height = height - parseInt(CWCUtil.css(cardFooterEl, 'height'));
						height = height - parseInt(CWCUtil.css(cardFooterEl, 'margin-top')) - parseInt(CWCUtil.css(cardFooterEl, 'margin-bottom'));
					}
				}

				// Remove additional space
				height = height - 2;

				return height;
			}
		});

		// attach events
		CWCUtil.on(element, '.card-footer textarea', 'keydown', function(e) {
			if (e.keyCode == 13) {
				_handeMessaging(element);
				e.preventDefault();

				return false;
			}
		});

		CWCUtil.on(element, '.card-footer .chat-send', 'click', function(e) {
			_handeMessaging(element);
		});
	}

	var _handeMessaging = function(element) {
		var messagesEl = CWCUtil.find(element, '.messages');
		var scrollEl = CWCUtil.find(element, '.scroll');
        var textarea = CWCUtil.find(element, 'textarea');

        if (textarea.value.length === 0 ) {
            return;
        }

		var node = document.createElement("DIV");
		CWCUtil.addClass(node, 'd-flex flex-column mb-5 align-items-end');

		var html = '';
		html += '<div class="d-flex align-items-center">';
		html += '	<div>';
		html += '		<span class="text-muted font-size-sm">2 Hours</span>';
		html += '		<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">You</a>';
		html += '	</div>';
		html += '	<div class="symbol symbol-circle symbol-40 ml-3">';
		html += '		<img alt="Pic" src="assets/media/users/300_12.jpg"/>';
		html += '	</div>';
		html += '</div>';
		html += '<div class="mt-2 rounded p-5 bg-light-primary text-dark-50 font-weight-bold font-size-lg text-right max-w-400px">' + textarea.value + '</div>';

		CWCUtil.setHTML(node, html);
		messagesEl.appendChild(node);
		textarea.value = '';
		scrollEl.scrollTop = parseInt(CWCUtil.css(messagesEl, 'height'));

		var ps;
		if (ps = CWCUtil.data(scrollEl).get('ps')) {
			ps.update();
		}

		setTimeout(function() {
			var node = document.createElement("DIV");
			CWCUtil.addClass(node, 'd-flex flex-column mb-5 align-items-start');

			var html = '';
			html += '<div class="d-flex align-items-center">';
			html += '	<div class="symbol symbol-circle symbol-40 mr-3">';
			html += '		<img alt="Pic" src="assets/media/users/300_12.jpg"/>';
			html += '	</div>';
			html += '	<div>';
			html += '		<a href="#" class="text-dark-75 text-hover-primary font-weight-bold font-size-h6">Matt Pears</a>';
			html += '		<span class="text-muted font-size-sm">Just now</span>';
			html += '	</div>';
			html += '</div>';
			html += '<div class="mt-2 rounded p-5 bg-light-success text-dark-50 font-weight-bold font-size-lg text-left max-w-400px">';
			html += 'Right before vacation season we have the next Big Deal for you.';
			html += '</div>';

			CWCUtil.setHTML(node, html);
			messagesEl.appendChild(node);
			textarea.value = '';
			scrollEl.scrollTop = parseInt(CWCUtil.css(messagesEl, 'height'));

			var ps;
			if (ps = CWCUtil.data(scrollEl).get('ps')) {
				ps.update();
			}
		}, 2000);
	}

	// Public methods
	return {
		init: function() {
			// init modal chat example
			_init(CWCUtil.getById('kt_chat_modal'));

			// trigger click to show popup modal chat on page load
			if (encodeURI(window.location.hostname) == 'keenthemes.com' || encodeURI(window.location.hostname) == 'www.keenthemes.com') {
				setTimeout(function() {
		            if (!CWCCookie.getCookie('kt_app_chat_shown')) {
		                var expires = new Date(new Date().getTime() + 60 * 60 * 1000); // expire in 60 minutes from now

						CWCCookie.setCookie('kt_app_chat_shown', 1, { expires: expires });

						if (CWCUtil.getById('kt_app_chat_launch_btn')) {
							CWCUtil.getById('kt_app_chat_launch_btn').click();
						}
		            }
		        }, 2000);
	        }
        },

        setup: function(element) {
            _init(element);
        }
	};
}();



export default CWCLayoutChat;