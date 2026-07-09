import { useState, useEffect, useCallback } from 'react';
import { equipeService } from '../api/equipeService';

export function useEquipes() {
  const [equipes, setEquipes]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [success, setSuccess]   = useState(null);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const flash = (type, msg) => {
    if (type === 'error')   setError(msg);
    if (type === 'success') setSuccess(msg);
    setTimeout(() => { setError(null); setSuccess(null); }, 3500);
  };

  // ── Fetch All ─────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    clearMessages();
    try {
      const data = await equipeService.getAll();
      setEquipes(data);
    } catch (err) {
      flash('error', err.response?.data?.message || 'Failed to load teams.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Create ─────────────────────────────────────────────────
  const createEquipe = async (payload) => {
    setLoading(true);
    clearMessages();
    try {
      const created = await equipeService.create(payload);
      setEquipes((prev) => [...prev, created]);
      flash('success', `Team "${created.name}" created successfully!`);
      return true;
    } catch (err) {
      flash('error', err.response?.data?.message || 'Failed to create team.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ── Update ─────────────────────────────────────────────────
  const updateEquipe = async (id, payload) => {
    setLoading(true);
    clearMessages();
    try {
      const updated = await equipeService.update(id, payload);
      setEquipes((prev) => prev.map((e) => (e.id === id ? updated : e)));
      flash('success', `Team "${updated.name}" updated successfully!`);
      return true;
    } catch (err) {
      flash('error', err.response?.data?.message || 'Failed to update team.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────
  const deleteEquipe = async (id) => {
    setLoading(true);
    clearMessages();
    try {
      await equipeService.remove(id);
      setEquipes((prev) => prev.filter((e) => e.id !== id));
      flash('success', 'Team deleted successfully!');
      return true;
    } catch (err) {
      flash('error', err.response?.data?.message || 'Failed to delete team.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { equipes, loading, error, success, fetchAll, createEquipe, updateEquipe, deleteEquipe };
}
