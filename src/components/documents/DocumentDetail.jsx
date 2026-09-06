export default function DocumentDetail({ show, doc, tipos, onClose }) {
  if (!show || !doc) return null;

  const tipoObj = tipos.find((t) => t.id === doc.tipo);
  const tipoNombre = tipoObj ? tipoObj.nombre : doc.tipo;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-light">
            <h5 className="modal-title text-dark">
              <i className="bi bi-file-earmark-text text-primary me-2"></i>
              Detalle del Documento
            </h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="mb-3">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle mb-2">
                {tipoNombre}
              </span>
              <h4 className="fw-bold text-dark">{doc.titulo}</h4>
            </div>
            <hr />
            <div className="row g-3 small">
              <div className="col-6">
                <strong className="text-muted d-block">Fecha de Registro:</strong>
                <span>{doc.fecha}</span>
              </div>
              <div className="col-6">
                <strong className="text-muted d-block">Referencia / Involucrados:</strong>
                <span>{doc.referencia}</span>
              </div>
              <div className="col-12 mt-3">
                <strong className="text-muted d-block">Descripción detallada:</strong>
                <p className="bg-light p-3 rounded mt-1 border text-secondary">
                  {doc.descripcion || 'Sin descripción adicional registrada.'}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
