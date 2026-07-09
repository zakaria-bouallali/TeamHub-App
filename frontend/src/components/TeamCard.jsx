import { useState } from 'react';
import TeamForm from './TeamForm';

const COUNTRY_FLAGS = {
  Spain:    '🇪🇸',
  England:  '🇬🇧',
  Germany:  '🇩🇪',
  France:   '🇫🇷',
  Italy:    '🇮🇹',
  Portugal: '🇵🇹',
  Brazil:   '🇧🇷',
  Morocco:  '🇲🇦',
  Netherlands: '🇳🇱',
};

/**
 * TeamCard — displays a single equipe with inline edit and delete controls.
 */
export default function TeamCard({ equipe, onUpdate, onDelete, loading }) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const flag = COUNTRY_FLAGS[equipe.country] ?? '🏳️';

  const handleUpdate = async (payload) => {
    const ok = await onUpdate(equipe.id, payload);
    if (ok) setEditing(false);
  };

  const handleDelete = async () => {
    if (!confirming) { setConfirming(true); return; }
    await onDelete(equipe.id);
    setConfirming(false);
  };

  return (
    <div className={`team-card ${editing ? 'team-card--editing' : ''}`} id={`team-card-${equipe.id}`}>
      {!editing ? (
        <>
          <div className="team-card__header">
            <span className="team-card__flag">{flag}</span>
            <div>
              <h3 className="team-card__name">{equipe.name}</h3>
              <p className="team-card__country">{equipe.country}</p>
            </div>
            <span className="team-card__id">#{equipe.id}</span>
          </div>
          <div className="team-card__actions">
            <button
              className="btn btn-sm btn-edit"
              onClick={() => { setEditing(true); setConfirming(false); }}
              disabled={loading}
              title="Edit team"
              id={`edit-btn-${equipe.id}`}
            >
              ✏️ Edit
            </button>
            <button
              className={`btn btn-sm ${confirming ? 'btn-confirm' : 'btn-danger'}`}
              onClick={handleDelete}
              disabled={loading}
              title={confirming ? 'Click again to confirm' : 'Delete team'}
              id={`delete-btn-${equipe.id}`}
              onBlur={() => setConfirming(false)}
            >
              {confirming ? '⚠️ Confirm?' : '🗑 Delete'}
            </button>
          </div>
        </>
      ) : (
        <div className="team-card__edit-form">
          <h4 className="team-card__edit-title">Editing Team #{equipe.id}</h4>
          <TeamForm
            initial={equipe}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
            isEdit
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
