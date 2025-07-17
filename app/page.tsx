'use client';

import { useState } from 'react';

export default function Home() {
  const [folderId, setFolderId] = useState('');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Procesando...');

    try {
      // Iniciar autenticación con Google
      const authUrl = await fetch('/api/auth').then(res => res.json());
      window.location.href = authUrl; // Redirige al usuario para autenticarse
    } catch (error) {
      setStatus('Error al iniciar autenticación');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>OCR para Transferencias Bancarias</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID de la Carpeta de Google Drive:</label>
          <input
            type="text"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            placeholder="Ej: 1a2b3c4d5e6f7g8h9i0j"
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            required
          />
        </div>
        <div>
          <label>ID de la Hoja de Cálculo:</label>
          <input
            type="text"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            placeholder="Ej: 1x2y3z4w5v6u7t8s9r0q"
            style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Procesar Imágenes
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}