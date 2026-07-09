import { useState } from 'react';
import { useEquipes } from './hooks/useEquipes';
import TeamForm from './components/TeamForm';
import TeamCard from './components/TeamCard';
import Toast from './components/Toast';
import Loader from './components/Loader';
import './App.css';

export default function App() {
  const { equipes, loading, error, success, createEquipe, updateEquipe, deleteEquipe, fetchAll } = useEquipes();
  const [search, setSearch] = useState('');

  const filtered = equipes.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* ── Notifications ─────────────────────────── */}
      <Toast message={error}   type="error"   onClose={() => {}} />
      <Toast message={success} type="success" onClose={() => {}} />

      {/* ── Header ───────────────────────────────── */}
      <header className="app-header">
        <div className="header-brand">
          <span className="header-icon">⚽</span>
          <div>
            <h1 className="header-title">Equipe Manager</h1>
            <p className="header-subtitle">Powered by Node.js · MongoDB · Redis</p>
          </div>
        </div>
        <div className="header-meta">
          {/* Search relocated to header for bento layout */}
          <input
            id="search-input"
            className="search-input"
            type="search"
            placeholder="Search teams…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search teams"
          />
          <span className="badge">{equipes.length} Teams</span>
          <button className="btn btn-ghost btn-sm" onClick={fetchAll} disabled={loading} id="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* ── Left column: Add Team form ──────────── */}
        <section className="section section--add" aria-labelledby="add-section-title">
          <h2 className="section-title" id="add-section-title">
            <span className="section-icon">➕</span> Add New Team
          </h2>
          <TeamForm onSubmit={createEquipe} loading={loading} />
        </section>

        {/* ── Right column: Teams grid ────────────── */}
        <section className="section section--list" aria-labelledby="list-section-title">
          <div className="list-header">
            <h2 className="section-title" id="list-section-title">
              <span className="section-icon">🏆</span> Teams
            </h2>
          </div>

          {loading && equipes.length === 0 ? (
            <Loader />
          ) : filtered.length === 0 ? (
            <div className="empty-state" id="empty-state">
              <span className="empty-state__icon">🏟️</span>
              <p>{search ? 'No teams match your search.' : 'No teams yet. Add one above!'}</p>
            </div>
          ) : (
            <div className="team-grid">
              {filtered.map((equipe) => (
                <TeamCard
                  key={equipe.id}
                  equipe={equipe}
                  onUpdate={updateEquipe}
                  onDelete={deleteEquipe}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="app-footer">
        <p>
          Backend API: <a href="http://localhost:4000/equipe" target="_blank" rel="noopener noreferrer">
            http://localhost:4000/equipe
          </a>
        </p>
      </footer>
    </div>
  );
}
