import type { CircleHitbox, GameObject, GameState, Hitbox, InputState, PlayerState, RectHitbox, WorldState } from './arcadeTypes'
import { bonusVariants, harmlessMalusVariant, malusVariants, movingBonusVariants, rushMalusVariant } from './arcadeConstants'

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function pixel(value: number): number {
  return Math.round(value)
}

export function makeRectHitbox(entity: { x: number; y: number }, hb: Extract<Hitbox, { shape: 'rect' }>): RectHitbox {
  const left = entity.x + hb.offsetX
  const top = entity.y + hb.offsetY
  return { shape: 'rect', left, right: left + hb.width, top, bottom: top + hb.height, width: hb.width, height: hb.height }
}

export function getPlayerJumpFrame(player: PlayerState) {
  if (player.jumpTimer <= 0) {
    return { offsetY: 0, armRaise: 0, legSpread: 0 }
  }

  const frame = Math.min(3, Math.floor(player.jumpElapsed / 0.25))
  return [
    { offsetY: -8, armRaise: -12, legSpread: 3 },
    { offsetY: -28, armRaise: -22, legSpread: 8 },
    { offsetY: -22, armRaise: -18, legSpread: 6 },
    { offsetY: -6, armRaise: -6, legSpread: 1 },
  ][frame] ?? { offsetY: 0, armRaise: 0, legSpread: 0 }
}

export function getPlayerHitbox(player: PlayerState, floorOffset = 0): RectHitbox {
  return makeRectHitbox({ x: player.x, y: player.y + floorOffset }, player.hitbox)
}

export function getObjectHitbox(obj: GameObject): RectHitbox | CircleHitbox {
  if (obj.hitbox.shape === 'circle') {
    return {
      shape: 'circle',
      x: obj.x + obj.hitbox.offsetX,
      y: obj.y + obj.hitbox.offsetY,
      radius: obj.hitbox.radius,
    }
  }
  return makeRectHitbox(obj as { x: number; y: number }, obj.hitbox as Extract<Hitbox, { shape: 'rect' }>)
}

export function rectsOverlap(a: RectHitbox, b: RectHitbox): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
}

export function circleRectCollision(circle: CircleHitbox, rect: RectHitbox): boolean {
  const cx = clamp(circle.x, rect.left, rect.right)
  const cy = clamp(circle.y, rect.top, rect.bottom)
  return (circle.x - cx) ** 2 + (circle.y - cy) ** 2 <= circle.radius ** 2
}

export function getLevelSpeedMultiplier(level: number): number {
  return 1 + (level - 1) * 0.1
}

export function createHarmlessMalus(id: number, x: number, y: number, baseSpeed: number, sourceBonusId: number): GameObject {
  const halfSize = harmlessMalusVariant.hitboxSize / 2
  return {
    id,
    type: 'M',
    label: 'M7',
    x,
    y,
    width: 26,
    height: 26,
    hitbox: { shape: 'rect', offsetX: -halfSize, offsetY: -halfSize, width: harmlessMalusVariant.hitboxSize, height: harmlessMalusVariant.hitboxSize },
    rotation: 0,
    velocityX: 0,
    damage: false,
    sourceBonusId,
    playerTouching: false,
    baseSpeed,
    speedMultiplier: 1,
  }
}

export function keepInBounds(obj: GameObject, world: WorldState): void {
  const halfWidth = (obj.width ?? 0) / 2
  const minX = halfWidth + 8
  const maxX = world.width - halfWidth - 8
  if (obj.x < minX) {
    obj.x = minX
    obj.velocityX = Math.abs(obj.velocityX ?? 0)
  }
  if (obj.x > maxX) {
    obj.x = maxX
    obj.velocityX = -Math.abs(obj.velocityX ?? 0)
  }
}

