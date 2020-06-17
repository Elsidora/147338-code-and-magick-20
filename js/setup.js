'use strict';

(function () {

  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupUserName = setup.querySelector('.setup-user-name');

  var setupClose = setup.querySelector('.setup-close');
  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireballs = setup.querySelector('.setup-fireball-wrap');
  var userAvatar = setup.querySelector('.upload');

  function openSetup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);
    setupWizardCoat.addEventListener('click', window.render.onCoatPress);
    setupWizardEyes.addEventListener('click', window.render.onEyesPress);
    setupFireballs.addEventListener('click', window.render.onFireballPress);
    setupUserName.addEventListener('focus', function () {
      document.removeEventListener('keydown', onEscapePress);
    });
    setupUserName.addEventListener('blur', function () {
      document.addEventListener('keydown', onEscapePress);
    });
    userAvatar.addEventListener('mousedown', window.dialog.onMouseDown);
  }

  function closeSetup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onEscapePress);
  }

  function onEscapePress(evt) {
    window.util.isEscapeEvent(evt, closeSetup);
  }

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
  });

})();
