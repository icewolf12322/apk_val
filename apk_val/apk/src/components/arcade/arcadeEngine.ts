import { type Container, type Graphics } from 'pixi.js'
import type { ArcadeUiElements, GameState, InputState, PlayerState, WorldState } from './arcadeTypes'
import { ScoreboardManager } from './arcadeStorage'
import {
  checkCollisions,
  updateDifficulty,
  updateObjects,
  updatePlayer,
  updatePlayerJump,
  updateScoreBoost,
  updateSpawner,
} from './arcadePhysics'
import { drawScene } from './arcadeRender'
import { createGameState, createPlayerState, createWorldState, resetGameState, resetPlayerState } from './arcadeState'
import { handleKeyDown, handleKeyUp, resetInputState, setPointerTarget } from './arcadeInput'
import { setStartButtonState, updateHud } from './arcadeUi'

export default class ArcadeEngine {
  public readonly world: WorldState
  public readonly player: PlayerState
  public readonly input: InputState
  public readonly game: GameState

  private readonly gfx: Graphics
  private readonly labelLayer: Container
  private readonly ui: ArcadeUiElements
  private readonly scoreboard: ScoreboardManager

  constructor(gfx: Graphics, labelLayer: Container, ui: ArcadeUiElements) {
    this.gfx = gfx
    this.labelLayer = labelLayer
    this.ui = ui
    this.scoreboard = new ScoreboardManager(this.ui)

    this.world = createWorldState()
    this.player = createPlayerState(this.world)
    this.input = { left: false, right: false, pointerActive: false }
    this.game = createGameState()
  }

  public initialize(): void {
    this.scoreboard.initialize(this.game)
    this.draw()
  }

  public resetGame(): void {
    this.game.running = true
    resetGameState(this.game)
    this.game.running = true

    resetPlayerState(this.player, this.world)
    this.player.targetX = this.player.x

    updateHud(this.ui, this.game)
    setStartButtonState(this.ui, false)
  }

  public update(dt: number): void {
    const levelChanged = updateDifficulty(this.game, dt)
    if (levelChanged) {
      this.updateHud()
    }

    updatePlayer(this.player, this.input, dt, this.world)
    updateScoreBoost(this.game, this.player, dt)
    updatePlayerJump(this.player, this.game, dt)
    updateSpawner(this.game, this.world, dt)
    updateObjects(this.game, this.world, dt)

    const collisionResult = checkCollisions(this.game, this.player)
    if (collisionResult.hudUpdated) {
      this.updateHud()
    }
    if (collisionResult.ended) {
      this.endGame()
      return
    }
  }

  public draw(): void {
    drawScene(this.gfx, this.labelLayer, this.world, this.player, this.game)
  }

  public handleKeyDown(key: string): void {
    const shouldReset = handleKeyDown(this.input, this.game, key)
    if (shouldReset) {
      this.resetGame()
    }
  }

  public handleKeyUp(key: string): void {
    handleKeyUp(this.input, this.player, key)
  }

  public setPointerTarget(clientX: number, _clientY: number, rect: DOMRect): void {
    setPointerTarget(this.player, clientX, rect, this.world.width)
  }

  public resetInputState(): void {
    resetInputState(this.input, this.player)
  }

  public setScoreMemory(enabled: boolean): void {
    this.scoreboard.setScoreMemory(enabled, this.game)
  }

  public updatePlayerName(): void {
    this.scoreboard.updatePlayerName()
  }

  public clearScores(): void {
    this.scoreboard.clearScores(this.game)
  }

  private updateHud(): void {
    updateHud(this.ui, this.game)
  }

  private endGame(): void {
    this.game.running = false
    if (!this.game.scoreSaved) {
      this.game.scoreSaved = true
      this.scoreboard.addScoreToBoard(this.game, this.game.score, this.game.level)
    }
    this.ui.startButton.textContent = 'Rejouer'
    this.ui.startButton.classList.remove('is-hidden')
    this.draw()
  }
}
