import { Application, Container, Graphics, Text } from "pixi.js";

const LOGICAL_WIDTH = 480;
const LOGICAL_HEIGHT = 840;
const SCORE_STORAGE_KEY = "arcadePrototypeTopScores";
const SCORE_MEMORY_KEY = "arcadePrototypeScoreMemory";
const PLAYER_NAME_KEY = "arcadePrototypePlayerName";
const DEFAULT_PLAYER_NAME = "Joueur";

const pixiContainer =
  document.querySelector<HTMLDivElement>("#pixi-container")!;
const scoreEl = document.querySelector<HTMLElement>("#score")!;
const livesEl = document.querySelector<HTMLElement>("#lives")!;
const levelEl = document.querySelector<HTMLElement>("#level")!;
const startButton = document.querySelector<HTMLButtonElement>("#startButton")!;
const memoryToggle = document.querySelector<HTMLInputElement>("#memoryToggle")!;
const playerNameInput =
  document.querySelector<HTMLInputElement>("#playerNameInput")!;
const scoreList = document.querySelector<HTMLOListElement>("#scoreList")!;
const clearScoresButton =
  document.querySelector<HTMLButtonElement>("#clearScoresButton")!;

type Hitbox =
  | {
      shape: "rect";
      offsetX: number;
      offsetY: number;
      width: number;
      height: number;
    }
  | { shape: "circle"; offsetX: number; offsetY: number; radius: number };

