'use strict';

(function () {
  window.colorize = function (element, color) {
    element.addEventListener('click', function () {
      if (element.tagName.toLowerCase() === 'div') {
        element.style.background = window.util.getRandomElement(color);
      } else {
        element.style.fill = window.util.getRandomElement(color);
      }
    });
  };
})();
