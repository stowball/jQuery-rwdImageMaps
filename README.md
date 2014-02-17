# AngularJS RWD Image Maps

### An AngularJS Directive that allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize

---

#### Usage:

* If possible, add [correct, unitless](http://dev.w3.org/html5/markup/img.html) `width` and `height` attributes to your image map images. You can override these in CSS to make them responsive.
* Add a link to jQuery in your page, preferably at the bottom just before the closing `</body>`
* Include AngularJS link and angular-rwdImageMaps.js

---

```html
	<img class="rwdimgmap" usemap="#YourMapName" />
	or
	<img rwdimgmap usemap="#YourMapName" />
```
```js
angular.module('map', ['rwdImageMaps'])
	.controller('MapCtrl', function($scope){
		$scope.myTrigger = function(arg){
			alert(arg);
		}
	});
```

#### Demo:
Original jQuery Plugin
http://mattstow.com/experiment/responsive-image-maps/rwd-image-maps.html

AngularJS Directive
http://www.cowglow.com/github/rwdImageMaps

---

Copyright (c) 2012 [Matt Stow](http://mattstow.com)  
Licensed under the MIT license *(see [LICENSE](https://github.com/stowball/jQuery-rwdImageMaps/blob/master/LICENSE) for details)*  
Minified version created with Online YUI Compressor: http://www.refresh-sf.com/yui/