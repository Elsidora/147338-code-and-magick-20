'use strict';

(function () {

  var COUNT_WIZARDS = 4;

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');

  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');

  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');

  var setupFireballs = setup.querySelector('.setup-fireball-wrap');

  var setupSimilar = setup.querySelector('.setup-similar');

  var wizardList = setupSimilar.querySelector('.setup-similar-list');

  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  function getArrayRandomIndex(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  function createArrayOfWizards(count) {
    var arrWizards = [];
    for (var i = 0; i < count; i += 1) {
      var wizardObject = {
        name: getArrayRandomIndex(NAMES) + ' ' + getArrayRandomIndex(SURNAMES),
        coatColor: getArrayRandomIndex(COATS),
        eyesColor: getArrayRandomIndex(EYES)
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

  function onCoatPress() {
    var coatColor = getArrayRandomIndex(COATS);
    setupWizardCoat.style.fill = coatColor;
    var coatInput = setup.querySelector('input[name="coat-color"]');
    coatInput.value = coatColor;
  }

  function onEyesPress() {
    var eyesColor = getArrayRandomIndex(EYES);
    setupWizardEyes.style.fill = eyesColor;
    var eyesInput = setup.querySelector('input[name="eyes-color"]');
    eyesInput.value = eyesColor;
  }

  function onFireballPress() {
    var fireballColor = getArrayRandomIndex(FIREBALLS);
    setupFireballs.style.background = fireballColor;
    var fireballInput = setup.querySelector('input[name="fireball-color"]');
    fireballInput.value = fireballColor;
  }

  window.render = {
    onCoatPress: onCoatPress,
    onEyesPress: onEyesPress,
    onFireballPress: onFireballPress
  };

  renderWizards(createArrayOfWizards(COUNT_WIZARDS), wizardList);
  setupSimilar.classList.remove('hidden');
})();
