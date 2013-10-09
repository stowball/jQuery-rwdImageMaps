/*
* rwdImageMaps jQuery plugin v1.5
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
;(function($) {
	$.fn.rwdImageMaps = function(options) {
		var $img = this,
            defaults = {
                // use img[width], img[height] attributes to set values?
                useImgDimensionAttrs: true,
                // bind and trigger the main method (rwdImageMap) to window.resize?
                // allows for using this plugin in custom resize methods without
                // continuously triggering the window.resize method
                triggerOnResize: true
            },
            attrW = 'width',
            attrH = 'height';

        options = $.extend(true, defaults, options);
		
		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;
				
				var that = this,
					$that = $(that);
				
				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$('<img />').load(function() {
                    var w = options.useImgDimensionAttrs ? $that.attr(attrW) : null,
                        h = options.useImgDimensionAttrs ? $that.attr(attrH) : null;
					
					if (!w || !h) {
						var temp = new Image();
						temp.src = $that.attr('src');
						if (!w)
							w = temp.width;
						if (!h)
							h = temp.height;
					}
					
					var wPercent = $that.width()/100,
						hPercent = $that.height()/100,
						map = $that.attr('usemap').replace('#', ''),
						c = 'coords';
					
					$('map[name="' + map + '"]').find('area').each(function() {
						var $this = $(this);
						if (!$this.data(c))
							$this.data(c, $this.attr(c));
						
						var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);

                        for (var i = 0; i < coordsPercent.length; ++i) {
                            if (i % 2 === 0) {
                                coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
                            } else {
                                coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
                            }
                        }
                        $this.attr(c, coordsPercent.toString());
					});
				}).attr('src', $that.attr('src'));
			});
		};
        if (options.triggerOnResize) {
            $(window).resize(rwdImageMap).trigger('resize');
        } else {
            rwdImageMap();
        }
		
		return this;
	};
})(jQuery);