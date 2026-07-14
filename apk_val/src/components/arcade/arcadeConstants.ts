import type { Colors } from './arcadeTypes'

export const colors: Colors = {
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
}

export const malusVariants = [
  { label: 'M1', size: 'small', width: 82, height: 22, speedMultiplier: 1.05 },
  { label: 'M2', size: 'medium', width: 104, height: 28, speedMultiplier: 1 },
  { label: 'M3', size: 'large', width: 126, height: 34, speedMultiplier: 0.95 },
] as const

export const rushMalusVariant = {
  label: 'M4', size: 'rush', width: 34, height: 112, speedMultiplier: 3, delayBeforeMove: 0.5,
} as const

export const bonusVariants = [
  { label: 'B1', radius: 16 },
  { label: 'B2', radius: 19 },
  { label: 'B3', radius: 22 },
] as const

export const movingBonusVariants = [
  { label: 'B4', width: 46, height: 46, speedMultiplier: 0.6, xSpeed: 75, xPath: [86, 178, 126, 252, 164] },
  { label: 'B5', width: 46, height: 46, speedMultiplier: 0.6, xSpeed: 75, xPath: [394, 302, 352, 228, 320] },
  { label: 'B6', width: 46, height: 46, speedMultiplier: 0.6, xSpeed: 120, xPath: [240, 120, 360, 192, 420, 276] },
] as const

export const harmlessMalusVariant = {
  label: 'M7', size: 'harmless', width: 26, height: 26, hitboxSize: 8, speedMultiplier: 1,
} as const

export const difficulty = {
  levelDuration: 10,
  maxLevel: 10,
  speedStep: 0.1,
} as const
