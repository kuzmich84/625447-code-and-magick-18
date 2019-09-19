'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашигтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

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

