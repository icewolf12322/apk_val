import { useEffect, type RefObject, type DependencyList } from 'react'
import { Application } from 'pixi.js'

type SetupFn = (app: Application) => void | (() => void)

export function usePixiApp(
  containerRef: RefObject<HTMLElement | null>,
  setup: SetupFn,
  deps: DependencyList = [],
): void {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let mounted = true
    let app: Application | null = null
    let userCleanup: void | (() => void)

    ;(async () => {
      const w = container.clientWidth || 300
      const h = container.clientHeight || 200

      const instance = new Application()

      await instance.init({
        width: w,
        height: h,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio, 2),
        autoDensity: true,
        preference: 'webgl',
      })

      // init() finished — check if the effect was already torn down
      if (!mounted) {
        // Destroy safely: init completed so all plugins are wired up
        instance.destroy(true, { children: true, texture: true })
        return
      }

      app = instance

      const canvas = app.canvas
      canvas.style.position = 'absolute'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.pointerEvents = 'none'
      container.appendChild(canvas)

      userCleanup = setup(app)
    })()

    return () => {
      mounted = false
      if (typeof userCleanup === 'function') userCleanup()
      if (app) {
        // init() already resolved — safe to destroy
        app.destroy(true, { children: true, texture: true })
        app = null
      }
      // If app is still null, init() hasn't resolved yet.
      // The async block above will destroy it once init() finishes.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
