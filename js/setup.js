'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашигтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var setupOpen = document.querySelector('.setup-open');
var userDialog = document.querySelector('.setup');
var setupClose = userDialog.querySelector('.setup-close');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var userNameInput = document.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setupFireball = document.querySelector('.setup-fireball-wrap');
var setupWizardAppearance = document.querySelector('.setup-wizard-appearance');


var popupEscPressHandler = function (evt) {
  if (userNameInput !== document.activeElement) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
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


var getRandomElement = function (wizardOption) {
  var randomIndex = Math.floor((wizardOption.length - 1) * Math.random());
  return wizardOption[randomIndex];
};

var randomSwapOrNot = function (firstName, lastName) {
  var randomIndex = Math.floor(Math.random() * 10);
  if (randomIndex <= 5) {
    return firstName + ' ' + lastName;
  } else {
    return lastName + ' ' + firstName;
  }
};

var wizards = [];
for (var i = 0; i < 4; i++) {
  wizards[i] =
    {
      name: randomSwapOrNot(getRandomElement(WIZARD_NAMES), getRandomElement(WIZARD_LAST_NAMES)),
      coatColor: getRandomElement(COATS_COLOR),
      eyesColor: getRandomElement(EYES_COLOR),
    };
}

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

setupWizard.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomElement(COATS_COLOR);
  setupWizardAppearance.querySelector('[name="coat-color"]').value = wizardCoat.style.fill;
  wizardEyes.style.fill = getRandomElement(EYES_COLOR);
  setupWizardAppearance.querySelector('[name="eyes-color"]').value = wizardEyes.style.fill;
  var fireballColorRandom = getRandomElement(FIREBALL_COLOR);
  setupFireball.style.background = fireballColorRandom;
  setupFireball.querySelector('[name="fireball-color"]').value = fireballColorRandom;
});


