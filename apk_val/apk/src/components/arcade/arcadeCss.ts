export const GAME_CSS = `
.arcade-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% 20%, rgba(71,143,141,0.22), transparent 28rem),
    linear-gradient(140deg, #101114 0%, #20232a 46%, #13181b 100%);
  color: #f6f1e8;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, sans-serif;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior: none;
}
.arcade-quit {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: rgba(16,17,20,0.82);
  border-bottom: 1px solid rgba(246,241,232,0.1);
}
.arcade-quit button {
  background: none;
  border: 1px solid rgba(246,241,232,0.28);
  border-radius: 8px;
  color: #f6f1e8;
  font: inherit;
  font-size: 0.86rem;
  padding: 6px 14px;
  cursor: pointer;
}
.arcade-shell {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 480px) minmax(178px, 220px);
  align-items: start;
  justify-content: center;
  gap: 16px;
  width: min(100%, 760px);
  margin: 0 auto;
  padding: 16px;
}
.arcade-stage {
  position: relative;
  width: min(100%, 480px);
  aspect-ratio: 4 / 7;
  overflow: hidden;
  border: 1px solid rgba(246,241,232,0.18);
  border-radius: 8px;
  background: #11151a;
  box-shadow: 0 24px 70px rgba(0,0,0,0.42);
  touch-action: none;
}
#ag-pixi-container, #ag-pixi-container canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
}
.arcade-hud {
  position: absolute;
  top: 12px; left: 12px; right: 12px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
}
.arcade-hud > div {
  min-width: 78px;
  padding: 8px 10px;
  border: 1px solid rgba(246,241,232,0.14);
  border-radius: 8px;
  background: rgba(16,17,20,0.72);
  backdrop-filter: blur(8px);
}
.arcade-hud-label {
  display: block;
  margin-bottom: 2px;
  color: #b9c4c7;
  font-size: 0.72rem;
  line-height: 1;
  text-transform: uppercase;
}
.arcade-hud strong {
  display: block;
  color: #f6f1e8;
  font-size: clamp(1rem, 4vw, 1.25rem);
  line-height: 1.1;
}
.arcade-start-btn {
  position: absolute;
  left: 50%; bottom: 24px;
  min-width: 128px; min-height: 44px;
  padding: 10px 18px;
  border: 0; border-radius: 8px;
  background: #f0c453; color: #15110a;
  font: inherit; font-weight: 800;
  transform: translateX(-50%);
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(240,196,83,0.28);
}
.arcade-start-btn:focus-visible { outline: 3px solid #68c1ba; outline-offset: 3px; }
.arcade-start-btn.is-hidden { display: none; }
.arcade-score-panel {
  width: 100%; padding: 12px;
  border: 1px solid rgba(246,241,232,0.18);
  border-radius: 8px;
  background: rgba(16,17,20,0.78);
  box-shadow: 0 18px 48px rgba(0,0,0,0.28);
}
.arcade-score-panel-header {
  display: flex; align-items: center;
  justify-content: space-between;
  gap: 10px; margin-bottom: 10px;
}
.arcade-score-panel-header h2 { margin: 0; color: #f6f1e8; font-size: 1rem; }
.arcade-memory-toggle {
  display: inline-flex; align-items: center;
  gap: 6px; color: #b9c4c7; font-size: 0.78rem; cursor: pointer;
}
.arcade-memory-toggle input { width: 16px; height: 16px; accent-color: #f0c453; }
.arcade-player-name {
  display: grid; gap: 6px;
  margin-bottom: 12px;
  color: #b9c4c7; font-size: 0.78rem;
}
.arcade-player-name span { line-height: 1; }
.arcade-player-name input {
  width: 100%; min-height: 36px;
  border: 1px solid rgba(246,241,232,0.18); border-radius: 8px;
  padding: 7px 9px;
  background: rgba(246,241,232,0.07);
  color: #f6f1e8; font: inherit;
  font-size: 0.92rem; font-weight: 700;
}
.arcade-score-list {
  display: grid; gap: 6px;
  min-height: 284px; margin: 0; padding: 0; list-style: none;
}
.arcade-score-list li {
  display: grid;
  grid-template-columns: 28px minmax(0,1fr) auto auto;
  align-items: center; gap: 8px;
  min-height: 24px; padding: 5px 7px;
  border-radius: 6px;
  background: rgba(246,241,232,0.06);
  color: #f6f1e8; font-size: 0.86rem; line-height: 1;
}
.arcade-score-rank, .arcade-score-level { color: #b9c4c7; }
.arcade-score-name {
  min-width: 0; overflow: hidden;
  text-overflow: ellipsis; white-space: nowrap;
}
.arcade-score-value { font-weight: 800; font-variant-numeric: tabular-nums; }
.arcade-clear-btn {
  width: 100%; min-height: 36px; margin-top: 12px;
  border: 1px solid rgba(246,241,232,0.18); border-radius: 8px;
  background: rgba(246,241,232,0.06);
  color: #f6f1e8; font: inherit; font-size: 0.86rem; cursor: pointer;
}
.arcade-start-btn:focus-visible,
.arcade-clear-btn:focus-visible,
.arcade-memory-toggle input:focus-visible,
.arcade-player-name input:focus-visible {
  outline: 3px solid #68c1ba; outline-offset: 3px;
}
@media (max-width: 760px) {
  .arcade-shell {
    grid-template-columns: minmax(0, 480px);
    width: min(100vw, 520px);
    gap: 12px; padding: 8px;
  }
  .arcade-score-panel { order: 2; }
  .arcade-stage { justify-self: center; width: min(100%, calc((100dvh - 16px) * 4 / 7)); }
}
@media (max-width: 480px) {
  .arcade-hud { top: 8px; left: 8px; right: 8px; gap: 6px; }
  .arcade-hud > div { min-width: 0; padding: 7px 8px; }
  .arcade-hud-label { font-size: 0.62rem; }
  .arcade-start-btn { bottom: 16px; }
}
`