import { Container, Graphics } from 'pixi.js'

export function createWolfGroom(): Container {
  const wolf = new Container()

  // — Shoes —
  const shoes = new Graphics()
  shoes.roundRect(-16, 70, 13, 22, 6).fill(0x222222)
  shoes.roundRect(3, 70, 13, 22, 6).fill(0x222222)
  shoes.ellipse(-9, 92, 10, 5).fill(0x111111)
  shoes.ellipse(9, 92, 10, 5).fill(0x111111)
  wolf.addChild(shoes)

  // — Body / uniform —
  const body = new Graphics()
  body.roundRect(-28, 16, 56, 58, 10).fill(0x7a1818)
  // Gold belt
  body.rect(-28, 62, 56, 10).fill(0xc8900a)
  // White collar/shirt V-neck
  body.poly([-10, 20, 0, 34, 10, 20]).fill(0xf5e4b4)
  // Gold buttons
  body.circle(0, 40, 3.5).fill(0xffd700)
  body.circle(0, 54, 3.5).fill(0xffd700)
  wolf.addChild(body)

  // — Arms —
  const arms = new Graphics()
  arms.roundRect(-46, 18, 19, 40, 9).fill(0x7a1818)
  arms.roundRect(27, 18, 19, 40, 9).fill(0x7a1818)
  wolf.addChild(arms)

  // — Paws —
  const paws = new Graphics()
  paws.ellipse(-37, 60, 11, 8).fill(0xb0b0b0)
  paws.ellipse(37, 55, 11, 8).fill(0xb0b0b0)
  wolf.addChild(paws)

  // — Key (right hand) —
  const key = new Graphics()
  key.circle(46, 48, 7).fill(0xffd700).stroke({ width: 2, color: 0xc8900a })
  key.circle(46, 48, 3).fill(0xc8900a)
  key.rect(43, 55, 5, 14).fill(0xffd700)
  key.rect(44, 62, 7, 2.5).fill(0xffd700)
  key.rect(44, 66, 7, 2.5).fill(0xffd700)
  wolf.addChild(key)

  // — Ears (behind head) —
  const ears = new Graphics()
  ears.poly([-24, -36, -19, -64, -4, -40]).fill(0xb0b0b0)
  ears.poly([24, -36, 19, -64, 4, -40]).fill(0xb0b0b0)
  ears.poly([-22, -38, -18, -58, -7, -41]).fill(0xd88888)
  ears.poly([22, -38, 18, -58, 7, -41]).fill(0xd88888)
  wolf.addChild(ears)

  // — Head —
  const head = new Graphics()
  head.ellipse(0, -20, 27, 29).fill(0xb8b8b8)
  // Cheek/snout
  head.ellipse(0, -8, 17, 13).fill(0xd0d0d0)
  // Nose
  head.ellipse(0, -13, 6, 5).fill(0x2a2a2a)
  head.ellipse(-1.5, -14.5, 2, 1.5).fill(0x444444)
  wolf.addChild(head)

  // — Smile —
  const mouth = new Graphics()
  mouth.moveTo(-7, -2).quadraticCurveTo(0, 6, 7, -2).stroke({ width: 2, color: 0x555555, cap: 'round' })
  wolf.addChild(mouth)

  // — Eyes —
  const eyes = new Graphics()
  eyes.circle(-11, -24, 6).fill(0xffffff)
  eyes.circle(11, -24, 6).fill(0xffffff)
  eyes.circle(-10, -23, 3.5).fill(0x2a2a2a)
  eyes.circle(12, -23, 3.5).fill(0x2a2a2a)
  eyes.circle(-9, -24, 1.2).fill(0xffffff)
  eyes.circle(13, -24, 1.2).fill(0xffffff)
  wolf.addChild(eyes)

  // — Eyebrows —
  const brows = new Graphics()
  brows.moveTo(-17, -32).quadraticCurveTo(-11, -37, -4, -32).stroke({ width: 2.5, color: 0x666666, cap: 'round' })
  brows.moveTo(4, -32).quadraticCurveTo(11, -37, 17, -32).stroke({ width: 2.5, color: 0x666666, cap: 'round' })
  wolf.addChild(brows)

  // — Cap —
  const cap = new Graphics()
  cap.ellipse(0, -47, 25, 7).fill(0x7a1818)
  cap.roundRect(-22, -62, 44, 17, 6).fill(0x7a1818)
  cap.rect(-28, -49, 56, 5).fill(0xc8900a)
  cap.circle(0, -63, 3.5).fill(0xffd700)
  wolf.addChild(cap)

  return wolf
}
