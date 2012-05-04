/*
* rwdImageMaps jQuery plugin v1.0
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2012 Matt Stow
* http://mattstow.com
* Licensed under the MIT license
*/
(function($) {
	var w, h;
	$.fn.rwdImageMaps = function() {
		var $img = this;
		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;
				var wPercent = $(this).width()/100, hPercent = $(this).height()/100, map = $(this).attr('usemap').replace('#', ''), c = 'coords';
				if (w == undefined) {
					w = $img.attr('width'), h = $img.attr('height');
				}
				$('map[name="' + map + '"]').find('area').each(function() {
					if (!$(this).data(c))
						$(this).data(c, $(this).attr(c));
					var coords = $(this).data(c).split(','), coordsPercent = new Array(coords.length);
					
					for (var i = 0; i < coordsPercent.length; ++i) {
						if (i % 2 === 0)
							coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
						else
							coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
					}
					$(this).attr(c, coordsPercent.toString());
				});
			});
		};
		rwdImageMap();
		$(window).resize(function() {
			rwdImageMap();
		});
	};
})(jQuery);