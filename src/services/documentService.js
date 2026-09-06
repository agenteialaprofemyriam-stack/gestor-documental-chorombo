import initialData from '../data/db.json';

// Clave para guardar en el almacenamiento local del navegador
const STORAGE_KEY = 'chorombo_documentos_v1';

const getStoredDocs = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.documentos));
    return initialData.documentos;
  }
  return JSON.parse(data);
};

export const documentService = {
  // GET /api/tipos-documento
  getTipos: async () => {
    return initialData.tipos_documento;
  },

  // GET /api/documentos
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStoredDocs()), 200);
    });
  },

  // GET /api/documentos/:id
  getById: async (id) => {
    const docs = getStoredDocs();
    return docs.find((d) => d.id === Number(id));
  },

  // POST /api/documentos
  create: async (newDoc) => {
    const docs = getStoredDocs();
    const created = { ...newDoc, id: Date.now() };
    const updated = [created, ...docs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return created;
  },

  // PUT /api/documentos/:id
  update: async (id, updatedData) => {
    const docs = getStoredDocs();
    const updated = docs.map((d) => (d.id === Number(id) ? { ...updatedData, id: Number(id) } : d));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updatedData;
  },

  // DELETE /api/documentos/:id
  delete: async (id) => {
    const docs = getStoredDocs();
    const filtered = docs.filter((d) => d.id !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};