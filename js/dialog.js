'use strict';

(function () {
  var userNameInput = document.querySelector('.setup-user-name');
  var setupOpen = document.querySelector('.setup-open');
  var userDialog = document.querySelector('.setup');
  var setupClose = userDialog.querySelector('.setup-close');
  var dialogHandler = userDialog.querySelector('.upload');

  var popupEscPressHandler = function (evt) {
    if (userNameInput !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  };
  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    userDialog.removeAttribute('style');
  };

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });


  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    var clickMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var clickMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', clickMouseMoveHandler);
      document.removeEventListener('mouseup', clickMouseUpHandler);

      if (dragged) {
        var onClickPreventDefault = function (upEvent) {
          upEvent.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', clickMouseMoveHandler);
    document.addEventListener('mouseup', clickMouseUpHandler);
  });
})();
