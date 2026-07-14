const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const livesEl = document.querySelector("#lives");
const levelEl = document.querySelector("#level");
const startButton = document.querySelector("#startButton");
const memoryToggle = document.querySelector("#memoryToggle");
const scoreList = document.querySelector("#scoreList");
const clearScoresButton = document.querySelector("#clearScoresButton");

const SCORE_STORAGE_KEY = "arcadePrototypeTopScores";
const SCORE_MEMORY_KEY = "arcadePrototypeScoreMemory";
const LOGICAL_WIDTH = Number(canvas.getAttribute("width"));
const LOGICAL_HEIGHT = Number(canvas.getAttribute("height"));

const world = {
  width: LOGICAL_WIDTH,
  height: LOGICAL_HEIGHT,
  floor: LOGICAL_HEIGHT - 54
};

const player = {
  x: world.width / 2,
  y: world.floor,
  width: 46,
  height: 78,
  hitbox: {
    offsetX: -23,
    offsetY: -78,
    width: 46,
    height: 84
  },
  speed: 1260,
  targetX: world.width / 2,
  direction: 0,
  lastDirection: 1,
  walkTime: 0,
  jumpTimer: 0,
  jumpElapsed: 0
};

const input = {
  left: false,
  right: false,
  pointerActive: false
};

const game = {
  running: false,
  score: 0,
  lives: 3,
  objects: [],
  lastTime: 0,
  spawnTimer: 0,
  spawnEvery: 0.88,
  elapsedTime: 0,
  level: 1,
  nextObjectId: 1,
  objectFreezeTimer: 0,
  doubleScoreTimer: 0,
  scoreSaved: false,
  topScores: []
};

const colors = {
  background: "#11151a",
  lane: "rgba(246, 241, 232, 0.06)",
  player: "#68c1ba",
  playerShadow: "#2e6f73",
  bonus: "#f0c453",
  malus: "#e85d58",
  playerHitbox: "rgba(104, 193, 186, 0.9)",
  objectHitbox: "rgba(240, 196, 83, 0.95)",
  text: "#f6f1e8"
};

function configureCanvasScale() {
  const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
  const backingWidth = Math.floor(LOGICAL_WIDTH * deviceScale);
  const backingHeight = Math.floor(LOGICAL_HEIGHT * deviceScale);

  if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
    canvas.width = backingWidth;
    canvas.height = backingHeight;
  }

  ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  ctx.imageSmoothingEnabled = true;
}

const malusVariants = [
  { label: "M1", size: "small", width: 82, height: 22, speedMultiplier: 1.05 },
  { label: "M2", size: "medium", width: 104, height: 28, speedMultiplier: 1 },
  { label: "M3", size: "large", width: 126, height: 34, speedMultiplier: 0.95 }
];

const rushMalusVariant = {
  label: "M4",
  size: "rush",
  width: 34,
  height: 112,
  speedMultiplier: 3,
  delayBeforeMove: 0.5
};

const bonusVariants = [
  { label: "B1", radius: 16 },
  { label: "B2", radius: 19 },
  { label: "B3", radius: 22 }
];

const movingBonusVariants = [
  { label: "B4", width: 46, height: 46, speedMultiplier: 0.6, xSpeed: 75, xPath: [86, 178, 126, 252, 164] },
  { label: "B5", width: 46, height: 46, speedMultiplier: 0.6, xSpeed: 75, xPath: [394, 302, 352, 228, 320] },
  { label: "B6", width: 46, height: 46, speedMultiplier: 0.6, xSpeed: 120, xPath: [240, 120, 360, 192, 420, 276] }
];

const harmlessMalusVariant = {
  label: "M7",
  size: "harmless",
  width: 26,
  height: 26,
  hitboxSize: 8,
  speedMultiplier: 1
};

const difficulty = {
  levelDuration: 10,
  maxLevel: 10,
  speedStep: 0.1
};

