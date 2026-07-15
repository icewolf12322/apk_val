import { Container, Graphics, Text } from 'pixi.js'
import type { GameObject, GameState, PlayerState, RectHitbox, WorldState } from './arcadeTypes'
import { colors } from './arcadeConstants'
import { getObjectHitbox, getPlayerHitbox, getPlayerJumpFrame, pixel } from './arcadePhysics'

export function drawScene(gfx: Graphics, labelLayer: Container, world: WorldState, player: PlayerState, game: GameState): void {
  gfx.clear()
  labelLayer.removeChildren().forEach((child) => child.destroy())
  drawBackground(gfx, world)
  drawObjects(gfx, labelLayer, game)
  drawPlayer(gfx, player)
  drawHitboxes(gfx, player, game)
  if (!game.running && game.scoreSaved) {
    drawEndOverlay(gfx, labelLayer, world, game)
  }
}

function drawBackground(gfx: Graphics, world: WorldState): void {
  gfx.rect(0, 0, world.width, world.height).fill(colors.background)
  for (let x = 80; x < world.width; x += 80) {
    gfx.moveTo(x, 0).lineTo(x, world.height).stroke({ color: colors.lane, alpha: 0.06, width: 2 })
  }
  gfx.rect(0, world.floor + 10, world.width, world.height - world.floor).fill({ color: colors.floor, alpha: 0.11 })
}

function drawObjects(gfx: Graphics, labelLayer: Container, game: GameState): void {
  for (const obj of game.objects) {
    if (obj.type === 'B') {
      drawBonus(gfx, labelLayer, obj)
    } else {
      drawMalus(gfx, labelLayer, obj)
    }
  }
}

function drawBonus(gfx: Graphics, labelLayer: Container, obj: GameObject): void {
  if (obj.hitbox.shape === 'rect') {
    drawSquareBonus(gfx, labelLayer, obj)
    return
  }

  const radius = obj.radius ?? 18
  gfx.circle(obj.x, obj.y, radius * 1.8).fill({ color: colors.bonus, alpha: 0.16 })
  gfx.circle(obj.x, obj.y, radius).fill(colors.bonus)
  addLabel(labelLayer, obj.label, obj.x, obj.y + 1, 18, colors.textDark)
}

function drawSquareBonus(gfx: Graphics, labelLayer: Container, obj: GameObject): void {
  if (obj.xPath) {
    drawMovingSquareBonus(gfx, labelLayer, obj)
    return
  }

  const width = obj.width ?? 46
  const height = obj.height ?? 46
  gfx.roundRect(obj.x - width / 2 - 6, obj.y - height / 2 - 6, width + 12, height + 12, 8).fill({ color: colors.bonus, alpha: 0.22 })
  gfx.roundRect(obj.x - width / 2, obj.y - height / 2, width, height, 7).fill(colors.bonus)
  addLabel(labelLayer, obj.label, obj.x, obj.y + 1, 17, colors.textDark)
}

function drawMovingSquareBonus(gfx: Graphics, labelLayer: Container, obj: GameObject): void {
  const width = obj.width ?? 46
  const height = obj.height ?? 46
  const direction = obj.xDirection || 1
  const pulse = Math.sin((obj.moveTime ?? 0) * 16) * 2
  const lean = direction * 0.12

  gfx.save()
  gfx.translateTransform(obj.x, obj.y)
  gfx.rotateTransform(lean)
  gfx.roundRect(-width / 2 - direction * 10, -height / 2 - 4, width + 10, height + 8, 8).fill({ color: colors.bonus, alpha: 0.18 })
  gfx.poly([direction * (width / 2 + 8), -9, direction * (width / 2 + 18), 0, direction * (width / 2 + 8), 9]).fill({ color: colors.textLight, alpha: 0.26 })
  gfx.roundRect(-width / 2, -height / 2 + pulse * 0.25, width, height, 7).fill(colors.bonus)
  gfx.rect(-width / 2 + 6, -height / 2 + 7, width - 12, 5).fill({ color: colors.textDark, alpha: 0.18 })
  gfx.restore()
  addLabel(labelLayer, obj.label, obj.x, obj.y + 1, 17, colors.textDark)
}

