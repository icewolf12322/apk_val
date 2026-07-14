import { useRef, type CSSProperties } from 'react'
import { AnimatedSprite, Assets, type Texture } from 'pixi.js'
import { usePixiApp } from './usePixiApp'
import {
  createWolfGroomTextures,
  type WolfGroomAnimation,
  wolfGroomSpriteSheet,
} from '../spriteWolf/wolfFrames'

interface Props {
  width?: number
  height?: number
  animation?: WolfGroomAnimation
  animationSpeed?: number
  style?: CSSProperties
}

export default function WolfGroomCanvas({
  width = 130,
  height = 180,
  animation = 'iso_idle_southeast',
  animationSpeed = 15 / 60,
  style,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  usePixiApp(containerRef, (app) => {
    let cancelled = false
    let wolf: AnimatedSprite | null = null

    Assets.load<Texture>(wolfGroomSpriteSheet).then((spriteSheet) => {
      if (cancelled || !app.stage) return

      const textures = createWolfGroomTextures(spriteSheet, animation)
      wolf = new AnimatedSprite(textures)
      wolf.anchor.set(0.5, 1)
      wolf.x = app.screen.width / 2
      wolf.y = app.screen.height

      const naturalW = wolf.texture.width
      const naturalH = wolf.texture.height
      const scale = Math.min(
        (app.screen.width * 0.98) / naturalW,
        (app.screen.height * 0.98) / naturalH,
      )
      wolf.scale.set(scale)

      wolf.animationSpeed = animationSpeed
      wolf.loop = true
      wolf.play()

      app.stage.addChild(wolf)
    })

    return () => {
      cancelled = true
      wolf?.destroy()
    }
  }, [animation, animationSpeed])

  const sized = width !== undefined && height !== undefined

  return (
    <div
      ref={containerRef}
      style={
        sized
          ? { position: 'relative', width, height, display: 'inline-block', ...style }
          : { position: 'absolute', inset: 0, ...style }
      }
    />
  )
}
