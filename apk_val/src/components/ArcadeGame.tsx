import { useEffect, useRef, useState } from 'react'
import { Application, Container, Graphics } from 'pixi.js'
import ArcadeEngine from './arcade/arcadeEngine'
import { GAME_CSS } from './arcade/arcadeCss'
import ArcadeConfigPanel from './arcade/ArcadeConfigPanel'
import { loadArcadeConfig, saveArcadeConfig, DEFAULT_ARCADE_CONFIG } from './arcade/arcadeConfig'
import type { ArcadeConfig } from './arcade/arcadeTypes'

interface Props {
  onBack: () => void
}

export default function ArcadeGame({ onBack }: Props) {
  const [config, setConfig] = useState<ArcadeConfig>(() => loadArcadeConfig())
  const pixiContainerRef = useRef<HTMLDivElement>(null)
  const scoreElRef = useRef<HTMLElement>(null)
  const livesElRef = useRef<HTMLElement>(null)
  const levelElRef = useRef<HTMLElement>(null)
  const startButtonRef = useRef<HTMLButtonElement>(null)
  const memoryToggleRef = useRef<HTMLInputElement>(null)
  const playerNameInputRef = useRef<HTMLInputElement>(null)
  const clearScoresButtonRef = useRef<HTMLButtonElement>(null)
  const scoreListRef = useRef<HTMLOListElement>(null)
  const engineRef = useRef<ArcadeEngine | null>(null)

  useEffect(() => {
    const pixiContainer = pixiContainerRef.current
    const scoreEl = scoreElRef.current
    const livesEl = livesElRef.current
    const levelEl = levelElRef.current
    const startButton = startButtonRef.current
    const memoryToggle = memoryToggleRef.current
    const playerNameInput = playerNameInputRef.current
    const clearScoresButton = clearScoresButtonRef.current
    const scoreList = scoreListRef.current

    if (
      !pixiContainer ||
      !scoreEl ||
      !livesEl ||
      !levelEl ||
      !startButton ||
      !memoryToggle ||
      !playerNameInput ||
      !clearScoresButton ||
      !scoreList
    ) {
      return
    }

    const pixiApp = new Application()
    const scene = new Container()
    const gfx = new Graphics()
    const labelLayer = new Container()
    const engine = new ArcadeEngine(gfx, labelLayer, {
      scoreEl,
      livesEl,
      levelEl,
      startButton,
      memoryToggle,
      playerNameInput,
      scoreList,
    })

    let mounted = true
    let initDone = false

    const resizeRenderer = () => {
      pixiApp.canvas.style.width = '100%'
      pixiApp.canvas.style.height = '100%'
    }

    const onKeyDown = (event: KeyboardEvent) => engine.handleKeyDown(event.key)
    const onKeyUp = (event: KeyboardEvent) => engine.handleKeyUp(event.key)
    const onPointerDown = (event: PointerEvent) => {
      event.preventDefault()
      engine.input.pointerActive = true
      pixiApp.canvas.setPointerCapture(event.pointerId)
      engine.setPointerTarget(event.clientX, event.clientY, pixiApp.canvas.getBoundingClientRect())
    }
    const onPointerMove = (event: PointerEvent) => {
      event.preventDefault()
      if (engine.input.pointerActive) {
        engine.setPointerTarget(event.clientX, event.clientY, pixiApp.canvas.getBoundingClientRect())
      }
    }
    const onPointerUp = (event: PointerEvent) => {
      event.preventDefault()
      engine.input.pointerActive = false
      pixiApp.canvas.releasePointerCapture(event.pointerId)
    }
    const onContextMenu = (event: Event) => event.preventDefault()
    const onMemory = () => engine.setScoreMemory(memoryToggle.checked)
    const onPlayerName = () => engine.updatePlayerName()
    const onClearScores = () => engine.clearScores()
    const onStart = () => engine.resetGame()

    ;(async () => {
      await pixiApp.init({
        width: 480,
        height: 840,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
      })

      if (!mounted) {
        pixiApp.destroy()
        return
      }

      initDone = true
      pixiApp.canvas.setAttribute('aria-label', "Jeu d'arcade PixiJS")
      pixiContainer.appendChild(pixiApp.canvas)
      pixiApp.stage.addChild(scene)
      scene.addChild(gfx, labelLayer)

      window.addEventListener('keydown', onKeyDown)
      window.addEventListener('keyup', onKeyUp)
      window.addEventListener('resize', resizeRenderer)
      window.addEventListener('orientationchange', resizeRenderer)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) engine.resetInputState()
      })
      pixiApp.canvas.addEventListener('pointerdown', onPointerDown)
      pixiApp.canvas.addEventListener('pointermove', onPointerMove)
      pixiApp.canvas.addEventListener('pointerup', onPointerUp)
      pixiApp.canvas.addEventListener('pointercancel', engine.resetInputState.bind(engine))
      pixiApp.canvas.addEventListener('contextmenu', onContextMenu)
      memoryToggle.addEventListener('change', onMemory)
      playerNameInput.addEventListener('change', onPlayerName)
      clearScoresButton.addEventListener('click', onClearScores)
      startButton.addEventListener('click', onStart)

      pixiApp.ticker.add((ticker) => {
        const dt = Math.min(ticker.deltaMS / 1000, 0.033)
        if (engine.game.running) {
          engine.update(dt)
        }
        engine.draw()
      })

      engine.initialize()
      resizeRenderer()
    })()

    return () => {
      mounted = false
      engine.game.running = false
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('resize', resizeRenderer)
      window.removeEventListener('orientationchange', resizeRenderer)
      memoryToggle.removeEventListener('change', onMemory)
      playerNameInput.removeEventListener('change', onPlayerName)
      clearScoresButton.removeEventListener('click', onClearScores)
      startButton.removeEventListener('click', onStart)
      if (initDone) {
        pixiApp.destroy(true, { children: true, texture: true })
      }
    }
  }, [onBack])

  return (
    <div className="arcade-root">
      <style>{GAME_CSS}</style>

      <div className="arcade-quit">
        <button onClick={onBack}>← Quitter</button>
      </div>

      <main className="arcade-shell">
        <section className="arcade-stage" aria-label="Zone de jeu">
          <div id="ag-pixi-container" ref={pixiContainerRef} />

          <div className="arcade-hud" aria-live="polite">
            <div>
              <span className="arcade-hud-label">Score</span>
              <strong id="ag-score" ref={scoreElRef}>0</strong>
            </div>
            <div>
              <span className="arcade-hud-label">Niveau</span>
              <strong id="ag-level" ref={levelElRef}>1</strong>
            </div>
            <div>
              <span className="arcade-hud-label">Vies</span>
              <strong id="ag-lives" ref={livesElRef}>3</strong>
            </div>
          </div>

          <button id="ag-startButton" ref={startButtonRef} className="arcade-start-btn" type="button">
            Jouer
          </button>
        </section>

        <aside className="arcade-score-panel" aria-label="Tableau des scores">
          <div className="arcade-score-panel-header">
            <h2>Scores</h2>
            <label className="arcade-memory-toggle">
              <input id="ag-memoryToggle" ref={memoryToggleRef} type="checkbox" />
              <span>Mémoire</span>
            </label>
          </div>

          <label className="arcade-player-name">
            <span>Pseudo</span>
            <input id="ag-playerNameInput" ref={playerNameInputRef} type="text" maxLength={12} autoComplete="nickname" spellCheck={false} defaultValue="Joueur" />
          </label>

          <ol id="ag-scoreList" ref={scoreListRef} className="arcade-score-list" />
          <button id="ag-clearScoresButton" ref={clearScoresButtonRef} className="arcade-clear-btn" type="button">
            Effacer
          </button>
        </aside>
      </main>
    </div>
  )
}
