/* -------------------------------------------------- */
/* Author : Spiff Jekey-Green */
/* MIT License : http://opensource.org/licenses/MIT */
/* Demo / Generator : spiffgreen.com/projects/slideshow.js */
/* Github : github.com/spiffgreen/slideshow.js */
/* How to use? : Check the Github README */
/* Version : v1.0.1 */
/* Date : 1-09-2020
/* -------------------------------------------------- */

/* For the debugging and writing purpose the comment below will show a simple representation of the obj expected */
/* Explanation for the obj passed into the SlideShow function  */
// * The container property should be the class of the div to contain all slide related elements. It's required.
// * The box property is the name of the class whose element actually contains the slides to be presented. It's required.
// * The duration property holds the number of seconds required for the next turn. It's in milliseconds and is required.
// * The axis property holds either 'x' or 'y', this tells what direction the scroll property will go.

// It will have navigator and owl-eye elements each with there seperate class names

// var obj = {
//     container: "slide-container",
//     box: "slide-box",
//     duration: 1000,
//     axis: "x"
// }
// var test = SlideShow(obj)
// Job done that's it :)

!(function (global) {
  "use strict";

  var SlideShow = function (obj) {
    return new SlideShow.init(obj);
  };

  SlideShow.prototype = {};

  /* Setting default values for data not provided by user */
  const DEFAULT_DURATION = 3000;
  const DEFAULT_REVERSE = false; // Deprecated
  const DEFAULT_AXIS = "x";

  // Helper functions here
  function makeChildren(type, number) {
    let elem = [];
    for(let i = 0; i < number; i++) {
      var con = document.createElement(type);
      elem.push(con);
    }
    return elem;
  }

  SlideShow.init = function (obj) {
    var self = this;

    if (typeof obj.container == "undefined") throw "The container property is required!\nPlease read the docs for more info\nIf there's a problem please visit http://spiffgreen.com/slideshow/report";
    else if (typeof obj.box == "undefined") throw "The box property is required!\nPlease read the docs for more info\nIf there's a problem please visit http://spiffgreen.com/slideshow/report";
    else {
      /* Setting the supplied data */
      self.container = obj.container;
      self.box = obj.box;
      // self.navigator = obj.navigator || null; // Deprecated
      self.duration = obj.duration || DEFAULT_DURATION;
      // self.reverse = obj.reverse || DEFAULT_REVERSE;  // Deprecated
      self.axis = obj.axis || DEFAULT_AXIS;

      self.axis.toLowerCase();


      /* Get the required elements for the slides and store in distinct variables */
      const slide = document.querySelector(`.${self.box}`);
      const container = document.querySelector(`.${self.container}`);
      const inners = document.querySelectorAll(`.${self.box} > div`);

      /* Make the appropiate styling for the slides to work, make sure it can be extended */
      if(!container) throw "Container should represent the className of the main element. See documentation.";
      container.style.display = "flex";
      container.style.alignItems = "center";
      if (!slide) throw "Box should be the name of the class for the actual slide.\nPlease read the docs for more info\nIf there's a problem please visit http://spiffgreen.com/slideshow/report";
      slide.style.height = getComputedStyle(container).height;
      // slide.style.width = getComputedStyle(container).width;
      slide.style.display = "flex";
      slide.style.flexWrap = "wrap";
      slide.style.overflow = "auto";
      slide.style.scrollBehavior = "smooth";
      slide.style.setProperty("-ms-overflow-style", "none");
      slide.style.setProperty("scrollbar-width", "none");
      slide.style.setProperty("width", "100%");
      //   document.querySelector(`.${self.box}::-webkit-scrollbar`).setProperty("display", "none");

      // Taking of the ugly, unwanted side bar.
      var sheet = document.styleSheets[0];
      sheet.insertRule(`.${self.box}::-webkit-scrollbar {display: none;}`, sheet.rules.length);
      sheet.insertRule(".slideShow-eye { width: 10px; height: 10px; background: white; border-radius: 50% }", sheet.rules.length);

      self.axis == "x"
        ? (slide.style.flexDirection = "column")
        : self.axis == "y"
        ? (slide.style.flexDirection = "row")
        : console.warn(
            "Sorry value provided as axis property should either be 'x' or 'y'.\nPlease read the docs for more info\nIf there's a problem please visit http://spiffgreen.com/slideshow/report"
          );

      inners.forEach((i) => {
        i.style.height = getComputedStyle(slide).height;
        i.style.width = getComputedStyle(slide).width;
      });

      // create and add owls-eyes to the container
      // make sure to track the current element in view to update the styles
      var owlContainer = document.createElement("div");
      owlContainer.style.width = (parseInt(getComputedStyle(container).width) / 8) + "px";
      owlContainer.style.position = "absolute";
      owlContainer.style.padding = "10px";
      if(self.axis === "x") {
        container.style.flexDirection = "column-reverse"; 
      } else {
        owlContainer.style.flexDirection = "column";
        owlContainer.style.width = (parseInt(getComputedStyle(container).width) / 40) + "px";
        owlContainer.style.height = (parseInt(getComputedStyle(container).height) / 1) + "px";
        owlContainer.style.alignItems = "center";
      }
      owlContainer.style.display = "flex";
      owlContainer.style.justifyContent = "space-around";
      // owlContainer.style.background = "red";
      // owlContainer.innerHTML = "KJDKDJKJDJKJDJ";
      container.appendChild(owlContainer);

      var eyes = makeChildren("div", inners.length);
      eyes.forEach(i => {
        i.className = "slideShow-eye";
        owlContainer.appendChild(i);
      });

      var clearId;

      /* Now the magic goes here */
      function start() {
        const length_of_inners = inners.length;

        let counter = 1,
          minus;

        if(clearId) clearInterval(clearId);

        clearId = setInterval(function () {
          eyes.forEach((i, idx) => {
            if(idx == counter) {
              i.style.background = "navy";
            } else {
              i.style.background = "white";
            }
          });

          if (counter !== length_of_inners) {
            switch (self.axis) {
              case "x":
                slide.scrollBy(parseInt(getComputedStyle(slide).width) + 1, 0);
                break;
              case "y":
                slide.scrollBy(0, parseInt(getComputedStyle(slide).height) + 1);
                break;
              default:
                  throw "Sorry value provided as axis property should either be 'x' or 'y'.\nPlease read the docs for more info\nIf there's a problem please visit http://spiffgreen.com/slideshow/report";
            }
            counter++;
          } else {
            // debugger;
            switch (self.axis) {
              case "x":
                minus =
                  length_of_inners *
                  (parseInt(getComputedStyle(slide).width) + 1);
                slide.scrollBy(-minus, 0);
                break;
              case "y":
                minus =
                  length_of_inners *
                  (parseInt(getComputedStyle(slide).height) + 1);
                slide.scrollBy(0, -minus);
                break;
              default:
                throw"Sorry value provided as axis property should either be 'x' or 'y'.\nPlease read the docs for more info\nIf there's a problem please visit http://spiffgreen.com/slideshow/report";
            }
            counter = 0;
          }
        }, self.duration);
      };

      window.addEventListener("load", start);
      window.addEventListener("resize", start);
    }
  };

  SlideShow.init.prototype = SlideShow.prototype;
  SlideShow.Version = "v1.0.1";
  SlideShow.Author = "Spiff Jekey-Green";
  SlideShow.ReleaseDate = "1-09-2020";

  global.SlideShow = SlideShow;
  
})(window);
