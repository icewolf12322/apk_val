import { Container, Graphics } from 'pixi.js'

function createCloud(x: number, y: number, scale: number): Container {
  const c = new Container()
  c.x = x
  c.y = y
  c.scale.set(scale)
  const g = new Graphics()
  g.circle(0, 0, 18).fill({ color: 0xffffff, alpha: 0.9 })
  g.circle(20, -5, 22).fill({ color: 0xffffff, alpha: 0.9 })
  g.circle(44, 0, 16).fill({ color: 0xffffff, alpha: 0.9 })
  g.circle(22, 6, 16).fill({ color: 0xffffff, alpha: 0.85 })
  c.addChild(g)
  return c
}

function createTree(x: number, y: number, h: number): Container {
  const t = new Container()
  t.x = x
  t.y = y
  const g = new Graphics()
  const w = h * 0.55
  g.poly([0, 0, -w, h * 0.55, w, h * 0.55]).fill(0x4a7a2a)
  g.poly([0, h * 0.25, -(w * 0.85), h * 0.72, (w * 0.85), h * 0.72]).fill(0x5a8a35)
  g.poly([0, h * 0.45, -(w * 0.65), h, (w * 0.65), h]).fill(0x6a9a40)
  g.rect(-5, h, 10, h * 0.22).fill(0x6b4a2a)
  t.addChild(g)
  return t
}

export function createHotelBuilding(): { root: Container; smokeContainers: Container[] } {
  const root = new Container()

  // — Sky (light blue ground) —
  const sky = new Graphics()
  sky.rect(-200, -40, 500, 280).fill({ color: 0x87ceeb, alpha: 0.3 })
  root.addChild(sky)

  // — Waterfall (left) —
  const waterfall = new Graphics()
  waterfall.moveTo(-155, 20).lineTo(-148, 180)
  waterfall.stroke({ width: 12, color: 0x88ccee, alpha: 0.75, cap: 'round' })
  waterfall.moveTo(-148, 20).lineTo(-143, 185)
  waterfall.stroke({ width: 5, color: 0xffffff, alpha: 0.5, cap: 'round' })
  // Pool at base
  waterfall.ellipse(-148, 192, 22, 8).fill({ color: 0x88ccee, alpha: 0.7 })
  root.addChild(waterfall)

  // — Trees —
  root.addChild(createTree(-170, 80, 85))
  root.addChild(createTree(-130, 100, 65))
  root.addChild(createTree(185, 85, 80))
  root.addChild(createTree(210, 110, 60))

  // — Main building —
  const building = new Graphics()
  // Body
  building.roundRect(-105, 5, 210, 185, 6).fill(0xe8c840)
  // Right shading
  building.roundRect(90, 10, 15, 180, 3).fill({ color: 0xc8a820, alpha: 0.8 })
  root.addChild(building)

  // — Windows (eyes) —
  const windows = new Graphics()
  // Left window
  windows.rect(-80, 40, 45, 38).fill(0x1a3a6e)
  windows.rect(-80, 40, 45, 38).stroke({ width: 3, color: 0x8b6a1a })
  // Right window
  windows.rect(35, 40, 45, 38).fill(0x1a3a6e)
  windows.rect(35, 40, 45, 38).stroke({ width: 3, color: 0x8b6a1a })
  // Eye arches (eyebrows)
  windows.moveTo(-83, 40).quadraticCurveTo(-57, 22, -32, 40).stroke({ width: 4, color: 0x7a4a1a })
  windows.moveTo(32, 40).quadraticCurveTo(58, 22, 83, 40).stroke({ width: 4, color: 0x7a4a1a })
  // Window highlights
  windows.rect(-76, 44, 14, 16).fill({ color: 0x8888cc, alpha: 0.3 })
  windows.rect(39, 44, 14, 16).fill({ color: 0x8888cc, alpha: 0.3 })
  root.addChild(windows)

  // — Door / Mouth —
  const door = new Graphics()
  door.moveTo(-42, 120).lineTo(42, 120)
  door.arc(0, 120, 42, Math.PI, 0, true)
  door.closePath().fill(0x5c2a10)
  // Door panels
  door.roundRect(-38, 108, 35, 60, 4).fill(0x7a3a1a)
  door.roundRect(3, 108, 35, 60, 4).fill(0x7a3a1a)
  // Door knobs
  door.circle(-5, 140, 4).fill(0xffd700)
  door.circle(5, 140, 4).fill(0xffd700)
  root.addChild(door)

  // — Roof —
  const roof = new Graphics()
  roof.poly([-120, 8, 0, -55, 120, 8]).fill(0x7a1818)
  roof.poly([-110, 8, 0, -48, 110, 8]).fill(0x9b2525)
  // Roof ridge
  roof.moveTo(-120, 8).lineTo(120, 8).stroke({ width: 4, color: 0x5c1212 })
  root.addChild(roof)

  // — Roof window —
  const roofWin = new Graphics()
  roofWin.roundRect(-20, -44, 40, 30, 10).fill(0x1a3a6e)
  roofWin.roundRect(-20, -44, 40, 30, 10).stroke({ width: 2, color: 0x8b6a1a })
  roofWin.circle(-8, -32, 5).fill({ color: 0x8888cc, alpha: 0.3 })
  root.addChild(roofWin)

  // — Chimney —
  const chimney = new Graphics()
  chimney.roundRect(50, -45, 24, 50, 3).fill(0x5c3010)
  chimney.rect(46, -48, 32, 8).fill(0x4a2808)
  root.addChild(chimney)

  // — Smoke particles (animated later) —
  const smokeContainers: Container[] = []
  for (let i = 0; i < 5; i++) {
    const p = new Container()
    p.x = 62 + (Math.random() - 0.5) * 6
    p.y = -50 - i * 18
    const g = new Graphics()
    const r = 8 + Math.random() * 6
    g.circle(0, 0, r).fill({ color: 0xcccccc, alpha: 0.7 })
    p.addChild(g)
    p.alpha = 0.7 - i * 0.12
    p.scale.set(0.6 + i * 0.1)
    root.addChild(p)
    smokeContainers.push(p)
  }

  // — Ground / grass —
  const ground = new Graphics()
  ground.ellipse(0, 210, 180, 20).fill(0x5a8a35)
  root.addChild(ground)

  // — Clouds —
  const c1 = createCloud(-160, -60, 0.8)
  const c2 = createCloud(100, -75, 1.0)
  const c3 = createCloud(-50, -80, 0.65)
  root.addChild(c1, c2, c3)

  return { root, smokeContainers }
}
