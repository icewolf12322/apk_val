import { Container, Graphics } from 'pixi.js'

export function createMonkeyGroom(): Container {
  const monkey = new Container()

  // — Shoes —
  const shoes = new Graphics()
  shoes.roundRect(-15, 65, 12, 20, 5).fill(0x222222)
  shoes.roundRect(3, 65, 12, 20, 5).fill(0x222222)
  shoes.ellipse(-9, 85, 9, 5).fill(0x111111)
  shoes.ellipse(9, 85, 9, 5).fill(0x111111)
  monkey.addChild(shoes)

  // — Body —
  const body = new Graphics()
  body.roundRect(-26, 14, 52, 55, 10).fill(0x8b4a1a)
  body.rect(-26, 57, 52, 10).fill(0xc8900a)
  body.poly([-10, 18, 0, 32, 10, 18]).fill(0xf5e4b4)
  body.circle(0, 36, 3.5).fill(0xffd700)
  body.circle(0, 49, 3.5).fill(0xffd700)
  monkey.addChild(body)

  // — Left arm (down) —
  const leftArm = new Graphics()
  leftArm.roundRect(-43, 16, 18, 36, 9).fill(0x8b4a1a)
  monkey.addChild(leftArm)

  // — Left paw —
  const leftPaw = new Graphics()
  leftPaw.ellipse(-34, 54, 10, 7).fill(0xc07840)
  monkey.addChild(leftPaw)

  // — Right arm (raised, pointing) —
  const rightArm = new Container()
  rightArm.x = 27
  rightArm.y = 14
  rightArm.rotation = -0.6
  const rightArmG = new Graphics()
  rightArmG.roundRect(0, 0, 17, 34, 8).fill(0x8b4a1a)
  rightArm.addChild(rightArmG)
  monkey.addChild(rightArm)

  // — Pointing finger —
  const finger = new Container()
  finger.x = 42
  finger.y = -2
  finger.rotation = -0.9
  const fingerG = new Graphics()
  fingerG.roundRect(0, 0, 8, 20, 4).fill(0xc07840)
  finger.addChild(fingerG)
  monkey.addChild(finger)

  // — Big round ears —
  const ears = new Graphics()
  ears.circle(-26, -20, 14).fill(0x8b4a1a)
  ears.circle(26, -20, 14).fill(0x8b4a1a)
  ears.circle(-26, -20, 9).fill(0xc07840)
  ears.circle(26, -20, 9).fill(0xc07840)
  monkey.addChild(ears)

  // — Head —
  const head = new Graphics()
  head.ellipse(0, -22, 27, 26).fill(0x8b4a1a)
  // Snout
  head.ellipse(0, -10, 18, 14).fill(0xc07840)
  // Nose
  head.ellipse(0, -16, 5.5, 4.5).fill(0x5a2a0a)
  head.ellipse(-1.5, -17, 2, 1.5).fill(0x7a3a1a)
  monkey.addChild(head)

  // — Big grin —
  const grin = new Graphics()
  grin.arc(0, -10, 10, 0.2, Math.PI - 0.2).fill(0x9b2a2a)
  grin.moveTo(-10, -10).quadraticCurveTo(0, -3, 10, -10).fill(0xe08080)
  // Teeth
  grin.rect(-8, -12, 6, 6).fill(0xffffff)
  grin.rect(2, -12, 6, 6).fill(0xffffff)
  monkey.addChild(grin)

  // — Eyes (happy squint) —
  const eyes = new Graphics()
  // Left eye squint arc
  eyes.moveTo(-16, -28).quadraticCurveTo(-10, -34, -4, -28).stroke({ width: 3, color: 0x3a1a0a, cap: 'round' })
  eyes.circle(-10, -28, 3).fill(0x3a1a0a)
  // Right eye squint arc
  eyes.moveTo(4, -28).quadraticCurveTo(10, -34, 16, -28).stroke({ width: 3, color: 0x3a1a0a, cap: 'round' })
  eyes.circle(10, -28, 3).fill(0x3a1a0a)
  // Eye shine
  eyes.circle(-9, -29, 1.2).fill(0xffffff)
  eyes.circle(11, -29, 1.2).fill(0xffffff)
  monkey.addChild(eyes)

  // — Cap —
  const cap = new Graphics()
  cap.ellipse(0, -46, 24, 7).fill(0x7a1818)
  cap.roundRect(-21, -60, 42, 16, 5).fill(0x7a1818)
  cap.rect(-27, -48, 54, 5).fill(0xc8900a)
  cap.circle(0, -62, 3.5).fill(0xffd700)
  monkey.addChild(cap)

  // — Excitement stars —
  const stars = new Graphics()
  stars.star(52, -50, 5, 8, 4).fill(0xffd700)
  stars.star(-48, -42, 5, 6, 3).fill(0xffd700)
  stars.star(44, -18, 5, 5, 2.5).fill(0xc8900a)
  monkey.addChild(stars)

  return monkey
}
