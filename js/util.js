'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    getRandomElement: function (wizardOption) {
      var randomIndex = Math.floor((wizardOption.length - 1) * Math.random());
      return wizardOption[randomIndex];
    },

    randomSwapOrNot: function (firstName, lastName) {
      var randomIndex = Math.floor(Math.random() * 10);
      if (randomIndex <= 5) {
        return firstName + ' ' + lastName;
      } else {
        return lastName + ' ' + firstName;
      }
    },
  };
})();
