import type { ChangeEvent } from 'react'
import type { ArcadeConfig } from './arcadeTypes'

interface Props {
  config: ArcadeConfig
  onChange: (config: ArcadeConfig) => void
  onReset: () => void
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function numberField(
  label: string,
  value: number,
  min: number,
  max: number,
  step = 1,
  onChange: (value: number) => void,
) {
  return (
    <label className="arcade-config-row">
      <span>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(clampNumber(Number(event.target.value), min, max))}
      />
      <output>{value}</output>
    </label>
  )
}

function textField(label: string, value: string, onChange: (value: string) => void) {
  return (
    <label className="arcade-config-row">
      <span>{label}</span>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

export default function ArcadeConfigPanel({ config, onChange, onReset }: Props) {
  const setValue = <K extends keyof ArcadeConfig>(key: K, value: ArcadeConfig[K]) => {
    onChange({ ...config, [key]: value })
  }

  const setColor = (key: keyof ArcadeConfig['colors'], value: string) => {
    onChange({
      ...config,
      colors: {
        ...config.colors,
        [key]: value,
      },
    })
  }

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>, key: keyof ArcadeConfig) => {
    onChange({ ...config, [key]: event.target.value as ArcadeConfig[typeof key] })
  }

  return (
    <section className="arcade-config-panel" aria-label="Panneau de personnalisation du jeu">
      <div className="arcade-config-panel-header">
        <h2>Éditeur de jeu</h2>
        <p>Modifiez les variables de jeu et l'apparence des sprites.</p>
      </div>

      <div className="arcade-config-section">
        <h3>Paramètres de jeu</h3>
        {numberField('Vies de départ', config.startingLives, 1, 9, 1, (value) => setValue('startingLives', value))}
        {numberField('Vitesse du joueur', config.playerSpeed, 600, 2400, 10, (value) => setValue('playerSpeed', value))}
        {numberField('Largeur du joueur', config.playerWidth, 30, 90, 1, (value) => setValue('playerWidth', value))}
        {numberField('Hauteur du joueur', config.playerHeight, 50, 120, 1, (value) => setValue('playerHeight', value))}
        {numberField('Intervalle apparition', config.spawnEvery, 0.2, 2, 0.02, (value) => setValue('spawnEvery', value))}
        {numberField('Vitesse min des objets', config.spawnSpeedMin, 80, 320, 5, (value) => setValue('spawnSpeedMin', value))}
        {numberField('Vitesse max des objets', config.spawnSpeedMax, 120, 420, 5, (value) => setValue('spawnSpeedMax', value))}
        {numberField('Durée niveau', config.levelDuration, 5, 20, 1, (value) => setValue('levelDuration', value))}
        {numberField('Palier de vitesse', config.speedStep, 0.05, 0.3, 0.01, (value) => setValue('speedStep', value))}
      </div>

      <div className="arcade-config-section">
        <h3>Sprites et style</h3>
        <label className="arcade-config-row">
          <span>Style du joueur</span>
          <select value={config.playerSpriteStyle} onChange={(event) => onSelectChange(event, 'playerSpriteStyle')}>
            <option value="classic">Classique</option>
            <option value="rounded">Arrondi</option>
            <option value="pixel">Pixel</option>
          </select>
        </label>
        <label className="arcade-config-row">
          <span>Style des bonus</span>
          <select value={config.bonusSpriteStyle} onChange={(event) => onSelectChange(event, 'bonusSpriteStyle')}>
            <option value="circle">Rond</option>
            <option value="square">Carré</option>
            <option value="bubble">Bulle</option>
          </select>
        </label>
        <label className="arcade-config-row">
          <span>Style des malus</span>
          <select value={config.malusSpriteStyle} onChange={(event) => onSelectChange(event, 'malusSpriteStyle')}>
            <option value="rounded">Arrondi</option>
            <option value="block">Bloc</option>
            <option value="rush">Rush</option>
          </select>
        </label>
        <label className="arcade-config-row">
          <span>Afficher les hitboxes</span>
          <input
            type="checkbox"
            checked={config.showHitboxes}
            onChange={(event) => setValue('showHitboxes', event.target.checked)}
          />
        </label>
      </div>

      <div className="arcade-config-section">
        <h3>Couleurs</h3>
        {textField('Fond', config.colors.background, (value) => setColor('background', value))}
        {textField('Lignes de piste', config.colors.lane, (value) => setColor('lane', value))}
        {textField('Sol', config.colors.floor, (value) => setColor('floor', value))}
        {textField('Joueur', config.colors.player, (value) => setColor('player', value))}
        {textField('Ombre joueur', config.colors.playerShadow, (value) => setColor('playerShadow', value))}
        {textField('Bonus', config.colors.bonus, (value) => setColor('bonus', value))}
        {textField('Malus', config.colors.malus, (value) => setColor('malus', value))}
        {textField('Couleur hitbox joueur', config.colors.playerHitbox, (value) => setColor('playerHitbox', value))}
        {textField('Couleur hitbox objet', config.colors.objectHitbox, (value) => setColor('objectHitbox', value))}
        {textField('Texte sombre', config.colors.textDark, (value) => setColor('textDark', value))}
        {textField('Texte malus', config.colors.malusText, (value) => setColor('malusText', value))}
        {textField('Texte clair', config.colors.textLight, (value) => setColor('textLight', value))}
      </div>

      <div className="arcade-config-panel-actions">
        <button type="button" onClick={onReset}>Réinitialiser</button>
      </div>
    </section>
  )
}
