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
            <h3>Comentarios</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleComentar}>
                <label>Autor:
                    <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
                </label>
                <label>Comentario:
                    <textarea value={contenido} onChange={(e) => setContenido(e.target.value)}></textarea>
                </label>
                <button type="submit">Agregar comentario</button>
            </form>

            {comentarios && comentarios.map(c => (
                <div key={c.id}>
                    <p><strong>{c.autor}:</strong> {c.contenido}</p>
                    <button onClick={() => handleEliminar(c.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    )
}

export default Comentarios;