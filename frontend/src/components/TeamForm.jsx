import { useState } from 'react';

/**
 * TeamForm — shared form used for both Create and Edit.
 * Props:
 *   initial  — initial values { name, country }
 *   onSubmit — async fn(payload) called on form submit, returns boolean
 *   onCancel — fn() to cancel/close
 *   isEdit   — boolean flag
 *   loading  — boolean
 */
export default function TeamForm({ initial = {}, onSubmit, onCancel, isEdit = false, loading }) {
  const [form, setForm] = useState({
    name:    initial.name    ?? '',
    country: initial.country ?? '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.country.trim()) return;
    const ok = await onSubmit(form);
    if (ok && !isEdit) setForm({ name: '', country: '' });
  };

  return (
    <form className="team-form" onSubmit={handleSubmit} aria-label={isEdit ? 'Edit team form' : 'Add team form'}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Team Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Real Madrid"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="e.g. Spain"
            value={form.country}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading || !form.name.trim() || !form.country.trim()}>
          {loading ? (
            <span className="btn-spinner" />
          ) : isEdit ? (
            'Save Changes'
          ) : (
            '+ Add Team'
          )}
        </button>
      </div>
    </form>
  );
}
