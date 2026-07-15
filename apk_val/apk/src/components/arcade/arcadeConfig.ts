import type { ArcadeConfig } from './arcadeTypes'

const ARCADE_CONFIG_KEY = 'arcadePrototypeConfig'

function parseNumber(value: unknown, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function parseBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    if (value === 'true' || value === '1') return true
    if (value === 'false' || value === '0') return false
  }
  return fallback
}

function parseString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback
}

export const DEFAULT_ARCADE_CONFIG: ArcadeConfig = {
  startingLives: 3,
  spawnEvery: 0.88,
  spawnSpeedMin: 160,
  spawnSpeedMax: 250,
  playerSpeed: 1260,
  playerWidth: 46,
  playerHeight: 78,
  levelDuration: 10,
  maxLevel: 10,
  speedStep: 0.1,
  playerSpriteStyle: 'classic',
  bonusSpriteStyle: 'circle',
  malusSpriteStyle: 'rounded',
  showHitboxes: false,
  colors: {
    background: '#11151a',
    lane: '#f6f1e8',
    floor: '#68c1ba',
    player: '#68c1ba',
    playerShadow: '#2e6f73',
    bonus: '#f0c453',
    malus: '#e85d58',
    playerHitbox: '#68c1ba',
    objectHitbox: '#f0c453',
    textDark: '#15110a',
    malusText: '#2b1110',
    textLight: '#f6f1e8',
  },
}

export function loadArcadeConfig(): ArcadeConfig {
  try {
    const raw = JSON.parse(localStorage.getItem(ARCADE_CONFIG_KEY) || 'null')
    if (!raw || typeof raw !== 'object') return DEFAULT_ARCADE_CONFIG

    return {
      startingLives: parseNumber(raw.startingLives, DEFAULT_ARCADE_CONFIG.startingLives),
      spawnEvery: parseNumber(raw.spawnEvery, DEFAULT_ARCADE_CONFIG.spawnEvery),
      spawnSpeedMin: parseNumber(raw.spawnSpeedMin, DEFAULT_ARCADE_CONFIG.spawnSpeedMin),
      spawnSpeedMax: parseNumber(raw.spawnSpeedMax, DEFAULT_ARCADE_CONFIG.spawnSpeedMax),
      playerSpeed: parseNumber(raw.playerSpeed, DEFAULT_ARCADE_CONFIG.playerSpeed),
      playerWidth: parseNumber(raw.playerWidth, DEFAULT_ARCADE_CONFIG.playerWidth),
      playerHeight: parseNumber(raw.playerHeight, DEFAULT_ARCADE_CONFIG.playerHeight),
      levelDuration: parseNumber(raw.levelDuration, DEFAULT_ARCADE_CONFIG.levelDuration),
      maxLevel: parseNumber(raw.maxLevel, DEFAULT_ARCADE_CONFIG.maxLevel),
      speedStep: parseNumber(raw.speedStep, DEFAULT_ARCADE_CONFIG.speedStep),
      playerSpriteStyle: parseString(raw.playerSpriteStyle, DEFAULT_ARCADE_CONFIG.playerSpriteStyle) as ArcadeConfig['playerSpriteStyle'],
      bonusSpriteStyle: parseString(raw.bonusSpriteStyle, DEFAULT_ARCADE_CONFIG.bonusSpriteStyle) as ArcadeConfig['bonusSpriteStyle'],
      malusSpriteStyle: parseString(raw.malusSpriteStyle, DEFAULT_ARCADE_CONFIG.malusSpriteStyle) as ArcadeConfig['malusSpriteStyle'],
      showHitboxes: parseBoolean(raw.showHitboxes, DEFAULT_ARCADE_CONFIG.showHitboxes),
      colors: {
        background: parseString(raw.colors?.background, DEFAULT_ARCADE_CONFIG.colors.background),
        lane: parseString(raw.colors?.lane, DEFAULT_ARCADE_CONFIG.colors.lane),
        floor: parseString(raw.colors?.floor, DEFAULT_ARCADE_CONFIG.colors.floor),
        player: parseString(raw.colors?.player, DEFAULT_ARCADE_CONFIG.colors.player),
        playerShadow: parseString(raw.colors?.playerShadow, DEFAULT_ARCADE_CONFIG.colors.playerShadow),
        bonus: parseString(raw.colors?.bonus, DEFAULT_ARCADE_CONFIG.colors.bonus),
        malus: parseString(raw.colors?.malus, DEFAULT_ARCADE_CONFIG.colors.malus),
        playerHitbox: parseString(raw.colors?.playerHitbox, DEFAULT_ARCADE_CONFIG.colors.playerHitbox),
        objectHitbox: parseString(raw.colors?.objectHitbox, DEFAULT_ARCADE_CONFIG.colors.objectHitbox),
        textDark: parseString(raw.colors?.textDark, DEFAULT_ARCADE_CONFIG.colors.textDark),
        malusText: parseString(raw.colors?.malusText, DEFAULT_ARCADE_CONFIG.colors.malusText),
        textLight: parseString(raw.colors?.textLight, DEFAULT_ARCADE_CONFIG.colors.textLight),
      },
    }
  } catch {
    return DEFAULT_ARCADE_CONFIG
  }
}

export function saveArcadeConfig(config: ArcadeConfig): void {
  try {
    localStorage.setItem(ARCADE_CONFIG_KEY, JSON.stringify(config))
  } catch {
    // ignore storage failures
  }
}

export function hexColorToNumber(color: string): number {
  const normalized = color.trim().replace(/^#/, '')
  const parsed = Number.parseInt(normalized, 16)
  return Number.isFinite(parsed) ? parsed : 0
}