export function updateHorizontalPath(obj: GameObject, lsm: number, dt: number, spawned: GameObject[], game: GameState): void {
  if (!obj.xPath || obj.xTargetIndex == null || obj.xSpeed == null) return

  const targetX = obj.xPath[obj.xTargetIndex] ?? obj.x
  const distance = targetX - obj.x
  const maxStep = obj.xSpeed * lsm * dt
  obj.xDirection = Math.sign(distance) || obj.xDirection || 1

  if (Math.abs(distance) <= maxStep) {
    obj.x = targetX
    const hb = getObjectHitbox(obj)
    if (hb.shape === 'rect') {
      const newObj = createHarmlessMalus(game.nextObjectId++, hb.left + hb.width / 2, hb.top + hb.height / 2, obj.baseSpeed, obj.id)
      spawned.push(newObj)
    }
    obj.xTargetIndex = (obj.xTargetIndex + 1) % obj.xPath.length
    obj.xDirection = Math.sign((obj.xPath[obj.xTargetIndex] ?? obj.x) - obj.x) || obj.xDirection
    return
  }

  obj.x += obj.xDirection * maxStep
}

export function spawnObject(game: GameState, world: WorldState): void {
  const type: 'B' | 'M' = Math.random() < 0.42 ? 'B' : 'M'
  const x = random(42, world.width - 42)
  const baseSpeed = random(160, 250)

  if (type === 'B') {
    const available = game.level >= 6 ? movingBonusVariants : []
    const moving = available[Math.floor(Math.random() * (available.length + 1))]
    if (moving) {
      const startX = moving.xPath[0] ?? world.width / 2
      const nextX = moving.xPath[1] ?? startX
      game.objects.push({
        id: game.nextObjectId++,
        type,
        label: moving.label,
        x: startX,
        y: -moving.height / 2,
        width: moving.width,
        height: moving.height,
        hitbox: { shape: 'rect', offsetX: -moving.width / 2, offsetY: -moving.height / 2, width: moving.width, height: moving.height },
        xPath: moving.xPath.slice(),
        xTargetIndex: 1,
        xSpeed: moving.xSpeed,
        xDirection: Math.sign(nextX - startX),
        moveTime: 0,
        m7CollisionCount: 0,
        velocityX: 0,
        baseSpeed,
        speedMultiplier: moving.speedMultiplier,
      })
      return
    }

    const bonus = bonusVariants[Math.floor(Math.random() * bonusVariants.length)]
    game.objects.push({
      id: game.nextObjectId++,
      type,
      label: bonus.label,
      x,
      y: -28,
      radius: bonus.radius,
      hitbox: { shape: 'circle', offsetX: 0, offsetY: 0, radius: bonus.radius },
      baseSpeed,
      speedMultiplier: 1,
    })
    return
  }

  const available = game.level >= 6 ? [...malusVariants, rushMalusVariant] : malusVariants
  const variant = available[Math.floor(Math.random() * available.length)]
  const delay = 'delayBeforeMove' in variant && typeof variant.delayBeforeMove === 'number' ? variant.delayBeforeMove : 0
  game.objects.push({
    id: game.nextObjectId++,
    type,
    label: variant.label,
    x,
    y: delay ? variant.height / 2 + 8 : -variant.height / 2,
    width: variant.width,
    height: variant.height,
    hitbox: { shape: 'rect', offsetX: -variant.width / 2, offsetY: -variant.height / 2, width: variant.width, height: variant.height },
    rotation: 0,
    velocityX: 0,
    moveDelay: delay,
    baseSpeed,
    speedMultiplier: variant.speedMultiplier,
  })
}

export function updateDifficulty(game: GameState, dt: number): boolean {
  game.elapsedTime += dt
  const nextLevel = clamp(Math.floor(game.elapsedTime / 10) + 1, 1, 10)
  if (nextLevel !== game.level) {
    game.level = nextLevel
    return true
  }
  return false
}

export function updatePlayer(player: PlayerState, input: InputState, dt: number, world: WorldState): void {
  const minX = player.width / 2 + 12
  const maxX = world.width - player.width / 2 - 12
  const prevX = player.x
  let direction = 0

  if (input.left) {
    player.targetX = player.x - player.speed * dt
    direction -= 1
  }

  if (input.right) {
    player.targetX = player.x + player.speed * dt
    direction += 1
  }

  player.targetX = clamp(player.targetX, minX, maxX)
  if (input.pointerActive && Math.abs(player.targetX - player.x) > 2) {
    direction = Math.sign(player.targetX - player.x)
  }

  player.x += (player.targetX - player.x) * Math.min(1, (input.pointerActive ? 16 : 12) * dt)
  player.x = clamp(player.x, minX, maxX)

  const actualDir = Math.abs(player.x - prevX) > 0.2 ? Math.sign(player.x - prevX) : 0
  player.direction = direction || actualDir

  if (player.direction) {
    player.lastDirection = player.direction
    player.walkTime += dt
  } else {
    player.walkTime = 0
  }
}

