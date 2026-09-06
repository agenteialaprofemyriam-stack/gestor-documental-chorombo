export default function DocumentFilters({ searchTerm, setSearchTerm, selectedTipo, setSelectedTipo, tipos, onOpenCreate }) {
  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body p-3">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Buscar por título, referencia o descripción..."
                aria-label="Buscar documentos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              aria-label="Filtrar por tipo de documento"
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
            >
              <option value="">Todos los tipos de documento</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 text-end">
            <button className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2" onClick={onOpenCreate}>
              <i className="bi bi-plus-circle"></i>
              Nuevo Documento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}