function resetGame() {
  game.running = true;
  game.score = 0;
  game.lives = 3;
  game.objects = [];
  game.lastTime = performance.now();
  game.spawnTimer = 0.45;
  game.spawnEvery = 0.88;
  game.elapsedTime = 0;
  game.level = 1;
  game.nextObjectId = 1;
  game.objectFreezeTimer = 0;
  game.doubleScoreTimer = 0;
  game.scoreSaved = false;
  player.x = world.width / 2;
  player.targetX = player.x;
  player.direction = 0;
  player.lastDirection = 1;
  player.walkTime = 0;
  player.jumpTimer = 0;
  player.jumpElapsed = 0;
  updateHud();
  startButton.classList.add("is-hidden");
  requestAnimationFrame(loop);
}

function updateHud() {
  scoreEl.textContent = game.score.toString();
  levelEl.textContent = game.level.toString();
  livesEl.textContent = game.lives.toString();
}

function initializeScoreboard() {
  if (!memoryToggle || !scoreList) {
    return;
  }

  memoryToggle.checked = getStoredScoreMemory();
  game.topScores = memoryToggle.checked ? loadStoredScores() : [];
  renderScoreboard();
}

function getStoredScoreMemory() {
  try {
    return localStorage.getItem(SCORE_MEMORY_KEY) !== "off";
  } catch (error) {
    return false;
  }
}

function loadStoredScores() {
  try {
    const rawScores = JSON.parse(localStorage.getItem(SCORE_STORAGE_KEY) || "[]");
    return sanitizeScores(rawScores);
  } catch (error) {
    return [];
  }
}

function saveStoredScores() {
  if (!memoryToggle || !memoryToggle.checked) {
    return;
  }

  try {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(game.topScores));
  } catch (error) {
    memoryToggle.checked = false;
  }
}

function setScoreMemory(enabled) {
  if (!memoryToggle) {
    return;
  }

  try {
    localStorage.setItem(SCORE_MEMORY_KEY, enabled ? "on" : "off");
  } catch (error) {
    memoryToggle.checked = false;
  }

  if (enabled) {
    game.topScores = mergeScores(loadStoredScores(), game.topScores);
    saveStoredScores();
  }

  renderScoreboard();
}

function addScoreToBoard(score, level) {
  if (score <= 0) {
    return;
  }

  game.topScores = mergeScores(game.topScores, [{
    score,
    level,
    date: new Date().toISOString()
  }]);
  saveStoredScores();
  renderScoreboard();
}

function mergeScores(...scoreGroups) {
  return sanitizeScores(scoreGroups.flat());
}

function sanitizeScores(scores) {
  return scores
    .filter((entry) => Number.isFinite(entry.score) && entry.score > 0)
    .map((entry) => ({
      score: Math.floor(entry.score),
      level: Number.isFinite(entry.level) ? Math.floor(entry.level) : 1,
      date: typeof entry.date === "string" ? entry.date : new Date().toISOString()
    }))
    .sort((a, b) => b.score - a.score || b.level - a.level || a.date.localeCompare(b.date))
    .slice(0, 10);
}

function renderScoreboard() {
  if (!scoreList) {
    return;
  }

  scoreList.textContent = "";

  for (let index = 0; index < 10; index += 1) {
    const entry = game.topScores[index];
    const item = document.createElement("li");

    const rank = document.createElement("span");
    rank.className = "score-rank";
    rank.textContent = `${index + 1}.`;
    item.append(rank);

    const value = document.createElement("span");
    value.className = "score-value";
    value.textContent = entry ? entry.score.toString() : "-";
    item.append(value);

    const level = document.createElement("span");
    level.className = "score-level";
    level.textContent = entry ? `N${entry.level}` : "";
    item.append(level);

    scoreList.append(item);
  }
}

function clearScores() {
  game.topScores = [];

  try {
    localStorage.removeItem(SCORE_STORAGE_KEY);
  } catch (error) {
    // Local storage can be unavailable on some browser privacy settings.
  }

  renderScoreboard();
}

