export default function DocumentList({ documentos, tipos, onSelectView, onSelectEdit, onSelectDelete }) {
  const getTipoNombre = (tipoId) => {
    const encontrado = tipos.find((t) => t.id === tipoId);
    return encontrado ? encontrado.nombre : tipoId;
  };

  if (documentos.length === 0) {
    return (
      <div className="alert alert-warning text-center py-4 shadow-sm border-0" role="alert">
        <i className="bi bi-folder-x fs-2 d-block mb-2"></i>
        No se encontraron documentos registrados con los filtros aplicados.
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: '30%' }}>Título / Asunto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Referencia</th>
              <th scope="col" className="text-end" style={{ width: '15%' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((doc) => (
              <tr key={doc.id}>
                <td className="fw-semibold text-dark">{doc.titulo}</td>
                <td>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                    {getTipoNombre(doc.tipo)}
                  </span>
                </td>
                <td className="text-muted">{doc.fecha}</td>
                <td className="text-secondary small">{doc.referencia}</td>
                <td className="text-end">
                  <div className="btn-group btn-group-sm" role="group" aria-label="Acciones de documento">
                    <button
                      className="btn btn-outline-info"
                      title="Ver detalle"
                      onClick={() => onSelectView(doc)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      className="btn btn-outline-warning"
                      title="Editar"
                      onClick={() => onSelectEdit(doc)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      title="Eliminar"
                      onClick={() => onSelectDelete(doc)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}