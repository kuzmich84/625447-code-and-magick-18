'use strict';

(function () {
  window.colorize = function (element, color, inputName) {
    element.addEventListener('click', function () {
      if (element.tagName.toLowerCase() === 'div') {
        var currentColor = window.util.getRandomElement(color);
        element.style.background = currentColor;
        inputName.value = currentColor;
      } else {
        element.style.fill = window.util.getRandomElement(color);
        inputName.value = element.style.fill;
      }
    });
  };
})();
