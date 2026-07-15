import { useRef } from 'react'
import { type Ticker } from 'pixi.js'
import { usePixiApp } from './usePixiApp'
import { createMonkeyGroom } from './characters/monkey'

interface Props {
  width?: number
  height?: number
}

export default function MonkeyGroomCanvas({ width = 90, height = 140 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  usePixiApp(containerRef, (app) => {
    const monkey = createMonkeyGroom()
    const W = app.screen.width
    const H = app.screen.height

    const scale = Math.min(W / 120, H / 190) * 0.88
    monkey.scale.set(scale)
    monkey.x = W * 0.5
    monkey.y = H * 0.73

    app.stage.addChild(monkey)

    let t = 0
    const baseY = monkey.y

    const tick = (ticker: Ticker) => {
      t += ticker.deltaTime
      // Excited wiggle
      monkey.y = baseY + Math.sin(t * 0.08) * 4
      monkey.rotation = Math.sin(t * 0.12) * 0.04
    }

    app.ticker.add(tick)
    return () => app.ticker.remove(tick)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width, height, display: 'inline-block' }}
    />
  )
}