type RectHitbox = {
  shape: "rect";
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

type CircleHitbox = {
  shape: "circle";
  x: number;
  y: number;
  radius: number;
};

type GameObject = {
  id: number;
  type: "B" | "M";
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  hitbox: Hitbox;
  baseSpeed: number;
  speedMultiplier: number;
  velocityX?: number;
  rotation?: number;
  moveDelay?: number;
  hit?: boolean;
  damage?: boolean;
  sourceBonusId?: number;
  playerTouching?: boolean;
  xPath?: number[];
  xTargetIndex?: number;
  xSpeed?: number;
  xDirection?: number;
  moveTime?: number;
  m7CollisionCount?: number;
};

type ScoreEntry = {
  name: string;
  score: number;
  level: number;
  date: string;
};

const world = {
  width: LOGICAL_WIDTH,
  height: LOGICAL_HEIGHT,
  floor: LOGICAL_HEIGHT - 54,
};

const player = {
  x: world.width / 2,
  y: world.floor,
  width: 46,
  height: 78,
  hitbox: {
    shape: "rect" as const,
    offsetX: -30,
    offsetY: -80,
    width: 60,
    height: 88,
  },
  speed: 1260,
  targetX: world.width / 2,
  direction: 0,
  lastDirection: 1,
  walkTime: 0,
  jumpTimer: 0,
  jumpElapsed: 0,
};

const input = {
  left: false,
  right: false,
  pointerActive: false,
};

const game = {
  running: false,
  score: 0,
  lives: 3,
  objects: [] as GameObject[],
  spawnTimer: 0,
  spawnEvery: 0.88,
  elapsedTime: 0,
  level: 1,
  nextObjectId: 1,
  objectFreezeTimer: 0,
  doubleScoreTimer: 0,
  scoreSaved: false,
  topScores: [] as ScoreEntry[],
};

const colors = {
  background: 0x11151a,
  lane: 0xf6f1e8,
  floor: 0x68c1ba,
  player: 0x68c1ba,
  playerShadow: 0x2e6f73,
  bonus: 0xf0c453,
  malus: 0xe85d58,
  playerHitbox: 0x68c1ba,
  objectHitbox: 0xf0c453,
  textDark: 0x15110a,
  malusText: 0x2b1110,
  textLight: 0xf6f1e8,
};

const malusVariants = [
  { label: "M1", size: "small", width: 82, height: 22, speedMultiplier: 1.05 },
  { label: "M2", size: "medium", width: 104, height: 28, speedMultiplier: 1 },
  { label: "M3", size: "large", width: 126, height: 34, speedMultiplier: 0.95 },
];

const rushMalusVariant = {
  label: "M4",
  size: "rush",
  width: 34,
  height: 112,
  speedMultiplier: 3,
  delayBeforeMove: 0.5,
};

const bonusVariants = [
  { label: "B1", radius: 16 },
  { label: "B2", radius: 19 },
  { label: "B3", radius: 22 },
];

const movingBonusVariants = [
  {
    label: "B4",
    width: 46,
    height: 46,
    speedMultiplier: 0.6,
    xSpeed: 75,
    xPath: [86, 178, 126, 252, 164],
  },
  {
    label: "B5",
    width: 46,
    height: 46,
    speedMultiplier: 0.6,
    xSpeed: 75,
    xPath: [394, 302, 352, 228, 320],
  },
  {
    label: "B6",
    width: 46,
    height: 46,
    speedMultiplier: 0.6,
    xSpeed: 120,
    xPath: [240, 120, 360, 192, 420, 276],
  },
];

const harmlessMalusVariant = {
  label: "M7",
  size: "harmless",
  width: 26,
  height: 26,
  hitboxSize: 8,
  speedMultiplier: 1,
};

const difficulty = {
  levelDuration: 10,
  maxLevel: 10,
  speedStep: 0.1,
};

const app = new Application();
const scene = new Container();
const graphics = new Graphics();
const labelLayer = new Container();

function resetGame() {
  game.running = true;
  game.score = 0;
  game.lives = 3;
  game.objects = [];
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
}

function updateHud() {
  scoreEl.textContent = game.score.toString();
  levelEl.textContent = game.level.toString();
  livesEl.textContent = game.lives.toString();
}

function initializeScoreboard() {
  memoryToggle.checked = getStoredScoreMemory();
  playerNameInput.value = getStoredPlayerName();
  game.topScores = memoryToggle.checked ? loadStoredScores() : [];
  renderScoreboard();
}

function getStoredPlayerName() {
  try {
    return sanitizePlayerName(
      localStorage.getItem(PLAYER_NAME_KEY) || DEFAULT_PLAYER_NAME,
    );
  } catch {
    return DEFAULT_PLAYER_NAME;
  }
}

function getStoredScoreMemory() {
  try {
    return localStorage.getItem(SCORE_MEMORY_KEY) !== "off";
  } catch {
    return false;
  }
}

function loadStoredScores() {
  try {
    const rawScores = JSON.parse(
      localStorage.getItem(SCORE_STORAGE_KEY) || "[]",
    );
    return sanitizeScores(Array.isArray(rawScores) ? rawScores : []);
  } catch {
    return [];
  }
}

function saveStoredScores() {
  if (!memoryToggle.checked) return;

  try {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(game.topScores));
  } catch {
    memoryToggle.checked = false;
  }
}

function setScoreMemory(enabled: boolean) {
  try {
    localStorage.setItem(SCORE_MEMORY_KEY, enabled ? "on" : "off");
  } catch {
    memoryToggle.checked = false;
  }

  if (enabled) {
    game.topScores = mergeScores(loadStoredScores(), game.topScores);
    saveStoredScores();
  }

  renderScoreboard();
}

function addScoreToBoard(score: number, level: number) {
  if (score <= 0) return;

  game.topScores = mergeScores(game.topScores, [
    { name: getPlayerName(), score, level, date: new Date().toISOString() },
  ]);
  saveStoredScores();
  renderScoreboard();
}

function mergeScores(...scoreGroups: ScoreEntry[][]) {
  return sanitizeScores(scoreGroups.flat());
}

