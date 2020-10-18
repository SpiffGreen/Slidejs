# snowfall.js

### A lightweight Javascript library for creating slideshow effect, It's a toy project though :)

-----------------------------
# Author
### [Spiff Jekey-Green](http://spiffjg.herokuapp.com)

-----------------------------
### `Demo`
Codepen demo <br>
http://codepen.io/SpiffJekeyGreen/pen/dj3

-----------------------------
### `Usage`

Load snowfall.js and configure the snow-particles

__index.html__
```html
<div id="slide-container"></div>

<script src="slideshow.js"></script>
<script src="app.js"></script>
```

__app.js__
```javascript
var slider = {
    container: "slide-container",
    box: "slide-b",
    duration: 2000,
    axis: "x"
};

SlideShow(slider);
```

-------------------------------
### `Options`

| key             | type      | use case            | example       | required |
| --------------- | --------- | ------------------- | ------------- | -------- |
| `container` | string | * |  `"container"`  |    `true` |
| `box`     | string | * |  `"box"` | `true` |
| `duration` | number | * | `2000` |  `false` |
| `axis` | number | * | `y or x` | `true` |

------------------------------
### `Hosting / CDN`
__*Please use this host or your own to load slideshow.js on your projects*__

[http://www.jsdelivr.com/#!slideshow.js](http://www.jsdelivr.com/#!slideshow.js)

