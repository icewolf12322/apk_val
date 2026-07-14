import { useRef } from 'react'
import { AnimatedSprite, Assets, Container, Graphics, type Texture, type Ticker } from 'pixi.js'
import { usePixiApp } from './usePixiApp'
import { createHotelBuilding } from './characters/hotelBuilding'
import { createWolfGroomTextures, wolfGroomSpriteSheet } from '../spriteWolf/wolfFrames'

export default function MainMenuScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  usePixiApp(containerRef, (app) => {
    const W = app.screen.width
    const H = app.screen.height

    // — Stars —
    const starLayer = new Container()
    const stars: { g: Graphics; base: number; phase: number }[] = []
    for (let i = 0; i < 18; i++) {
      const g = new Graphics()
      const r = 2 + Math.random() * 3.5
      g.star(0, 0, 5, r, r * 0.45).fill(0xffd700)
      g.x = 10 + Math.random() * (W - 20)
      g.y = 5 + Math.random() * (H * 0.35)
      const base = 0.4 + Math.random() * 0.6
      g.alpha = base
      starLayer.addChild(g)
      stars.push({ g, base, phase: Math.random() * Math.PI * 2 })
    }
    app.stage.addChild(starLayer)

    // — Hotel building —
    const { root: buildingRoot, smokeContainers } = createHotelBuilding()
    buildingRoot.x = W * 0.40
    buildingRoot.y = H * 0.54
    const buildingScale = Math.min(W / 520, H / 340) * 0.82
    buildingRoot.scale.set(buildingScale)
    app.stage.addChild(buildingRoot)

    // — Decorative sparkles —
    const sparkleLayer = new Container()
    const sparkles: { c: Container; speed: number; phase: number }[] = []
    for (const pos of [
      { x: W * 0.07, y: H * 0.07 }, { x: W * 0.93, y: H * 0.06 },
      { x: W * 0.04, y: H * 0.22 }, { x: W * 0.95, y: H * 0.20 },
      { x: W * 0.14, y: H * 0.30 }, { x: W * 0.86, y: H * 0.28 },
    ]) {
      const c = new Container(); c.x = pos.x; c.y = pos.y
      const g = new Graphics()
      const r = 5 + Math.random() * 5
      g.star(0, 0, 4, r, r * 0.35).fill(0xffd700)
      c.addChild(g); sparkleLayer.addChild(c)
      sparkles.push({ c, speed: 0.8 + Math.random() * 0.6, phase: Math.random() * Math.PI * 2 })
    }
    app.stage.addChild(sparkleLayer)

    // — Corner diamonds —
    const corners = new Graphics()
    const cr = 8
    corners.star(cr, cr, 4, cr * 0.9, cr * 0.4).fill(0xffd700)
    corners.star(W - cr, cr, 4, cr * 0.9, cr * 0.4).fill(0xffd700)
    corners.star(cr, H - cr, 4, cr * 0.9, cr * 0.4).fill(0xffd700)
    corners.star(W - cr, H - cr, 4, cr * 0.9, cr * 0.4).fill(0xffd700)
    app.stage.addChild(corners)

    // — Wolf sprite —
    let wolf: AnimatedSprite | null = null
    let wolfBaseY = 0
    let cancelled = false

    const smokeBaseY = smokeContainers.map(p => p.y)
    let t = 0

    const tick = (ticker: Ticker) => {
      t += ticker.deltaTime

      // Stars twinkle
      for (const { g, base, phase } of stars) {
        g.alpha = base * (0.5 + 0.5 * Math.sin(t * 0.06 + phase))
      }
      // Sparkles spin
      for (const { c, speed, phase } of sparkles) {
        c.rotation += 0.015 * speed * ticker.deltaTime
        c.scale.set(0.8 + 0.3 * Math.sin(t * 0.07 + phase))
      }
      // Smoke rises
      smokeContainers.forEach((p, i) => {
        p.y -= 0.35 * ticker.deltaTime
        p.alpha -= 0.003 * ticker.deltaTime
        p.scale.set(p.scale.x + 0.004 * ticker.deltaTime)
        if (p.alpha <= 0) { p.y = smokeBaseY[i]; p.alpha = 0.55; p.scale.set(0.6) }
      })
      // Wolf bob (once loaded)
      if (wolf) {
        wolf.y = wolfBaseY + Math.sin(t * 0.045) * 5
      }
    }

    app.ticker.add(tick)

    // Load wolf sprite asynchronously and add to stage
    Assets.load<Texture>(wolfGroomSpriteSheet).then((spriteSheet) => {
      if (cancelled || !app.stage) return

      const textures = createWolfGroomTextures(spriteSheet, 'iso_idle_down')
      wolf = new AnimatedSprite(textures)

      // Position: right side, anchored bottom-centre
      wolf.anchor.set(0.5, 1)

      const desiredH = H * 0.60
      const scale = desiredH / wolf.texture.height
      wolf.scale.set(scale)

      wolf.x = W * 0.80
      wolfBaseY = H * 0.96
      wolf.y = wolfBaseY

      wolf.animationSpeed = 12 / 60   // ~12 fps — smooth idle
      wolf.loop = true
      wolf.play()

      app.stage.addChild(wolf)
    })

    return () => {
      cancelled = true
      app.ticker.remove(tick)
      wolf?.destroy()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'rgb(255, 255, 255)', borderWidth: '1px' }}
    />
  )
}