function sanitizeScores(scores: Partial<ScoreEntry>[]) {
  return scores
    .reduce<ScoreEntry[]>((entries, entry) => {
      const score = Number(entry.score);
      if (!Number.isFinite(score) || score <= 0) return entries;

      const level = Number(entry.level);
      entries.push({
        name: sanitizePlayerName(entry.name),
        score: Math.floor(score),
        level: Number.isFinite(level) ? Math.floor(level) : 1,
        date:
          typeof entry.date === "string"
            ? entry.date
            : new Date().toISOString(),
      });
      return entries;
    }, [])
    .sort(
      (a, b) =>
        b.score - a.score || b.level - a.level || a.date.localeCompare(b.date),
    )
    .slice(0, 10);
}

function getPlayerName() {
  const name = sanitizePlayerName(playerNameInput.value);
  playerNameInput.value = name;
  storePlayerName(name);
  return name;
}

function sanitizePlayerName(name: unknown) {
  if (typeof name !== "string") return DEFAULT_PLAYER_NAME;
  const cleaned = name.trim().replace(/\s+/g, " ").slice(0, 12);
  return cleaned || DEFAULT_PLAYER_NAME;
}

function storePlayerName(name: string) {
  try {
    localStorage.setItem(PLAYER_NAME_KEY, name);
  } catch {
    // The score itself still works when storage is unavailable.
  }
}

function renderScoreboard() {
  scoreList.textContent = "";

  for (let index = 0; index < 10; index += 1) {
    const entry = game.topScores[index];
    const item = document.createElement("li");

    const rank = document.createElement("span");
    rank.className = "score-rank";
    rank.textContent = `${index + 1}.`;
    item.append(rank);

    const name = document.createElement("span");
    name.className = "score-name";
    name.textContent = entry ? entry.name : "-";
    item.append(name);

    const value = document.createElement("span");
    value.className = "score-value";
    value.textContent = entry ? entry.score.toString() : "";
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
  } catch {
    // Storage may be unavailable in strict privacy modes.
  }
  renderScoreboard();
}

function update(dt: number) {
  updateDifficulty(dt);
  updatePlayer(dt);
  updateScoreBoost(dt);
  updatePlayerJump(dt);
  updateSpawner(dt);
  updateObjects(dt);
  checkCollisions();
}

function updateDifficulty(dt: number) {
  game.elapsedTime += dt;
  const nextLevel = clamp(
    Math.floor(game.elapsedTime / difficulty.levelDuration) + 1,
    1,
    difficulty.maxLevel,
  );
  if (nextLevel !== game.level) {
    game.level = nextLevel;
    updateHud();
  }
}

function updatePlayer(dt: number) {
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

  const actualDirection =
    Math.abs(player.x - previousX) > 0.2 ? Math.sign(player.x - previousX) : 0;
  player.direction = intendedDirection || actualDirection;

  if (player.direction) {
    player.lastDirection = player.direction;
    player.walkTime += dt;
  } else {
    player.walkTime = 0;
  }
}

function updatePlayerJump(dt: number) {
  if (player.jumpTimer <= 0) return;

  const wasJumping = player.jumpTimer > 0;
  player.jumpTimer = Math.max(0, player.jumpTimer - dt);
  player.jumpElapsed += dt;

  if (wasJumping && player.jumpTimer === 0) {
    game.doubleScoreTimer = 5;
  }
}

function updateScoreBoost(dt: number) {
  if (game.doubleScoreTimer <= 0 || player.jumpTimer > 0) return;
  game.doubleScoreTimer = Math.max(0, game.doubleScoreTimer - dt);
}

function updateSpawner(dt: number) {
  if (game.objectFreezeTimer > 0) return;

  game.spawnTimer -= dt;
  if (game.spawnTimer <= 0) {
    spawnObject();
    game.spawnTimer = game.spawnEvery + random(-0.16, 0.22);
  }
}

