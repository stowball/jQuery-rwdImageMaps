/*
* rwdImageMaps AngularJS Directive v1.0
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
* 
* Original Copyright (c) 2013 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*
* angular-rwdImageMaps.js (by Philip Saa)
* https://github.com/cowglow/
* @cowglow
*/

angular.module("rwdImageMaps",[]).directive("rwdimgmap",function($window){return{restrict:"CA",link:function(scope,element,attrs){var w=$(element).attr("width"),h=$(element).attr("height");function resize(){if(!w||!h){var temp=new Image();temp.src=$(element).attr("src");if(!w){w=temp.width}if(!h){h=temp.height}}var wPercent=$(element).width()/100,hPercent=$(element).height()/100,map=attrs.usemap.replace("#",""),c="coords";angular.element('map[name="'+map+'"]').find("area").each(function(){var $this=$(this);if(!$this.data(c)){$this.data(c,$this.attr(c))}var coords=$this.data(c).split(","),coordsPercent=new Array(coords.length);for(var i=0;i<coordsPercent.length;++i){if(i%2===0){coordsPercent[i]=parseInt(((coords[i]/w)*100)*wPercent)}else{coordsPercent[i]=parseInt(((coords[i]/h)*100)*hPercent)}}$this.attr(c,coordsPercent.toString())})}angular.element($window).resize(resize).trigger("resize")}}});