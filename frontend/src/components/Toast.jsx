/**
 * Toast — floating notification for success/error feedback.
 * Props:
 *   message — string to display
 *   type    — 'success' | 'error'
 *   onClose — fn() to dismiss
 */
export default function Toast({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="alert" aria-live="assertive" id="toast-notification">
      <span className="toast__icon">{type === 'success' ? '✅' : '❌'}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Close notification">×</button>
    </div>
  );
}