function spawnObject() {
  const type: "B" | "M" = Math.random() < 0.42 ? "B" : "M";
  const x = random(42, world.width - 42);
  const baseSpeed = random(160, 250);

  if (type === "B") {
    const availableBonusVariants = game.level >= 6 ? movingBonusVariants : [];
    const variant =
      availableBonusVariants[
        Math.floor(Math.random() * (availableBonusVariants.length + 1))
      ];

    if (variant) {
      const spawnX = variant.xPath[0] ?? world.width / 2;
      const nextX = variant.xPath[1] ?? spawnX;
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
          height: variant.height,
        },
        xPath: variant.xPath.slice(),
        xTargetIndex: 1,
        xSpeed: variant.xSpeed,
        xDirection: Math.sign(nextX - spawnX),
        moveTime: 0,
        m7CollisionCount: 0,
        velocityX: 0,
        baseSpeed,
        speedMultiplier: variant.speedMultiplier,
      });
      return;
    }

    const baseVariant =
      bonusVariants[Math.floor(Math.random() * bonusVariants.length)] ??
      bonusVariants[0]!;
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
        radius: baseVariant.radius,
      },
      baseSpeed,
      speedMultiplier: 1,
    });
    return;
  }

  const availableMalusVariants =
    game.level >= 6 ? malusVariants.concat(rushMalusVariant) : malusVariants;
  const variant =
    availableMalusVariants[
      Math.floor(Math.random() * availableMalusVariants.length)
    ] ?? malusVariants[0]!;

  const moveDelay =
    "delayBeforeMove" in variant && typeof variant.delayBeforeMove === "number"
      ? variant.delayBeforeMove
      : 0;

  game.objects.push({
    id: game.nextObjectId++,
    type,
    label: variant.label,
    x,
    y: moveDelay ? variant.height / 2 + 8 : -variant.height / 2,
    width: variant.width,
    height: variant.height,
    hitbox: {
      shape: "rect",
      offsetX: -variant.width / 2,
      offsetY: -variant.height / 2,
      width: variant.width,
      height: variant.height,
    },
    rotation: 0,
    velocityX: 0,
    moveDelay,
    baseSpeed,
    speedMultiplier: variant.speedMultiplier,
  });
}

function createHarmlessMalus(
  x: number,
  y: number,
  baseSpeed: number,
  sourceBonusId: number,
): GameObject {
  const hitboxSize = harmlessMalusVariant.hitboxSize;
  return {
    id: game.nextObjectId++,
    type: "M",
    label: harmlessMalusVariant.label,
    x,
    y,
    width: harmlessMalusVariant.width,
    height: harmlessMalusVariant.height,
    hitbox: {
      shape: "rect",
      offsetX: -hitboxSize / 2,
      offsetY: -hitboxSize / 2,
      width: hitboxSize,
      height: hitboxSize,
    },
    rotation: 0,
    velocityX: 0,
    damage: false,
    sourceBonusId,
    playerTouching: false,
    baseSpeed,
    speedMultiplier: harmlessMalusVariant.speedMultiplier,
  };
}

function updateObjects(dt: number) {
  if (game.objectFreezeTimer > 0) {
    game.objectFreezeTimer = Math.max(0, game.objectFreezeTimer - dt);
    return;
  }

  const levelSpeedMultiplier = getLevelSpeedMultiplier();
  const spawnedObjects: GameObject[] = [];

  for (const object of game.objects) {
    let movementDt = dt;
    if ((object.moveDelay ?? 0) > 0) {
      const waitingDt = Math.min(object.moveDelay ?? 0, dt);
      object.moveDelay = (object.moveDelay ?? 0) - waitingDt;
      movementDt -= waitingDt;
    }

    if (movementDt <= 0) continue;

    object.y +=
      object.baseSpeed *
      object.speedMultiplier *
      levelSpeedMultiplier *
      movementDt;

    if (object.xPath) {
      updateHorizontalPath(
        object,
        levelSpeedMultiplier,
        movementDt,
        spawnedObjects,
      );
      object.moveTime = (object.moveTime ?? 0) + movementDt;
    } else if (object.velocityX) {
      object.x += object.velocityX * levelSpeedMultiplier * movementDt;
      keepObjectInsideHorizontalBounds(object);
    }
  }

  game.objects.push(...spawnedObjects);
  game.objects = game.objects.filter((object) => object.y < world.height + 120);
}

