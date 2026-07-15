import type { GameState, Hitbox, PlayerState, WorldState } from './arcadeTypes'

const DEFAULT_PLAYER_WIDTH = 46
const DEFAULT_PLAYER_HEIGHT = 78
const DEFAULT_PLAYER_HITBOX: Extract<Hitbox, { shape: 'rect' }> = { shape: 'rect', offsetX: -30, offsetY: -80, width: 60, height: 88 }
const DEFAULT_PLAYER_SPEED = 1260

export function createWorldState(): WorldState {
  return { width: 480, height: 840, floor: 840 - 54 }
}

export function createPlayerState(world: WorldState): PlayerState {
  return {
    x: world.width / 2,
    y: world.floor,
    width: DEFAULT_PLAYER_WIDTH,
    height: DEFAULT_PLAYER_HEIGHT,
    hitbox: DEFAULT_PLAYER_HITBOX,
    speed: DEFAULT_PLAYER_SPEED,
    targetX: world.width / 2,
    direction: 0,
    lastDirection: 1,
    walkTime: 0,
    jumpTimer: 0,
    jumpElapsed: 0,
  }
}

export function resetPlayerState(player: PlayerState, world: WorldState): void {
  const initial = createPlayerState(world)
  player.x = initial.x
  player.y = initial.y
  player.width = initial.width
  player.height = initial.height
  player.hitbox = initial.hitbox
  player.speed = initial.speed
  player.targetX = initial.targetX
  player.direction = initial.direction
  player.lastDirection = initial.lastDirection
  player.walkTime = initial.walkTime
  player.jumpTimer = initial.jumpTimer
  player.jumpElapsed = initial.jumpElapsed
}

export function createGameState(): GameState {
  return {
    running: false,
    score: 0,
    lives: 3,
    objects: [],
    spawnTimer: 0,
    spawnEvery: 0.88,
    elapsedTime: 0,
    level: 1,
    nextObjectId: 1,
    objectFreezeTimer: 0,
    doubleScoreTimer: 0,
    scoreSaved: false,
    topScores: [],
  }
}

export function resetGameState(game: GameState): void {
  const initial = createGameState()
  game.running = initial.running
  game.score = initial.score
  game.lives = initial.lives
  game.objects = []
  game.spawnTimer = 0.45
  game.spawnEvery = initial.spawnEvery
  game.elapsedTime = initial.elapsedTime
  game.level = initial.level
  game.nextObjectId = initial.nextObjectId
  game.objectFreezeTimer = initial.objectFreezeTimer
  game.doubleScoreTimer = initial.doubleScoreTimer
  game.scoreSaved = initial.scoreSaved
  game.topScores = []
}
