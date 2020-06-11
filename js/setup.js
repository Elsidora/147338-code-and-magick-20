'use strict';

(function () {

  var COUNT_WIZARDS = 4;

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

  var EYES = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupOpen = document.querySelector('.setup-open');

  var setup = document.querySelector('.setup');

  var setupUserName = setup.querySelector('.setup-user-name');

  var setupClose = setup.querySelector('.setup-close');

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

  function onEscapePress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (!setup.classList.contains('hidden')) {
        closeSetup();
      }
    }
  }

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (setup.classList.contains('hidden')) {
        openSetup();
      }
    }
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      if (!setup.classList.contains('hidden')) {
        closeSetup();
      }
    }
  });

  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);
    setupWizardCoat.addEventListener('click', onCoatPress);
    setupWizardEyes.addEventListener('click', onEyesPress);
    setupFireballs.addEventListener('click', onFireballPress);
    setupUserName.addEventListener('focus', function () {
      document.removeEventListener('keydown', onEscapePress);
    });
    setupUserName.addEventListener('blur', function () {
      document.addEventListener('keydown', onEscapePress);
    });
  }

  function closeSetup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onEscapePress);
  }

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
  });

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


  renderWizards(createArrayOfWizards(COUNT_WIZARDS), wizardList);
  setupSimilar.classList.remove('hidden');
})();