function getLevelSpeedMultiplier() {
  return 1 + (game.level - 1) * difficulty.speedStep;
}

function updateHorizontalPath(
  object: GameObject,
  levelSpeedMultiplier: number,
  dt: number,
  spawnedObjects: GameObject[],
) {
  if (!object.xPath || object.xTargetIndex == null || object.xSpeed == null)
    return;

  const targetX = object.xPath[object.xTargetIndex] ?? object.x;
  const distance = targetX - object.x;
  const maxStep = object.xSpeed * levelSpeedMultiplier * dt;
  object.xDirection = Math.sign(distance) || object.xDirection || 1;

  if (Math.abs(distance) <= maxStep) {
    object.x = targetX;
    spawnHarmlessMalusFromHitboxCenter(object, spawnedObjects);
    object.xTargetIndex = (object.xTargetIndex + 1) % object.xPath.length;
    object.xDirection =
      Math.sign((object.xPath[object.xTargetIndex] ?? object.x) - object.x) ||
      object.xDirection;
    return;
  }

  object.x += object.xDirection * maxStep;
}

function spawnHarmlessMalusFromHitboxCenter(
  sourceObject: GameObject,
  spawnedObjects: GameObject[],
) {
  const hitbox = getObjectHitbox(sourceObject);
  if (hitbox.shape !== "rect") return;
  const x = hitbox.left + hitbox.width / 2;
  const y = hitbox.top + hitbox.height / 2;
  spawnedObjects.push(
    createHarmlessMalus(x, y, sourceObject.baseSpeed, sourceObject.id),
  );
}

function keepObjectInsideHorizontalBounds(object: GameObject) {
  const halfWidth = (object.width ?? 0) / 2;
  const minX = halfWidth + 8;
  const maxX = world.width - halfWidth - 8;

  if (object.x < minX) {
    object.x = minX;
    object.velocityX = Math.abs(object.velocityX ?? 0);
  }

  if (object.x > maxX) {
    object.x = maxX;
    object.velocityX = -Math.abs(object.velocityX ?? 0);
  }
}

