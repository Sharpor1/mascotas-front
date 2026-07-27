import { useState } from "react";
import mascotasApi from "../../api/api";

function Comentarios({ mascotaId, comentarios, onRefresh }) {
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");
    const [error, setError] = useState(null);

    const handleComentar = async (e) => {
        e.preventDefault();
        try {
            await mascotasApi.post(`mascotas/${mascotaId}/comentar/`, { autor, contenido });
            setAutor("");
            setContenido("");
            setError(null);
            onRefresh();
        } catch (err) {
            console.error(err.response?.status, err.response?.data);
            if (err.response?.status === 400) {
                const detalle = err.response?.data;
                const mensajes = Object.entries(detalle)
                    .map(([campo, msgs]) => `${campo}: ${msgs.join(', ')}`)
                    .join(' | ');
                setError(`Error de validación: ${mensajes}`);
            } else if (err.response?.status === 404) {
                setError('Mascota no encontrada');
            } else {
                setError('Error al agregar el comentario');
            }
        }
    }

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este comentario?')) return;
        try {
            await mascotasApi.delete(`comentarios/${id}/`);
            setError(null);
            onRefresh();
        } catch (err) {
            console.error(err.response?.status, err.response?.data);
            if (err.response?.status === 404) {
                setError('Comentario no encontrado');
            } else {
                setError('Error al eliminar el comentario');
            }
        }
    }

    return (
        <div>
            
            {error && (
                <div className="alert alert-danger py-2 small mb-3" role="alert">
                    {error}
                </div>
            )}

            
            <form onSubmit={handleComentar} className="mb-4 bg-light p-3 rounded-3 border">
                <div className="mb-2">
                    <label className="form-label fw-semibold mb-1">Tu Nombre:</label>
                    <input 
                        type="text" 
                        className="form-control form-control-sm"
                        placeholder="Ej. María"
                        value={autor} 
                        onChange={(e) => setAutor(e.target.value)} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold mb-1">Comentario:</label>
                    <textarea 
                        className="form-control form-control-sm"
                        rows="3"
                        placeholder="Escribe una pregunta o comentario..."
                        value={contenido} 
                        onChange={(e) => setContenido(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-sm px-3">
                    Publicar comentario
                </button>
            </form>

            
            <div className="d-flex flex-column gap-2">
                {comentarios && comentarios.length > 0 ? (
                    comentarios.map((c) => (
                        <div key={c.id} className="card border-0 bg-light p-3 position-relative">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 className="fw-bold mb-1 text-dark">{c.autor}</h6>
                                    <p className="mb-0 text-secondary text-break">{c.contenido}</p>
                                </div>
                                
                                
                                <button 
                                    className="btn btn-outline-danger btn-sm border-0 py-0 px-2 ms-2"
                                    title="Eliminar comentario"
                                    onClick={() => handleEliminar(c.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted text-center py-3 mb-0 small">
                        Sin comentarios.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Comentarios;