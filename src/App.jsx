import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import DocumentFilters from './components/documents/DocumentFilters';
import DocumentList from './components/documents/DocumentList';
import { documentService } from './services/documentService';

function App() {
  const [documentos, setDocumentos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const tiposData = await documentService.getTipos();
      const docsData = await documentService.getAll();
      setTipos(tiposData);
      setDocumentos(docsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Filtrar documentos
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
            <p className="text-muted small mb-0">Administración de memos, oficios y actas de apoderados</p>
          </div>
        </div>

        <DocumentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTipo={selectedTipo}
          setSelectedTipo={setSelectedTipo}
          tipos={tipos}
          onOpenCreate={() => alert('Próximo paso: abrir formulario de creación')}
        />

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando documentos...</span>
            </div>
          </div>
        ) : (
          <DocumentList
            documentos={docsFiltrados}
            tipos={tipos}
            onSelectView={(doc) => alert(`Detalle de: ${doc.titulo}`)}
            onSelectEdit={(doc) => alert(`Editar: ${doc.titulo}`)}
            onSelectDelete={(doc) => alert(`Eliminar: ${doc.titulo}`)}
          />
        )}
      </main>
    </div>
  );
}

export default App;