function checkCollisions() {
  const playerHitbox = getPlayerHitbox();

  for (const object of game.objects) {
    if (object.label !== "M7") continue;
    const objectHitbox = getObjectHitbox(object);
    const collided =
      objectHitbox.shape === "rect" && rectsOverlap(objectHitbox, playerHitbox);

    if (collided) {
      recordHarmlessMalusCollision(object);
    } else {
      object.playerTouching = false;
    }
  }

  for (const object of game.objects) {
    if (object.hit || object.label === "M7") continue;

    const objectHitbox = getObjectHitbox(object);
    const collided =
      objectHitbox.shape === "circle"
        ? circleRectCollision(objectHitbox, playerHitbox)
        : rectsOverlap(objectHitbox, playerHitbox);

    if (!collided) continue;

    object.hit = true;

    if (object.type === "B") {
      game.score += getBonusScore();
      if (object.xPath && object.m7CollisionCount === 0) {
        triggerPerfectMovingBonusReward();
      }
    } else if (object.damage !== false) {
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

function recordHarmlessMalusCollision(object: GameObject) {
  if (object.playerTouching) return;
  object.playerTouching = true;

  const sourceBonus = game.objects.find(
    (candidate) => candidate.id === object.sourceBonusId,
  );
  if (sourceBonus) {
    sourceBonus.m7CollisionCount = (sourceBonus.m7CollisionCount ?? 0) + 1;
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
}

function draw() {
  graphics.clear();
  labelLayer.removeChildren().forEach((child) => child.destroy());
  drawBackground();
  drawObjects();
  drawPlayer();
  drawHitboxes();
  if (!game.running && game.scoreSaved) drawEndOverlay();
}

function drawBackground() {
  graphics.rect(0, 0, world.width, world.height).fill(colors.background);

  for (let x = 80; x < world.width; x += 80) {
    graphics
      .moveTo(x, 0)
      .lineTo(x, world.height)
      .stroke({ color: colors.lane, alpha: 0.06, width: 2 });
  }

  graphics
    .rect(0, world.floor + 10, world.width, world.height - world.floor)
    .fill({ color: colors.floor, alpha: 0.11 });
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

function drawBonus(object: GameObject) {
  if (object.hitbox.shape === "rect") {
    drawSquareBonus(object);
    return;
  }

  const radius = object.radius ?? 18;
  graphics
    .circle(object.x, object.y, radius * 1.8)
    .fill({ color: colors.bonus, alpha: 0.16 });
  graphics.circle(object.x, object.y, radius).fill(colors.bonus);
  addLabel(object.label, object.x, object.y + 1, 18, colors.textDark);
}

function drawSquareBonus(object: GameObject) {
  if (object.xPath) {
    drawMovingSquareBonus(object);
    return;
  }

  const width = object.width ?? 46;
  const height = object.height ?? 46;
  graphics
    .roundRect(
      object.x - width / 2 - 6,
      object.y - height / 2 - 6,
      width + 12,
      height + 12,
      8,
    )
    .fill({
      color: colors.bonus,
      alpha: 0.22,
    });
  graphics
    .roundRect(object.x - width / 2, object.y - height / 2, width, height, 7)
    .fill(colors.bonus);
  addLabel(object.label, object.x, object.y + 1, 17, colors.textDark);
}

function drawMovingSquareBonus(object: GameObject) {
  const width = object.width ?? 46;
  const height = object.height ?? 46;
  const direction = object.xDirection || 1;
  const pulse = Math.sin((object.moveTime || 0) * 16) * 2;
  const lean = direction * 0.12;

  graphics.save();
  graphics.translateTransform(object.x, object.y);
  graphics.rotateTransform(lean);
  graphics
    .roundRect(
      -width / 2 - direction * 10,
      -height / 2 - 4,
      width + 10,
      height + 8,
      8,
    )
    .fill({
      color: colors.bonus,
      alpha: 0.18,
    });
  graphics
    .poly([
      direction * (width / 2 + 8),
      -9,
      direction * (width / 2 + 18),
      0,
      direction * (width / 2 + 8),
      9,
    ])
    .fill({
      color: colors.textLight,
      alpha: 0.26,
    });
  graphics
    .roundRect(-width / 2, -height / 2 + pulse * 0.25, width, height, 7)
    .fill(colors.bonus);
  graphics
    .rect(-width / 2 + 6, -height / 2 + 7, width - 12, 5)
    .fill({ color: colors.textDark, alpha: 0.18 });
  graphics.restore();
  addLabel(object.label, object.x, object.y + 1, 17, colors.textDark);
}

function drawMalus(object: GameObject) {
  const hitbox = getObjectHitbox(object);
  if (hitbox.shape !== "rect") return;

  const width = hitbox.width;
  const height = hitbox.height;
  const x = pixel(hitbox.left);
  const y = pixel(hitbox.top);

  graphics.save();
  graphics.roundRect(x, y, width, height, 10).fill(colors.malus);
  graphics
    .rect(x + 5, y + 10, 5, Math.max(0, height - 20))
    .fill({ color: 0xffffff, alpha: 0.2 });
  graphics.restore();
  addLabel(
    object.label,
    hitbox.left + hitbox.width / 2,
    hitbox.top + hitbox.height / 2,
    18,
    colors.malusText,
  );
}

function drawPlayer() {
  const jumpFrame = getPlayerJumpFrame();
  const playerX = pixel(player.x);
  const footY = pixel(player.y + jumpFrame.offsetY);
  const isMoving = player.direction !== 0;
  const isJumping = player.jumpTimer > 0;
  const lean = 0;
  const stride = isJumping
    ? jumpFrame.legSpread
    : isMoving
      ? Math.sin(player.walkTime * 18) * 7
      : 0;
  const armSwing = isJumping
    ? jumpFrame.armRaise
    : isMoving
      ? Math.cos(player.walkTime * 18) * 6
      : 0;

  graphics
    .ellipse(
      playerX,
      pixel(player.y + 9),
      isJumping ? 24 : 34,
      isJumping ? 5 : 8,
    )
    .fill({ color: 0x000000, alpha: 0.24 });
  drawPlayerSpriteLayer(
    12,
    colors.playerShadow,
    lean,
    stride,
    armSwing,
    footY,
    isJumping,
  );
  drawPlayerSpriteLayer(
    8,
    colors.player,
    lean,
    stride,
    armSwing,
    footY,
    isJumping,
  );

  graphics.save();
  graphics.translateTransform(playerX, footY);
  graphics.rotateTransform(lean);
  graphics.circle(0, -player.height + 17, 16).fill(colors.player);
  graphics.restore();
}

function getPlayerJumpFrame() {
  if (player.jumpTimer <= 0) return { offsetY: 0, armRaise: 0, legSpread: 0 };
  const frame = Math.min(3, Math.floor(player.jumpElapsed / 0.25));
  const frames = [
    { offsetY: -8, armRaise: -12, legSpread: 3 },
    { offsetY: -28, armRaise: -22, legSpread: 8 },
    { offsetY: -22, armRaise: -18, legSpread: 6 },
    { offsetY: -6, armRaise: -6, legSpread: 1 },
  ];
  return frames[frame] ?? frames[0];
}

function drawPlayerSpriteLayer(
  lineWidth: number,
  color: number,
  lean: number,
  stride: number,
  armSwing: number,
  footY: number,
  isJumping: boolean,
) {
  graphics.save();
  graphics.translateTransform(pixel(player.x), footY);
  graphics.rotateTransform(lean);
  graphics
    .moveTo(0, -player.height + 31)
    .lineTo(0, -27)
    .moveTo(-21, -player.height + 45 + armSwing * (isJumping ? 1 : 0.25))
    .lineTo(21, -player.height + 45 + armSwing * (isJumping ? 1 : -0.25))
    .moveTo(0, -28)
    .lineTo(-16 + stride, 0)
    .moveTo(0, -28)
    .lineTo(16 - stride, 0)
    .stroke({ color, width: lineWidth, cap: "round" });
  graphics.restore();
}

function drawHitboxes() {
  drawRectHitbox(getPlayerHitbox(), colors.playerHitbox);

  for (const object of game.objects) {
    const hitbox = getObjectHitbox(object);
    if (hitbox.shape === "circle") {
      graphics
        .circle(hitbox.x, hitbox.y, hitbox.radius)
        .stroke({ color: colors.objectHitbox, width: 2, alpha: 0.95 });
    } else {
      drawRectHitbox(hitbox, colors.objectHitbox);
    }
  }
}

function drawRectHitbox(hitbox: RectHitbox, color: number) {
  graphics
    .rect(hitbox.left, hitbox.top, hitbox.width, hitbox.height)
    .stroke({ color, width: 2, alpha: 0.95 });
}

function drawEndOverlay() {
  graphics
    .rect(0, 0, world.width, world.height)
    .fill({ color: 0x101114, alpha: 0.72 });
  addLabel(
    "Partie terminee",
    world.width / 2,
    world.height / 2 - 34,
    34,
    colors.textLight,
  );
  addLabel(
    `Score : ${game.score}`,
    world.width / 2,
    world.height / 2 + 7,
    19,
    colors.textLight,
  );
}

function addLabel(
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: number,
) {
  const label = new Text({
    text,
    style: {
      fill: color,
      fontFamily: "Inter, Arial, sans-serif",
      fontSize,
      fontWeight: "800",
    },
  });
  label.anchor.set(0.5);
  label.position.set(x, y);
  labelLayer.addChild(label);
}

function getPlayerHitbox() {
  return makeRectHitbox(
    { x: player.x, y: player.y + getPlayerJumpFrame().offsetY },
    player.hitbox,
  );
}

function getObjectHitbox(object: GameObject): RectHitbox | CircleHitbox {
  if (object.hitbox.shape === "circle") {
    return {
      shape: "circle",
      x: object.x + object.hitbox.offsetX,
      y: object.y + object.hitbox.offsetY,
      radius: object.hitbox.radius,
    };
  }
  return makeRectHitbox(object, object.hitbox);
}

function makeRectHitbox(
  entity: { x: number; y: number },
  hitbox: Extract<Hitbox, { shape: "rect" }>,
): RectHitbox {
  const left = entity.x + hitbox.offsetX;
  const top = entity.y + hitbox.offsetY;
  return {
    shape: "rect",
    left,
    right: left + hitbox.width,
    top,
    bottom: top + hitbox.height,
    width: hitbox.width,
    height: hitbox.height,
  };
}

function rectsOverlap(a: RectHitbox, b: RectHitbox) {
  return (
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
  );
}

function circleRectCollision(circle: CircleHitbox, rect: RectHitbox) {
  const closestX = clamp(circle.x, rect.left, rect.right);
  const closestY = clamp(circle.y, rect.top, rect.bottom);
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pixel(value: number) {
  return Math.round(value);
}

function setPointerTarget(event: PointerEvent) {
  const rect = app.canvas.getBoundingClientRect();
  const scale = world.width / rect.width;
  player.targetX = (event.clientX - rect.left) * scale;
}

function resetInputState() {
  input.left = false;
  input.right = false;
  input.pointerActive = false;
  player.targetX = player.x;
}

function resizeRenderer() {
  app.canvas.style.width = "100%";
  app.canvas.style.height = "100%";
}

async function startApp() {
  await app.init({
    width: LOGICAL_WIDTH,
    height: LOGICAL_HEIGHT,
    backgroundAlpha: 0,
    antialias: true,
    autoDensity: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
  });

  app.canvas.setAttribute("aria-label", "Prototype de jeu d'arcade PixiJS");
  pixiContainer.appendChild(app.canvas);
  app.stage.addChild(scene);
  scene.addChild(graphics, labelLayer);

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "q")
      input.left = true;
    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d")
      input.right = true;
    if ((event.key === " " || event.key === "Enter") && !game.running)
      resetGame();
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

  app.canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    input.pointerActive = true;
    app.canvas.setPointerCapture(event.pointerId);
    setPointerTarget(event);
  });

  app.canvas.addEventListener("pointermove", (event) => {
    event.preventDefault();
    if (input.pointerActive) setPointerTarget(event);
  });

  app.canvas.addEventListener("pointerup", (event) => {
    event.preventDefault();
    input.pointerActive = false;
    app.canvas.releasePointerCapture(event.pointerId);
  });

  app.canvas.addEventListener("pointercancel", resetInputState);
  app.canvas.addEventListener("contextmenu", (event) => event.preventDefault());

  window.addEventListener("resize", resizeRenderer);
  window.addEventListener("orientationchange", resizeRenderer);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetInputState();
  });

  memoryToggle.addEventListener("change", () =>
    setScoreMemory(memoryToggle.checked),
  );
  playerNameInput.addEventListener("change", () => {
    playerNameInput.value = getPlayerName();
  });
  clearScoresButton.addEventListener("click", clearScores);
  startButton.addEventListener("click", resetGame);

  app.ticker.add((ticker) => {
    const dt = Math.min(ticker.deltaMS / 1000, 0.033);
    if (game.running) update(dt);
    draw();
  });

  initializeScoreboard();
  resizeRenderer();
  draw();
}

void startApp();
