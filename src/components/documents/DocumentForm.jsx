import { useState, useEffect } from 'react';

export default function DocumentForm({ show, onClose, onSave, tipos, initialData }) {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    fecha: '',
    referencia: '',
    descripcion: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        titulo: '',
        tipo: tipos.length > 0 ? tipos[0].id : '',
        fecha: new Date().toISOString().split('T')[0],
        referencia: '',
        descripcion: ''
      });
    }
    setErrors({});
  }, [initialData, show, tipos]);

  if (!show) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = 'El título o asunto es obligatorio.';
    if (!formData.tipo) newErrors.tipo = 'Debe seleccionar un tipo de documento.';
    if (!formData.fecha) newErrors.fecha = 'La fecha es obligatoria.';
    if (!formData.referencia.trim()) newErrors.referencia = 'Indique remitente o destinatario.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className={`bi ${initialData ? 'bi-pencil-square' : 'bi-file-earmark-plus'} me-2`}></i>
              {initialData ? 'Editar Documento' : 'Registrar Nuevo Documento'}
            </h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Título o Asunto *</label>
                <input
                  type="text"
                  className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                  placeholder="Ej: Memo N° 05 - Plan anual"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
                {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
              </div>

              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Tipo de Documento *</label>
                  <select
                    className={`form-select ${errors.tipo ? 'is-invalid' : ''}`}
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                  >
                    {tipos.map((t) => (
                      <option key={t.id} value={t.id}>{t.nombre}</option>
                    ))}
                  </select>
                  {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Fecha de Emisión *</label>
                  <input
                    type="date"
                    className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  />
                  {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Referencia / Destinatario *</label>
                <input
                  type="text"
                  className={`form-control ${errors.referencia ? 'is-invalid' : ''}`}
                  placeholder="Ej: Dirección / DAEM / Apoderados"
                  value={formData.referencia}
                  onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
                />
                {errors.referencia && <div className="invalid-feedback">{errors.referencia}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Descripción / Observación</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Resumen del contenido del documento..."
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary px-4">
                {initialData ? 'Guardar Cambios' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}