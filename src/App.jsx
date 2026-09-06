import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import DocumentFilters from './components/documents/DocumentFilters';
import DocumentList from './components/documents/DocumentList';
import DocumentForm from './components/documents/DocumentForm';
import DocumentDetail from './components/documents/DocumentDetail';
import ConfirmModal from './components/common/ConfirmModal';
import { documentService } from './services/documentService';

function App() {
  const [documentos, setDocumentos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para controlar los modales
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [deletingDoc, setDeletingDoc] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const tiposData = await documentService.getTipos();
    const docsData = await documentService.getAll();
    setTipos(tiposData);
    setDocumentos(docsData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Manejadores CRUD
  const handleSaveDocument = async (formData) => {
    if (editingDoc) {
      await documentService.update(editingDoc.id, formData);
    } else {
      await documentService.create(formData);
    }
    setShowFormModal(false);
    setEditingDoc(null);
    loadData();
  };

  const handleConfirmDelete = async () => {
    if (deletingDoc) {
      await documentService.delete(deletingDoc.id);
      setDeletingDoc(null);
      loadData();
    }
  };

  const docsFiltrados = documentos.filter((doc) => {
    const matchTipo = selectedTipo === '' || doc.tipo === selectedTipo;
    const term = searchTerm.toLowerCase();
    const matchSearch =
      doc.titulo.toLowerCase().includes(term) ||
      doc.referencia.toLowerCase().includes(term) ||
      doc.descripcion.toLowerCase().includes(term);
    return matchTipo && matchSearch;
  });

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />
      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-0 text-dark fw-bold">Gestión Documental Interna</h1>
            <p className="text-muted small mb-0">Administración de memos, oficios y actas institucionales</p>
          </div>
        </div>

        <DocumentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTipo={selectedTipo}
          setSelectedTipo={setSelectedTipo}
          tipos={tipos}
          onOpenCreate={() => {
            setEditingDoc(null);
            setShowFormModal(true);
          }}
        />

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <DocumentList
            documentos={docsFiltrados}
            tipos={tipos}
            onSelectView={(doc) => setViewingDoc(doc)}
            onSelectEdit={(doc) => {
              setEditingDoc(doc);
              setShowFormModal(true);
            }}
            onSelectDelete={(doc) => setDeletingDoc(doc)}
          />
        )}

        {/* Modales funcionales */}
        <DocumentForm
          show={showFormModal}
          initialData={editingDoc}
          tipos={tipos}
          onClose={() => {
            setShowFormModal(false);
            setEditingDoc(null);
          }}
          onSave={handleSaveDocument}
        />

        <DocumentDetail
          show={!!viewingDoc}
          doc={viewingDoc}
          tipos={tipos}
          onClose={() => setViewingDoc(null)}
        />

        <ConfirmModal
          show={!!deletingDoc}
          title="Eliminar Documento"
          message={`¿Confirma que desea eliminar "${deletingDoc?.titulo}"? Esta acción no se puede deshacer.`}
          onClose={() => setDeletingDoc(null)}
          onConfirm={handleConfirmDelete}
        />
      </main>
    </div>
  );
}

export default App;