function loop(now) {
  if (!game.running) {
    return;
  }

  const dt = Math.min((now - game.lastTime) / 1000, 0.033);
  game.lastTime = now;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

function update(dt) {
  updateDifficulty(dt);
  updatePlayer(dt);
  updateScoreBoost(dt);
  updatePlayerJump(dt);
  updateSpawner(dt);
  updateObjects(dt);
  checkCollisions();
}

function updateDifficulty(dt) {
  game.elapsedTime += dt;

  const nextLevel = clamp(
    Math.floor(game.elapsedTime / difficulty.levelDuration) + 1,
    1,
    difficulty.maxLevel
  );

  if (nextLevel !== game.level) {
    game.level = nextLevel;
    updateHud();
  }
}

function updatePlayer(dt) {
  const minX = player.width / 2 + 12;
  const maxX = world.width - player.width / 2 - 12;
  const previousX = player.x;
  let intendedDirection = 0;

  if (input.left) {
    player.targetX = player.x - player.speed * dt;
    intendedDirection -= 1;
  }

  if (input.right) {
    player.targetX = player.x + player.speed * dt;
    intendedDirection += 1;
  }

  player.targetX = clamp(player.targetX, minX, maxX);

  if (input.pointerActive && Math.abs(player.targetX - player.x) > 2) {
    intendedDirection = Math.sign(player.targetX - player.x);
  }

  const easing = input.pointerActive ? 16 : 12;
  player.x += (player.targetX - player.x) * Math.min(1, easing * dt);
  player.x = clamp(player.x, minX, maxX);

  const actualDirection = Math.abs(player.x - previousX) > 0.2
    ? Math.sign(player.x - previousX)
    : 0;
  player.direction = intendedDirection || actualDirection;

  if (player.direction) {
    player.lastDirection = player.direction;
    player.walkTime += dt;
  } else {
    player.walkTime = 0;
  }
}

function updatePlayerJump(dt) {
  if (player.jumpTimer <= 0) {
    return;
  }

  const wasJumping = player.jumpTimer > 0;
  player.jumpTimer = Math.max(0, player.jumpTimer - dt);
  player.jumpElapsed += dt;

  if (wasJumping && player.jumpTimer === 0) {
    game.doubleScoreTimer = 5;
  }
}

function updateScoreBoost(dt) {
  if (game.doubleScoreTimer <= 0 || player.jumpTimer > 0) {
    return;
  }

  game.doubleScoreTimer = Math.max(0, game.doubleScoreTimer - dt);
}

function updateSpawner(dt) {
  if (game.objectFreezeTimer > 0) {
    return;
  }

  game.spawnTimer -= dt;

  if (game.spawnTimer <= 0) {
    spawnObject();
    game.spawnTimer = game.spawnEvery + random(-0.16, 0.22);
  }
}

function spawnObject() {
  const type = Math.random() < 0.42 ? "B" : "M";
  const x = random(42, world.width - 42);
  const baseSpeed = random(160, 250);

  if (type === "B") {
    const availableBonusVariants = game.level >= 6 ? movingBonusVariants : [];
    const variant = availableBonusVariants[Math.floor(Math.random() * (availableBonusVariants.length + 1))];

    if (variant) {
      const spawnX = variant.xPath[0];
      const bonusId = game.nextObjectId++;

      game.objects.push({
        id: bonusId,
        type,
        label: variant.label,
        x: spawnX,
        y: -variant.height / 2,
        width: variant.width,
        height: variant.height,
        hitbox: {
          shape: "rect",
          offsetX: -variant.width / 2,
          offsetY: -variant.height / 2,
          width: variant.width,
          height: variant.height
        },
        xPath: variant.xPath.slice(),
        xTargetIndex: 1,
        xSpeed: variant.xSpeed,
        xDirection: Math.sign(variant.xPath[1] - spawnX),
        moveTime: 0,
        m7CollisionCount: 0,
        velocityX: 0,
        baseSpeed,
        speedMultiplier: variant.speedMultiplier
      });
      return;
    }

    const baseVariant = bonusVariants[Math.floor(Math.random() * bonusVariants.length)];

    game.objects.push({
      id: game.nextObjectId++,
      type,
      label: baseVariant.label,
      x,
      y: -28,
      radius: baseVariant.radius,
      hitbox: {
        shape: "circle",
        offsetX: 0,
        offsetY: 0,
        radius: baseVariant.radius
      },
      baseSpeed,
      speedMultiplier: 1
    });
    return;
  }

  const availableMalusVariants = game.level >= 6
    ? malusVariants.concat(rushMalusVariant)
    : malusVariants;
  const variant = availableMalusVariants[Math.floor(Math.random() * availableMalusVariants.length)];

  game.objects.push({
    id: game.nextObjectId++,
    type,
    label: variant.label,
    size: variant.size,
    x,
    y: variant.delayBeforeMove ? variant.height / 2 + 8 : -variant.height / 2,
    width: variant.width,
    height: variant.height,
    hitbox: {
      shape: "rect",
      offsetX: -variant.width / 2,
      offsetY: -variant.height / 2,
      width: variant.width,
      height: variant.height
    },
    rotation: variant.delayBeforeMove ? 0 : random(-0.18, 0.18),
    velocityX: 0,
    moveDelay: variant.delayBeforeMove ?? 0,
    baseSpeed,
    speedMultiplier: variant.speedMultiplier
  });
}

function createHarmlessMalus(x, y, baseSpeed, sourceBonusId) {
  const hitboxSize = harmlessMalusVariant.hitboxSize;

  return {
    id: game.nextObjectId++,
    type: "M",
    label: harmlessMalusVariant.label,
    size: harmlessMalusVariant.size,
    x,
    y,
    width: harmlessMalusVariant.width,
    height: harmlessMalusVariant.height,
    hitbox: {
      shape: "rect",
      offsetX: -hitboxSize / 2,
      offsetY: -hitboxSize / 2,
      width: hitboxSize,
      height: hitboxSize
    },
    rotation: 0,
    velocityX: 0,
    damage: false,
    sourceBonusId,
    playerTouching: false,
    baseSpeed,
    speedMultiplier: harmlessMalusVariant.speedMultiplier
  };
}

function updateObjects(dt) {
  if (game.objectFreezeTimer > 0) {
    game.objectFreezeTimer = Math.max(0, game.objectFreezeTimer - dt);
    return;
  }

  const levelSpeedMultiplier = getLevelSpeedMultiplier();
  const spawnedObjects = [];

  for (const object of game.objects) {
    let movementDt = dt;

    if (object.moveDelay > 0) {
      const waitingDt = Math.min(object.moveDelay, dt);
      object.moveDelay -= waitingDt;
      movementDt -= waitingDt;
    }

    if (movementDt <= 0) {
      continue;
    }

    object.y += object.baseSpeed * object.speedMultiplier * levelSpeedMultiplier * movementDt;

    if (object.xPath) {
      updateHorizontalPath(object, levelSpeedMultiplier, movementDt, spawnedObjects);
      object.moveTime += movementDt;
    } else if (object.velocityX) {
      object.x += object.velocityX * levelSpeedMultiplier * movementDt;
      keepObjectInsideHorizontalBounds(object);
    }
  }

  game.objects.push(...spawnedObjects);

  game.objects = game.objects.filter((object) => {
    if (object.y < world.height + 120) {
      return true;
    }

    return false;
  });
}

function getLevelSpeedMultiplier() {
  return 1 + (game.level - 1) * difficulty.speedStep;
}

function updateHorizontalPath(object, levelSpeedMultiplier, dt, spawnedObjects) {
  const targetX = object.xPath[object.xTargetIndex];
  const distance = targetX - object.x;
  const maxStep = object.xSpeed * levelSpeedMultiplier * dt;
  object.xDirection = Math.sign(distance) || object.xDirection || 1;

  if (Math.abs(distance) <= maxStep) {
    object.x = targetX;
    spawnHarmlessMalusFromHitboxCenter(object, spawnedObjects);
    object.xTargetIndex = (object.xTargetIndex + 1) % object.xPath.length;
    object.xDirection = Math.sign(object.xPath[object.xTargetIndex] - object.x) || object.xDirection;
    return;
  }

  object.x += object.xDirection * maxStep;
}

function spawnHarmlessMalusFromHitboxCenter(sourceObject, spawnedObjects) {
  const hitbox = getObjectHitbox(sourceObject);
  const x = hitbox.left + hitbox.width / 2;
  const y = hitbox.top + hitbox.height / 2;
  spawnedObjects.push(createHarmlessMalus(x, y, sourceObject.baseSpeed, sourceObject.id));
}

function keepObjectInsideHorizontalBounds(object) {
  const halfWidth = object.width / 2;
  const minX = halfWidth + 8;
  const maxX = world.width - halfWidth - 8;

  if (object.x < minX) {
    object.x = minX;
    object.velocityX = Math.abs(object.velocityX);
  }

  if (object.x > maxX) {
    object.x = maxX;
    object.velocityX = -Math.abs(object.velocityX);
  }
}

function checkCollisions() {
  const playerHitbox = getPlayerHitbox();

  for (const object of game.objects) {
    if (object.label !== "M7") {
      continue;
    }

    const objectHitbox = getObjectHitbox(object);
    const collided = rectsOverlap(objectHitbox, playerHitbox);

    if (collided) {
      recordHarmlessMalusCollision(object);
    } else {
      object.playerTouching = false;
    }
  }

  for (const object of game.objects) {
    if (object.hit) {
      continue;
    }

    if (object.label === "M7") {
      continue;
    }

    const objectHitbox = getObjectHitbox(object);
    const collided = objectHitbox.shape === "circle"
      ? circleRectCollision(objectHitbox, playerHitbox)
      : rectsOverlap(objectHitbox, playerHitbox);

    if (!collided) {
      continue;
    }

    object.hit = true;

    if (object.type === "B") {
      game.score += getBonusScore();
      if (object.xPath && object.m7CollisionCount === 0) {
        triggerPerfectMovingBonusReward();
      }
    } else if (object.damage === false) {
      game.score += 0;
    } else {
      game.lives -= 1;
    }

    updateHud();

    if (game.lives <= 0) {
      endGame();
      return;
    }
  }

  game.objects = game.objects.filter((object) => !object.hit);
}

function recordHarmlessMalusCollision(object) {
  if (object.playerTouching) {
    return;
  }

  object.playerTouching = true;

  const sourceBonus = game.objects.find((candidate) => candidate.id === object.sourceBonusId);
  if (sourceBonus) {
    sourceBonus.m7CollisionCount += 1;
  }
}

function triggerPerfectMovingBonusReward() {
  game.objectFreezeTimer = Math.max(game.objectFreezeTimer, 1);
  player.jumpTimer = 1;
  player.jumpElapsed = 0;
}

function getBonusScore() {
  return game.doubleScoreTimer > 0 ? 20 : 10;
}

function endGame() {
  game.running = false;

  if (!game.scoreSaved) {
    game.scoreSaved = true;
    addScoreToBoard(game.score, game.level);
  }

  startButton.textContent = "Rejouer";
  startButton.classList.remove("is-hidden");
  draw();
  drawEndOverlay();
}

function draw() {
  ctx.clearRect(0, 0, world.width, world.height);
  drawBackground();
  drawObjects();
  drawPlayer();
  drawHitboxes();
}

function drawBackground() {
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.strokeStyle = colors.lane;
  ctx.lineWidth = 2;
  for (let x = 80; x < world.width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, world.height);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(104, 193, 186, 0.11)";
  ctx.fillRect(0, world.floor + 10, world.width, world.height - world.floor);
}

function drawObjects() {
  for (const object of game.objects) {
    if (object.type === "B") {
      drawBonus(object);
    } else {
      drawMalus(object);
    }
  }
}

function drawBonus(object) {
  if (object.hitbox.shape === "rect") {
    drawSquareBonus(object);
    return;
  }

  ctx.save();
  ctx.translate(object.x, object.y);

  const glow = ctx.createRadialGradient(0, 0, 3, 0, 0, object.radius * 1.8);
  glow.addColorStop(0, "rgba(240, 196, 83, 0.85)");
  glow.addColorStop(1, "rgba(240, 196, 83, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, object.radius * 1.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colors.bonus;
  ctx.beginPath();
  ctx.arc(0, 0, object.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#15110a";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(object.label, 0, 1);
  ctx.restore();
}

function drawSquareBonus(object) {
  if (object.xPath) {
    drawMovingSquareBonus(object);
    return;
  }

  ctx.save();
  ctx.translate(object.x, object.y);

  ctx.fillStyle = "rgba(240, 196, 83, 0.22)";
  roundRect(-object.width / 2 - 6, -object.height / 2 - 6, object.width + 12, object.height + 12, 8);
  ctx.fill();

  roundRect(-object.width / 2, -object.height / 2, object.width, object.height, 7);
  ctx.fillStyle = colors.bonus;
  ctx.fill();

  ctx.fillStyle = "#15110a";
  ctx.font = "bold 17px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(object.label, 0, 1);
  ctx.restore();
}

function drawMovingSquareBonus(object) {
  const direction = object.xDirection || 1;
  const pulse = Math.sin((object.moveTime || 0) * 16) * 2;
  const lean = direction * 0.12;

  ctx.save();
  ctx.translate(object.x, object.y);
  ctx.rotate(lean);

  ctx.fillStyle = "rgba(240, 196, 83, 0.18)";
  roundRect(
    -object.width / 2 - direction * 10,
    -object.height / 2 - 4,
    object.width + 10,
    object.height + 8,
    8
  );
  ctx.fill();

  ctx.fillStyle = "rgba(246, 241, 232, 0.26)";
  ctx.beginPath();
  ctx.moveTo(direction * (object.width / 2 + 8), -9);
  ctx.lineTo(direction * (object.width / 2 + 18), 0);
  ctx.lineTo(direction * (object.width / 2 + 8), 9);
  ctx.closePath();
  ctx.fill();

  roundRect(-object.width / 2, -object.height / 2 + pulse * 0.25, object.width, object.height, 7);
  ctx.fillStyle = colors.bonus;
  ctx.fill();

  ctx.fillStyle = "rgba(21, 17, 10, 0.18)";
  ctx.fillRect(-object.width / 2 + 6, -object.height / 2 + 7, object.width - 12, 5);

  ctx.fillStyle = "#15110a";
  ctx.font = "bold 17px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(object.label, 0, 1);
  ctx.restore();
}

function drawMalus(object) {
  ctx.save();
  ctx.translate(object.x, object.y);
  ctx.rotate(object.rotation);

  roundRect(-object.width / 2, -object.height / 2, object.width, object.height, 10);
  ctx.fillStyle = colors.malus;
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(-object.width / 2 + 5, -object.height / 2 + 10, 5, object.height - 20);

  ctx.fillStyle = "#2b1110";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(object.label, 0, 0);
  ctx.restore();
}

function drawPlayer() {
  const jumpFrame = getPlayerJumpFrame();
  const footY = player.y + jumpFrame.offsetY;
  const facing = player.direction || player.lastDirection || 1;
  const isMoving = player.direction !== 0;
  const isJumping = player.jumpTimer > 0;
  const lean = isJumping ? 0 : (isMoving ? facing * 0.13 : 0);
  const stride = isJumping ? jumpFrame.legSpread : (isMoving ? Math.sin(player.walkTime * 18) * 7 : 0);
  const armSwing = isJumping ? jumpFrame.armRaise : (isMoving ? Math.cos(player.walkTime * 18) * 6 : 0);

  ctx.save();
  ctx.translate(player.x, 0);

  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.beginPath();
  ctx.ellipse(0, player.y + 9, isJumping ? 24 : 34, isJumping ? 5 : 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  drawPlayerSpriteLayer(12, colors.playerShadow, facing, lean, stride, armSwing, footY, isJumping);
  drawPlayerSpriteLayer(8, colors.player, facing, lean, stride, armSwing, footY, isJumping);

  ctx.save();
  ctx.translate(player.x, footY);
  ctx.rotate(lean);
  ctx.fillStyle = colors.player;
  ctx.beginPath();
  ctx.arc(facing * 3, -player.height + 17, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function getPlayerJumpFrame() {
  if (player.jumpTimer <= 0) {
    return { offsetY: 0, armRaise: 0, legSpread: 0 };
  }

  const frame = Math.min(3, Math.floor(player.jumpElapsed / 0.25));
  const frames = [
    { offsetY: -8, armRaise: -12, legSpread: 3 },
    { offsetY: -28, armRaise: -22, legSpread: 8 },
    { offsetY: -22, armRaise: -18, legSpread: 6 },
    { offsetY: -6, armRaise: -6, legSpread: 1 }
  ];

  return frames[frame];
}

function drawPlayerSpriteLayer(lineWidth, color, facing, lean, stride, armSwing, footY, isJumping) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";

  ctx.save();
  ctx.translate(player.x, footY);
  ctx.rotate(lean);

  ctx.beginPath();
  ctx.moveTo(0, -player.height + 31);
  ctx.lineTo(facing * 4, -27);
  ctx.moveTo(-21, -player.height + 45 + armSwing * (isJumping ? 1 : 0.25));
  ctx.lineTo(21, -player.height + 45 + armSwing * (isJumping ? 1 : -0.25));
  ctx.moveTo(facing * 4, -28);
  ctx.lineTo(-16 + stride, 0);
  ctx.moveTo(facing * 4, -28);
  ctx.lineTo(16 - stride, 0);
  ctx.stroke();

  ctx.restore();
}

function drawHitboxes() {
  drawRectHitbox(getPlayerHitbox(), colors.playerHitbox);

  for (const object of game.objects) {
    const hitbox = getObjectHitbox(object);

    if (hitbox.shape === "circle") {
      drawCircleHitbox(hitbox, colors.objectHitbox);
    } else {
      drawRectHitbox(hitbox, colors.objectHitbox);
    }
  }
}

function drawRectHitbox(hitbox, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(hitbox.left, hitbox.top, hitbox.width, hitbox.height);
  ctx.restore();
}

function drawCircleHitbox(hitbox, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(hitbox.x, hitbox.y, hitbox.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawEndOverlay() {
  ctx.fillStyle = "rgba(16, 17, 20, 0.72)";
  ctx.fillRect(0, 0, world.width, world.height);

  ctx.fillStyle = colors.text;
  ctx.font = "800 34px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Partie terminee", world.width / 2, world.height / 2 - 34);

  ctx.font = "600 19px sans-serif";
  ctx.fillText(`Score : ${game.score}`, world.width / 2, world.height / 2 + 7);
}

function getPlayerHitbox() {
  return makeRectHitbox(player, player.hitbox);
}

function getObjectHitbox(object) {
  if (object.hitbox.shape === "circle") {
    return {
      shape: "circle",
      x: object.x + object.hitbox.offsetX,
      y: object.y + object.hitbox.offsetY,
      radius: object.hitbox.radius
    };
  }

  return makeRectHitbox(object, object.hitbox);
}

function makeRectHitbox(entity, hitbox) {
  const left = entity.x + hitbox.offsetX;
  const top = entity.y + hitbox.offsetY;

  return {
    shape: "rect",
    left,
    right: left + hitbox.width,
    top,
    bottom: top + hitbox.height,
    width: hitbox.width,
    height: hitbox.height
  };
}

function rectsOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function circleRectCollision(circle, rect) {
  const closestX = clamp(circle.x, rect.left, rect.right);
  const closestY = clamp(circle.y, rect.top, rect.bottom);
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function setPointerTarget(event) {
  const rect = canvas.getBoundingClientRect();
  const scale = world.width / rect.width;
  player.targetX = (event.clientX - rect.left) * scale;
}

function resetInputState() {
  input.left = false;
  input.right = false;
  input.pointerActive = false;
  player.targetX = player.x;
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "q") {
    input.left = true;
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    input.right = true;
  }

  if ((event.key === " " || event.key === "Enter") && !game.running) {
    resetGame();
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "q") {
    input.left = false;
    player.targetX = player.x;
  }

  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    input.right = false;
    player.targetX = player.x;
  }
});

canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  input.pointerActive = true;
  canvas.setPointerCapture(event.pointerId);
  setPointerTarget(event);
});

canvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  if (input.pointerActive) {
    setPointerTarget(event);
  }
});

canvas.addEventListener("pointerup", (event) => {
  event.preventDefault();
  input.pointerActive = false;
  canvas.releasePointerCapture(event.pointerId);
});

canvas.addEventListener("pointercancel", resetInputState);

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

window.addEventListener("resize", () => {
  configureCanvasScale();
  draw();
});

window.addEventListener("orientationchange", () => {
  configureCanvasScale();
  draw();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    resetInputState();
  }
});

memoryToggle?.addEventListener("change", () => {
  setScoreMemory(memoryToggle.checked);
});

clearScoresButton?.addEventListener("click", clearScores);

startButton.addEventListener("click", resetGame);

configureCanvasScale();
initializeScoreboard();
draw();
