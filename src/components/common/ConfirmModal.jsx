export default function ConfirmModal({ show, title, message, onConfirm, onClose }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-0 shadow text-center p-3">
          <div className="modal-body">
            <div className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill display-4"></i>
            </div>
            <h5 className="fw-bold mb-2">{title || '¿Estás seguro?'}</h5>
            <p className="text-muted small mb-4">{message}</p>
            <div className="d-flex justify-content-center gap-2">
              <button type="button" className="btn btn-outline-secondary w-50" onClick={onClose}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger w-50" onClick={onConfirm}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}