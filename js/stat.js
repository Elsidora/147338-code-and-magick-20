'use strict';

(function () {
  var CLOUD_HEIGHT = 270;
  var CLOUD_WIDTH = 420;
  var CLOUD_POSITIONX = 100;
  var CLOUD_POSITIONY = 10;
  var CLOUD_COLOR = '#fff';
  var CLOUD_SHADOW_STEP = 10;
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var TEXT = 'Ура! Вы победили!';
  var TEXT_RESULTS = 'Список результатов:';
  var TEXT_COLOR = '#000';
  var TEXT_FONT = '16px PT Mono';
  var TEXT_FONT_STEP = 15;
  var HISTOGRAM_MAX_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_STEP = 50;
  var BAR_COLOR_YOU = 'rgba(255, 0, 0, 1)';

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + CLOUD_WIDTH / 2, y - CLOUD_SHADOW_STEP);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x + CLOUD_WIDTH + CLOUD_SHADOW_STEP * 3, y + CLOUD_HEIGHT / 2);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_WIDTH / 2, y + CLOUD_HEIGHT + CLOUD_SHADOW_STEP);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x - CLOUD_SHADOW_STEP * 3, y + CLOUD_HEIGHT / 2);
    ctx.fill();
  }

  function getMaxElement(arr) {
    return Math.floor(Math.max.apply(null, arr));
  }

  function renderText(ctx, color, font, textBaseline, text, x, y) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, x, y);
  }

  function getBlueShade() {
    return 'hsl(240, ' + Math.random().toFixed(2) * 100 + '%, 50%)';
  }

  function renderBar(ctx, color, name, time, index, barHeight, x) {
    var positionX = x + BAR_STEP + (BAR_WIDTH + BAR_STEP) * index;
    ctx.fillStyle = color;
    ctx.fillRect(positionX, CLOUD_HEIGHT - barHeight - CLOUD_SHADOW_STEP * 2, BAR_WIDTH, barHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(name, positionX, CLOUD_HEIGHT - CLOUD_SHADOW_STEP);
    ctx.fillText(time, positionX, CLOUD_HEIGHT - barHeight - CLOUD_SHADOW_STEP * 5);
  }

  window.renderStatistics = function (ctx, names, times) {

    renderCloud(ctx, CLOUD_POSITIONX + CLOUD_SHADOW_STEP, CLOUD_POSITIONY + CLOUD_SHADOW_STEP, CLOUD_SHADOW_COLOR);

    renderCloud(ctx, CLOUD_POSITIONX, CLOUD_POSITIONY, CLOUD_COLOR);

    renderText(ctx, TEXT_COLOR, TEXT_FONT, 'top', TEXT, CLOUD_POSITIONX + CLOUD_SHADOW_STEP * 3, CLOUD_POSITIONY + CLOUD_SHADOW_STEP * 1.5);

    renderText(ctx, TEXT_COLOR, TEXT_FONT, 'top', TEXT_RESULTS, CLOUD_POSITIONX + CLOUD_SHADOW_STEP * 3, CLOUD_POSITIONY + CLOUD_SHADOW_STEP * 1.5 + TEXT_FONT_STEP);

    var maxTime = getMaxElement(times);
    var namesLength = names.length;

    for (var i = 0; i < namesLength; i += 1) {
      var barHeight = HISTOGRAM_MAX_HEIGHT * times[i] / maxTime;
      var barColor = names[i] === 'Вы' ? BAR_COLOR_YOU : getBlueShade();
      renderBar(ctx, barColor, names[i], Math.floor(times[i]), i, barHeight, CLOUD_POSITIONX);
    }
  };
})();
