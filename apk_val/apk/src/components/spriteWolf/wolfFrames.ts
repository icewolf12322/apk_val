import { Rectangle, Texture } from "pixi.js"
import wolfGroomSpriteSheetUrl from "../../imports/WolfGroom-spriteSheet.png"

export const wolfGroomSpriteSheet = wolfGroomSpriteSheetUrl

export const WOLF_GROOM_FRAME_SIZE = 256
export const WOLF_GROOM_FRAMES_PER_ROW = 25
export const WOLF_GROOM_FIRST_ANIMATION_ROW = 5

export const wolfGroomAnimationRows = {
  sleep_up: 0,
  sleep_right: 1,
  iso_walk_up: 2,
  iso_walk_southeast: 3,
  iso_walk_right: 4,
  iso_walk_down: 5,
  iso_walk_northeast: 6,
  iso_run_up: 7,
  iso_run_southeast: 8,
  iso_run_down: 9,
  iso_run_right: 10,
  iso_run_northeast: 11,
  iso_idle_right: 12,
  iso_idle_southeast: 13,
  sleep_southeast: 14,
  iso_idle_northeast: 15,
  sleep_northeast: 16,
  sleep_down: 17,
  iso_idle_down: 18,
  iso_idle_up: 19,
} as const

export type WolfGroomAnimation = keyof typeof wolfGroomAnimationRows

export function createWolfGroomTextures(
  spriteSheet: Texture,
  animation: WolfGroomAnimation,
) {
  const row = WOLF_GROOM_FIRST_ANIMATION_ROW + wolfGroomAnimationRows[animation]

  return Array.from({ length: WOLF_GROOM_FRAMES_PER_ROW }, (_, frameIndex) => (
    new Texture({
      source: spriteSheet.source,
      frame: new Rectangle(
        frameIndex * WOLF_GROOM_FRAME_SIZE,
        row * WOLF_GROOM_FRAME_SIZE,
        WOLF_GROOM_FRAME_SIZE,
        WOLF_GROOM_FRAME_SIZE,
      ),
    })
  ))
}
