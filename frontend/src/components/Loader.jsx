/**
 * Loader — full-width animated skeleton/spinner for loading states.
 */
export default function Loader() {
  return (
    <div className="loader" id="loading-indicator" role="status" aria-label="Loading teams">
      <div className="loader__spinner" />
      <p className="loader__text">Loading teams…</p>
    </div>
  );
}
