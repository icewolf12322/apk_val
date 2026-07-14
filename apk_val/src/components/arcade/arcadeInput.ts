import type { GameState, InputState, PlayerState } from './arcadeTypes'

export function handleKeyDown(input: InputState, game: GameState, key: string): boolean {
  const normalized = key.toLowerCase()
  if (normalized === 'arrowleft' || normalized === 'q') {
    input.left = true
  }
  if (normalized === 'arrowright' || normalized === 'd') {
    input.right = true
  }
  return (key === ' ' || key === 'Enter') && !game.running
}

export function handleKeyUp(input: InputState, player: PlayerState, key: string): void {
  const normalized = key.toLowerCase()
  if (normalized === 'arrowleft' || normalized === 'q') {
    input.left = false
    player.targetX = player.x
  }
  if (normalized === 'arrowright' || normalized === 'd') {
    input.right = false
    player.targetX = player.x
  }
}

export function setPointerTarget(player: PlayerState, clientX: number, rect: DOMRect, worldWidth: number): void {
  player.targetX = (clientX - rect.left) * (worldWidth / rect.width)
}

export function resetInputState(input: InputState, player: PlayerState): void {
  input.left = false
  input.right = false
  input.pointerActive = false
  player.targetX = player.x
}
