;(function(defaults, $, window, document, undefined) {

	'use strict';

	$.extend({
		tabifySetup : function(options) {
			return $.extend(defaults, options);
		}
	}).fn.extend({
		tabify : function(options) {

			options = $.extend({}, defaults, options);

			return $(this).each(function() {
				var $element, tabHTML, $tabs, $sections;

				$element = $(this);
				$sections = $element.children();

				// Build tabHTML
				tabHTML = '<ul class="tab-nav">';
				$sections.each(function() {
					if ($(this).attr("title") && $(this).attr("id")) {
						tabHTML += '<li><a href="#' + $(this).attr("id") + '">' + $(this).attr("title") + '</a></li>';
					}
				});
				tabHTML += '</ul>';

				// Prepend navigation
				$element.prepend(tabHTML);

				// Load tabs
				$tabs = $element.find('.tab-nav li');

				// Functions
				var activateTab = function(id) {
					$tabs.filter('.active').removeClass('active');
					$sections.filter('.active').removeClass('active');
					$tabs.has('a[href="' + id + '"]').addClass('active');
					$sections.filter(id).addClass('active');
				}

				// Setup events
				$tabs.on('click', function(e){
					activateTab($(this).find('a').attr('href'));
					e.preventDefault();
				});

				// Activate first tab
				activateTab($tabs.first().find('a').attr('href'));
			});
		}
	});
})({
	property : "value",
	otherProperty : "value"
}, jQuery, window, document);


// Calling the plugin
$('.tab-group').tabify();


