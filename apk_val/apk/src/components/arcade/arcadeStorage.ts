import type { ArcadeUiElements, GameState, ScoreEntry } from './arcadeTypes'
import { DEFAULT_PLAYER_NAME, PLAYER_NAME_KEY, SCORE_MEMORY_KEY, SCORE_STORAGE_KEY } from './arcadeTypes'

export class ScoreboardManager {
  constructor(private readonly ui: ArcadeUiElements) {}

  public initialize(game: GameState): void {
    this.ui.memoryToggle.checked = this.getStoredScoreMemory()
    this.ui.playerNameInput.value = this.getStoredPlayerName()
    game.topScores = this.ui.memoryToggle.checked ? this.loadStoredScores() : []
    this.renderScoreboard(game)
  }

  public setScoreMemory(enabled: boolean, game: GameState): void {
    try {
      localStorage.setItem(SCORE_MEMORY_KEY, enabled ? 'on' : 'off')
    } catch {
      this.ui.memoryToggle.checked = false
    }
    if (enabled) {
      game.topScores = this.mergeScores(this.loadStoredScores(), game.topScores)
      this.saveStoredScores(game)
    }
    this.renderScoreboard(game)
  }

  public updatePlayerName(): void {
    const name = this.sanitizePlayerName(this.ui.playerNameInput.value)
    this.ui.playerNameInput.value = name
    try {
      localStorage.setItem(PLAYER_NAME_KEY, name)
    } catch {
      // ignore
    }
  }

  public addScoreToBoard(game: GameState, score: number, level: number): void {
    if (score <= 0) return
    game.topScores = this.mergeScores(game.topScores, [{
      name: this.getPlayerName(),
      score,
      level,
      date: new Date().toISOString(),
    }])
    this.saveStoredScores(game)
    this.renderScoreboard(game)
  }

  public clearScores(game: GameState): void {
    game.topScores = []
    try {
      localStorage.removeItem(SCORE_STORAGE_KEY)
    } catch {
      // ignore storage errors
    }
    this.renderScoreboard(game)
  }

  private sanitizePlayerName(name: unknown): string {
    if (typeof name !== 'string') return DEFAULT_PLAYER_NAME
    const cleaned = name.trim().replace(/\s+/g, ' ').slice(0, 12)
    return cleaned || DEFAULT_PLAYER_NAME
  }

  private getPlayerName(): string {
    const name = this.sanitizePlayerName(this.ui.playerNameInput.value)
    this.ui.playerNameInput.value = name
    try {
      localStorage.setItem(PLAYER_NAME_KEY, name)
    } catch {
      // ignore
    }
    return name
  }

  private getStoredPlayerName(): string {
    try {
      return this.sanitizePlayerName(localStorage.getItem(PLAYER_NAME_KEY) || DEFAULT_PLAYER_NAME)
    } catch {
      return DEFAULT_PLAYER_NAME
    }
  }

  private getStoredScoreMemory(): boolean {
    try {
      return localStorage.getItem(SCORE_MEMORY_KEY) !== 'off'
    } catch {
      return false
    }
  }

  private sanitizeScores(scores: Partial<ScoreEntry>[]): ScoreEntry[] {
    return scores
      .reduce<ScoreEntry[]>((entries, entry) => {
        const score = Number(entry.score)
        if (!Number.isFinite(score) || score <= 0) return entries
        const level = Number(entry.level)
        entries.push({
          name: this.sanitizePlayerName(entry.name),
          score: Math.floor(score),
          level: Number.isFinite(level) ? Math.floor(level) : 1,
          date: typeof entry.date === 'string' ? entry.date : new Date().toISOString(),
        })
        return entries
      }, [])
      .sort((a, b) => b.score - a.score || b.level - a.level || a.date.localeCompare(b.date))
      .slice(0, 10)
  }

  private loadStoredScores(): ScoreEntry[] {
    try {
      const raw = JSON.parse(localStorage.getItem(SCORE_STORAGE_KEY) || '[]')
      return this.sanitizeScores(Array.isArray(raw) ? raw : [])
    } catch {
      return []
    }
  }

  private saveStoredScores(game: GameState): void {
    if (!this.ui.memoryToggle.checked) return
    try {
      localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(game.topScores))
    } catch {
      this.ui.memoryToggle.checked = false
    }
  }

  private mergeScores(...groups: ScoreEntry[][]): ScoreEntry[] {
    return this.sanitizeScores(groups.flat())
  }

  private renderScoreboard(game: GameState): void {
    this.ui.scoreList.textContent = ''
    for (let i = 0; i < 10; i += 1) {
      const entry = game.topScores[i]
      const li = document.createElement('li')
      const rank = document.createElement('span')
      rank.className = 'arcade-score-rank'
      rank.textContent = `${i + 1}.`
      li.append(rank)

      const name = document.createElement('span')
      name.className = 'arcade-score-name'
      name.textContent = entry ? entry.name : '-'
      li.append(name)

      const val = document.createElement('span')
      val.className = 'arcade-score-value'
      val.textContent = entry ? entry.score.toString() : ''
      li.append(val)

      const lv = document.createElement('span')
      lv.className = 'arcade-score-level'
      lv.textContent = entry ? `N${entry.level}` : ''
      li.append(lv)

      this.ui.scoreList.append(li)
    }
  }
}