function drawMalus(gfx: Graphics, labelLayer: Container, obj: GameObject): void {
  const hitbox = getObjectHitbox(obj)
  if (hitbox.shape !== 'rect') return

  const x = pixel(hitbox.left)
  const y = pixel(hitbox.top)
  gfx.save()
  gfx.roundRect(x, y, hitbox.width, hitbox.height, 10).fill(colors.malus)
  gfx.rect(x + 5, y + 10, 5, Math.max(0, hitbox.height - 20)).fill({ color: 0xffffff, alpha: 0.2 })
  gfx.restore()
  addLabel(labelLayer, obj.label, hitbox.left + hitbox.width / 2, hitbox.top + hitbox.height / 2, 18, colors.malusText)
}

function drawPlayer(gfx: Graphics, player: PlayerState): void {
  const jumpFrame = getPlayerJumpFrame(player)
  const footY = pixel(player.y + jumpFrame.offsetY)
  const isMoving = player.direction !== 0
  const isJumping = player.jumpTimer > 0
  const stride = isJumping ? jumpFrame.legSpread : isMoving ? Math.sin(player.walkTime * 18) * 7 : 0
  const armSwing = isJumping ? jumpFrame.armRaise : isMoving ? Math.cos(player.walkTime * 18) * 6 : 0

  gfx.ellipse(pixel(player.x), pixel(player.y + 9), isJumping ? 24 : 34, isJumping ? 5 : 8).fill({ color: 0x000000, alpha: 0.24 })
  drawPlayerSpriteLayer(gfx, player, 12, colors.playerShadow, 0, stride, armSwing, footY, isJumping)
  drawPlayerSpriteLayer(gfx, player, 8, colors.player, 0, stride, armSwing, footY, isJumping)
  gfx.save()
  gfx.translateTransform(pixel(player.x), footY)
  gfx.circle(0, -player.height + 17, 16).fill(colors.player)
  gfx.restore()
}

function drawPlayerSpriteLayer(
  gfx: Graphics,
  player: PlayerState,
  lw: number,
  color: number,
  lean: number,
  stride: number,
  armSwing: number,
  footY: number,
  isJumping: boolean,
): void {
  gfx.save()
  gfx.translateTransform(pixel(player.x), footY)
  gfx.rotateTransform(lean)
  gfx.moveTo(0, -player.height + 31).lineTo(0, -27)
    .moveTo(-21, -player.height + 45 + armSwing * (isJumping ? 1 : 0.25)).lineTo(21, -player.height + 45 + armSwing * (isJumping ? 1 : -0.25))
    .moveTo(0, -28).lineTo(-16 + stride, 0)
    .moveTo(0, -28).lineTo(16 - stride, 0)
    .stroke({ color, width: lw, cap: 'round' })
  gfx.restore()
}

function drawHitboxes(gfx: Graphics, player: PlayerState, game: GameState): void {
  drawRectHitbox(gfx, getPlayerHitbox(player, getPlayerJumpFrame(player).offsetY), colors.playerHitbox)
  for (const obj of game.objects) {
    const hitbox = getObjectHitbox(obj)
    if (hitbox.shape === 'circle') {
      gfx.circle(hitbox.x, hitbox.y, hitbox.radius).stroke({ color: colors.objectHitbox, width: 2, alpha: 0.95 })
    } else {
      drawRectHitbox(gfx, hitbox, colors.objectHitbox)
    }
  }
}

function drawRectHitbox(gfx: Graphics, hitbox: RectHitbox, color: number): void {
  gfx.rect(hitbox.left, hitbox.top, hitbox.width, hitbox.height).stroke({ color, width: 2, alpha: 0.95 })
}

function drawEndOverlay(gfx: Graphics, labelLayer: Container, world: WorldState, game: GameState): void {
  gfx.rect(0, 0, world.width, world.height).fill({ color: 0x101114, alpha: 0.72 })
  addLabel(labelLayer, 'Partie terminée', world.width / 2, world.height / 2 - 34, 34, colors.textLight)
  addLabel(labelLayer, `Score : ${game.score}`, world.width / 2, world.height / 2 + 7, 19, colors.textLight)
}

function addLabel(labelLayer: Container, text: string, x: number, y: number, fontSize: number, color: number): void {
  const label = new Text({ text, style: { fill: color, fontFamily: 'Inter, Arial, sans-serif', fontSize, fontWeight: '800' } })
  label.anchor.set(0.5)
  label.position.set(x, y)
  labelLayer.addChild(label)
}
