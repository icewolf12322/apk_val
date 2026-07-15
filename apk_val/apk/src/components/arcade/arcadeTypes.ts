export const LOGICAL_WIDTH = 480
export const LOGICAL_HEIGHT = 840
export const SCORE_STORAGE_KEY = 'arcadePrototypeTopScores'
export const SCORE_MEMORY_KEY = 'arcadePrototypeScoreMemory'
export const PLAYER_NAME_KEY = 'arcadePrototypePlayerName'
export const DEFAULT_PLAYER_NAME = 'Joueur'

export type Hitbox =
  | { shape: 'rect'; offsetX: number; offsetY: number; width: number; height: number }
  | { shape: 'circle'; offsetX: number; offsetY: number; radius: number }

export type RectHitbox = {
  shape: 'rect'
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

export type CircleHitbox = {
  shape: 'circle'
  x: number
  y: number
  radius: number
}

export type GameObject = {
  id: number
  type: 'B' | 'M'
  label: string
  x: number
  y: number
  width?: number
  height?: number
  radius?: number
  hitbox: Hitbox
  baseSpeed: number
  speedMultiplier: number
  velocityX?: number
  rotation?: number
  moveDelay?: number
  hit?: boolean
  damage?: boolean
  sourceBonusId?: number
  playerTouching?: boolean
  xPath?: number[]
  xTargetIndex?: number
  xSpeed?: number
  xDirection?: number
  moveTime?: number
  m7CollisionCount?: number
}

export type ScoreEntry = {
  name: string
  score: number
  level: number
  date: string
}

export type WorldState = {
  width: number
  height: number
  floor: number
}

export type PlayerState = {
  x: number
  y: number
  width: number
  height: number
  hitbox: Extract<Hitbox, { shape: 'rect' }>
  speed: number
  targetX: number
  direction: number
  lastDirection: number
  walkTime: number
  jumpTimer: number
  jumpElapsed: number
}

export type InputState = {
  left: boolean
  right: boolean
  pointerActive: boolean
}

export type GameState = {
  running: boolean
  score: number
  lives: number
  objects: GameObject[]
  spawnTimer: number
  spawnEvery: number
  elapsedTime: number
  level: number
  nextObjectId: number
  objectFreezeTimer: number
  doubleScoreTimer: number
  scoreSaved: boolean
  topScores: ScoreEntry[]
}

export type ArcadeUiElements = {
  scoreEl: HTMLElement
  livesEl: HTMLElement
  levelEl: HTMLElement
  startButton: HTMLButtonElement
  memoryToggle: HTMLInputElement
  playerNameInput: HTMLInputElement
  scoreList: HTMLOListElement
}

export type ArcadeConfig = {
  startingLives: number
  spawnEvery: number
  spawnSpeedMin: number
  spawnSpeedMax: number
  playerSpeed: number
  playerWidth: number
  playerHeight: number
  levelDuration: number
  maxLevel: number
  speedStep: number
  playerSpriteStyle: 'classic' | 'rounded' | 'pixel'
  bonusSpriteStyle: 'circle' | 'square' | 'bubble'
  malusSpriteStyle: 'rounded' | 'block' | 'rush'
  showHitboxes: boolean
  colors: {
    background: string
    lane: string
    floor: string
    player: string
    playerShadow: string
    bonus: string
    malus: string
    playerHitbox: string
    objectHitbox: string
    textDark: string
    malusText: string
    textLight: string
  }
}

export type Colors = {
  background: number
  lane: number
  floor: number
  player: number
  playerShadow: number
  bonus: number
  malus: number
  playerHitbox: number
  objectHitbox: number
  textDark: number
  malusText: number
  textLight: number
}
