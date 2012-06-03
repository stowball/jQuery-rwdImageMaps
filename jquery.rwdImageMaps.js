/*
* rwdImageMaps jQuery plugin v1.2
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2012 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
(function($) {
	$.fn.rwdImageMaps = function() {
		var $img = this,
			v = parseFloat($.fn.jquery);
		
		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;
				
				var that = this;
				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$('<img />').attr('src', $(that).attr('src')).load(function() {
					var w, h;
					// jQuery < 1.6 incorrectly uses the actual image width/height instead of the attribute's width/height
					if (v < 1.6)
						w = $(that)[0].getAttribute('width'),
						h = $(that)[0].getAttribute('height');
					else
						w = $(that).attr('width'),
						h = $(that).attr('height');	
					
					var wPercent = $(that).width()/100,
						hPercent = $(that).height()/100,
						map = $(that).attr('usemap').replace('#', ''),
						c = 'coords';
					
					$('map[name="' + map + '"]').find('area').each(function() {
						if (!$(this).data(c))
							$(this).data(c, $(this).attr(c));
						
						var coords = $(this).data(c).split(','),
							coordsPercent = new Array(coords.length);
						
						for (var i = 0; i < coordsPercent.length; ++i) {
							if (i % 2 === 0)
								coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
							else
								coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
						}
						$(this).attr(c, coordsPercent.toString());
					});
				});
			});
		};
		rwdImageMap();
		$(window).resize(function() {
			rwdImageMap();
		});
	};
})(jQuery);