import type { ArcadeUiElements, GameState } from './arcadeTypes'

export function updateHud(ui: ArcadeUiElements, game: GameState): void {
  ui.scoreEl.textContent = game.score.toString()
  ui.levelEl.textContent = game.level.toString()
  ui.livesEl.textContent = game.lives.toString()
}

export function setStartButtonState(ui: ArcadeUiElements, visible: boolean, label = 'Jouer'): void {
  ui.startButton.textContent = label
  if (visible) {
    ui.startButton.classList.remove('is-hidden')
  } else {
    ui.startButton.classList.add('is-hidden')
  }
}
