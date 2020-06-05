'use strict';

(function () {

  var COUNT_WIZARDS = 4;

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

  var setup = document.querySelector('.setup');

  setup.classList.remove('hidden');

  var setupSimilar = setup.querySelector('.setup-similar');

  setupSimilar.classList.remove('hidden');

  var wizardList = setupSimilar.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getArrWizards(count) {
    var arrWizards = [];
    for (var i = 0; i < count; i += 1) {
      var wizardObject = {
        name: NAMES[getRandomNumber(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomNumber(0, SURNAMES.length - 1)],
        coatColor: COATS[getRandomNumber(0, COATS.length - 1)],
        eyesColor: EYES[getRandomNumber(0, EYES.length - 1)]
      };
      arrWizards.push(wizardObject);
    }
    return arrWizards;
  }

  function renderWizards(arrObjects, container) {
    var fragment = document.createDocumentFragment();
    arrObjects.forEach(function (item) {
      var wizardElement = wizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = item.name;
      wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
      wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;
      fragment.appendChild(wizardElement);
    });
    container.appendChild(fragment);
  }

  renderWizards(getArrWizards(COUNT_WIZARDS), wizardList);
})();
