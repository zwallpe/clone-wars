(function () {
  'use strict';

  function drawBackground(ctx, width, height, time) {
    ctx.save();

    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#7fa7b9');
    sky.addColorStop(0.62, '#d6c39b');
    sky.addColorStop(1, '#b47d55');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunX = width * 0.78;
    const sunY = height * 0.22;
    ctx.fillStyle = 'rgba(255, 231, 166, 0.78)';
    ctx.beginPath();
    ctx.arc(sunX, sunY, Math.max(24, width * 0.09), 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(78, 66, 54, 0.24)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 11]);
    ctx.beginPath();
    ctx.moveTo(0, height * 0.3);
    ctx.lineTo(width, height * 0.3);
    ctx.stroke();
    ctx.setLineDash([]);

    const cloudShift = (time || 0) * 9;
    for (let i = 0; i < 3; i += 1) {
      const cloudX = ((i * 167 + cloudShift) % (width + 130)) - 65;
      const cloudY = height * (0.17 + i * 0.14);
      ctx.fillStyle = 'rgba(247, 237, 207, 0.57)';
      ctx.beginPath();
      ctx.ellipse(cloudX, cloudY, 36, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(cloudX + 25, cloudY - 6, 25, 13, 0, 0, Math.PI * 2);
      ctx.ellipse(cloudX - 24, cloudY - 3, 22, 11, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    const horizon = height * 0.74;
    ctx.fillStyle = '#6f755d';
    ctx.beginPath();
    ctx.moveTo(0, horizon + 20);
    ctx.lineTo(width * 0.16, horizon - 2);
    ctx.lineTo(width * 0.3, horizon + 14);
    ctx.lineTo(width * 0.46, horizon - 16);
    ctx.lineTo(width * 0.64, horizon + 12);
    ctx.lineTo(width * 0.81, horizon - 6);
    ctx.lineTo(width, horizon + 13);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'rgba(43, 51, 43, 0.48)';
    for (let i = 0; i < 8; i += 1) {
      const baseX = i * (width / 7) - 14;
      const baseY = horizon + 18 + (i % 3) * 5;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(baseX + 10, baseY - 33 - (i % 2) * 11);
      ctx.lineTo(baseX + 20, baseY);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();

    const top = height - groundHeight;
    ctx.fillStyle = '#4e493e';
    ctx.fillRect(0, top, width, groundHeight);

    ctx.fillStyle = '#b98f5d';
    ctx.fillRect(0, top, width, 7);
    ctx.strokeStyle = '#292c2b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, top + 7);
    ctx.lineTo(width, top + 7);
    ctx.stroke();

    const stripe = 44;
    const slide = ((offset || 0) % stripe + stripe) % stripe;
    ctx.fillStyle = 'rgba(224, 194, 135, 0.72)';
    for (let x = -stripe + slide; x < width + stripe; x += stripe) {
      ctx.beginPath();
      ctx.moveTo(x, top + 25);
      ctx.lineTo(x + 18, top + 25);
      ctx.lineTo(x + 39, height);
      ctx.lineTo(x + 21, height);
      ctx.closePath();
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(27, 29, 28, 0.65)';
    ctx.lineWidth = 2;
    for (let y = top + 22; y < height; y += 19) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();

    const half = size / 2;
    const tilt = Math.max(-0.22, Math.min(0.34, (velocity || 0) / 900));
    ctx.translate(x, y);
    ctx.rotate(tilt);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.fillStyle = '#b54f38';
    ctx.strokeStyle = '#252b2d';
    ctx.lineWidth = Math.max(2, size * 0.08);

    ctx.beginPath();
    ctx.moveTo(-half * 0.92, half * 0.08);
    ctx.lineTo(-half * 0.2, -half * 0.08);
    ctx.lineTo(half * 0.88, -half * 0.17);
    ctx.lineTo(half, 0);
    ctx.lineTo(half * 0.88, half * 0.17);
    ctx.lineTo(-half * 0.2, half * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#d9d4bd';
    ctx.beginPath();
    ctx.moveTo(-half * 0.18, -half * 0.06);
    ctx.lineTo(half * 0.35, -half * 0.45);
    ctx.lineTo(half * 0.55, -half * 0.36);
    ctx.lineTo(half * 0.28, half * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-half * 0.1, half * 0.06);
    ctx.lineTo(half * 0.42, half * 0.45);
    ctx.lineTo(half * 0.6, half * 0.35);
    ctx.lineTo(half * 0.27, half * 0.01);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#5f8793';
    ctx.beginPath();
    ctx.ellipse(half * 0.28, -half * 0.1, half * 0.17, half * 0.12, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e3b45f';
    ctx.beginPath();
    ctx.moveTo(half * 0.85, -half * 0.09);
    ctx.lineTo(half * 1.02, 0);
    ctx.lineTo(half * 0.85, half * 0.09);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();

    function drawObstacle(y, obstacleHeight) {
      if (obstacleHeight <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, pipeWidth, obstacleHeight);
      ctx.clip();

      const metal = ctx.createLinearGradient(x, 0, x + pipeWidth, 0);
      metal.addColorStop(0, '#3b4245');
      metal.addColorStop(0.45, '#bd8a58');
      metal.addColorStop(0.7, '#e0b16b');
      metal.addColorStop(1, '#4b4b46');
      ctx.fillStyle = metal;
      ctx.fillRect(x, y, pipeWidth, obstacleHeight);

      ctx.strokeStyle = '#24292b';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 1.5, y + 1.5, Math.max(0, pipeWidth - 3), Math.max(0, obstacleHeight - 3));

      ctx.fillStyle = 'rgba(31, 37, 38, 0.48)';
      const bandHeight = Math.min(13, Math.max(6, pipeWidth * 0.18));
      if (obstacleHeight > bandHeight * 1.7) {
        ctx.fillRect(x, y + bandHeight, pipeWidth, bandHeight);
        ctx.fillRect(x, y + obstacleHeight - bandHeight * 2, pipeWidth, bandHeight);
      }

      ctx.strokeStyle = 'rgba(247, 209, 133, 0.7)';
      ctx.lineWidth = 2;
      for (let markerY = y + bandHeight * 2.5; markerY < y + obstacleHeight - bandHeight; markerY += 21) {
        ctx.beginPath();
        ctx.moveTo(x + pipeWidth * 0.22, markerY);
        ctx.lineTo(x + pipeWidth * 0.78, markerY);
        ctx.stroke();
      }

      ctx.restore();
    }

    drawObstacle(0, gapTop);
    drawObstacle(gapBottom, Math.max(0, height - gapBottom));

    ctx.restore();
  }

  window.SPRITES = {
    drawBackground,
    drawGround,
    drawBird,
    drawPipe
  };
})();