export function updatePlayerJump(player: PlayerState, game: GameState, dt: number): void {
  if (player.jumpTimer <= 0) return
  const wasJumping = player.jumpTimer > 0
  player.jumpTimer = Math.max(0, player.jumpTimer - dt)
  player.jumpElapsed += dt
  if (wasJumping && player.jumpTimer === 0) {
    game.doubleScoreTimer = 5
  }
}

export function updateScoreBoost(game: GameState, player: PlayerState, dt: number): void {
  if (game.doubleScoreTimer <= 0 || player.jumpTimer > 0) return
  game.doubleScoreTimer = Math.max(0, game.doubleScoreTimer - dt)
}

export function updateSpawner(game: GameState, world: WorldState, dt: number): void {
  if (game.objectFreezeTimer > 0) {
    return
  }
  game.spawnTimer -= dt
  if (game.spawnTimer <= 0) {
    spawnObject(game, world)
    game.spawnTimer = game.spawnEvery + random(-0.16, 0.22)
  }
}

export function updateObjects(game: GameState, world: WorldState, dt: number): void {
  if (game.objectFreezeTimer > 0) {
    game.objectFreezeTimer = Math.max(0, game.objectFreezeTimer - dt)
    return
  }

  const speedMultiplier = getLevelSpeedMultiplier(game.level)
  const spawned: GameObject[] = []

  for (const obj of game.objects) {
    let effectiveDt = dt
    if ((obj.moveDelay ?? 0) > 0) {
      const consumed = Math.min(obj.moveDelay ?? 0, dt)
      obj.moveDelay = (obj.moveDelay ?? 0) - consumed
      effectiveDt -= consumed
    }

    if (effectiveDt <= 0) continue
    obj.y += obj.baseSpeed * obj.speedMultiplier * speedMultiplier * effectiveDt
    if (obj.xPath) {
      updateHorizontalPath(obj, speedMultiplier, effectiveDt, spawned, game)
      obj.moveTime = (obj.moveTime ?? 0) + effectiveDt
    } else if (obj.velocityX) {
      obj.x += obj.velocityX * speedMultiplier * effectiveDt
      keepInBounds(obj, world)
    }
  }

  game.objects.push(...spawned)
  game.objects = game.objects.filter((object) => object.y < world.height + 120)
}

export function checkCollisions(game: GameState, player: PlayerState): { hudUpdated: boolean; ended: boolean } {
  const playerHitbox = getPlayerHitbox(player, getPlayerJumpFrame(player).offsetY)
  let hudUpdated = false

  for (const obj of game.objects) {
    if (obj.label !== 'M7') continue
    const objectHitbox = getObjectHitbox(obj)
    if (objectHitbox.shape === 'rect' && rectsOverlap(objectHitbox, playerHitbox)) {
      if (!obj.playerTouching) {
        obj.playerTouching = true
        const source = game.objects.find((candidate) => candidate.id === obj.sourceBonusId)
        if (source) {
          source.m7CollisionCount = (source.m7CollisionCount ?? 0) + 1
        }
      }
    } else {
      obj.playerTouching = false
    }
  }

  for (const obj of game.objects) {
    if (obj.hit || obj.label === 'M7') continue
    const objectHitbox = getObjectHitbox(obj)
    const hit = objectHitbox.shape === 'circle'
      ? circleRectCollision(objectHitbox, playerHitbox)
      : rectsOverlap(objectHitbox, playerHitbox)

    if (!hit) continue
    obj.hit = true
    hudUpdated = true

    if (obj.type === 'B') {
      game.score += game.doubleScoreTimer > 0 ? 20 : 10
      if (obj.xPath && obj.m7CollisionCount === 0) {
        game.objectFreezeTimer = Math.max(game.objectFreezeTimer, 1)
        player.jumpTimer = 1
        player.jumpElapsed = 0
      }
    } else if (obj.damage !== false) {
      game.lives -= 1
    }

    if (game.lives <= 0) {
      game.objects = game.objects.filter((object) => !object.hit)
      return { hudUpdated: true, ended: true }
    }
  }

  game.objects = game.objects.filter((object) => !object.hit)
  return { hudUpdated, ended: false }
}
