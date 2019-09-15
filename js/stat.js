'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var BORDER_RADIUS = 40;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var ANGEL_ZERO_DEGREE = 0;
var ANGEL_90_DEGREE = 0.5 * Math.PI;
var ANGEL_180_DEGREE = Math.PI;
var ANGEL_270_DEGREE = 1.5 * Math.PI;
var ANGEL_360_DEGREE = 2 * Math.PI;
var FONT_GAP = 20;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_BOTTOM = 245;
var BAR_GAP_RIGHT = 50;
var BAR_GAP_LEFT = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + BORDER_RADIUS, y + BORDER_RADIUS, BORDER_RADIUS, ANGEL_180_DEGREE, ANGEL_270_DEGREE);
  ctx.arc(x + CLOUD_WIDTH - BORDER_RADIUS, y + BORDER_RADIUS, BORDER_RADIUS, ANGEL_270_DEGREE, ANGEL_360_DEGREE);
  ctx.arc(x + CLOUD_WIDTH - BORDER_RADIUS, y + CLOUD_HEIGHT - BORDER_RADIUS, BORDER_RADIUS, ANGEL_ZERO_DEGREE, ANGEL_90_DEGREE);
  ctx.arc(x + BORDER_RADIUS, y + CLOUD_HEIGHT - BORDER_RADIUS, BORDER_RADIUS, ANGEL_90_DEGREE, ANGEL_180_DEGREE);
  ctx.closePath();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов: ', CLOUD_X + FONT_GAP, CLOUD_Y + GAP + FONT_GAP + FONT_GAP);
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {

    var barSaturation = 100 * Math.random();
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP_LEFT + i * (BAR_WIDTH + BAR_GAP_RIGHT), BAR_BOTTOM - BAR_HEIGHT * times[i] / maxTime - GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240' + ',' + barSaturation + '%' + ',' + '50%)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP_LEFT + i * (BAR_WIDTH + BAR_GAP_RIGHT), BAR_BOTTOM, BAR_WIDTH, -BAR_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP_LEFT + i * (BAR_WIDTH + BAR_GAP_RIGHT), BAR_BOTTOM + FONT_GAP);
  }
};
