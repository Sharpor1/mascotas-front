import { Link } from "react-router-dom";
import MascotasForm from "./MascotasForm";
import { useState } from "react";
import mascotasApi from "../../api/api";


function MascotasList({ lista, onAdd, onChange }) {

    const [editarMascota, setEditarMascota] = useState(null);
    const [error, setError] = useState(null);

    const handleEdit = (m) => {
        setEditarMascota(m);
    };

    const handleCancelEdit = () => {
        setEditarMascota(null);
    };

    const handleUpdateMascota = async (id, mascota) => {
        try {
            await mascotasApi.patch(`/mascotas/${id}/`, mascota);
            setError(null);
            setEditarMascota(null);
        } catch (error) {
            if (error.response?.status === 400) {
                setError('Error de validacion: revise los campos');
            } else if (error.response?.status == 404) {
            setError('Mascota no encontrada');
            } else {
            setError('Error al editar la mascota');
            }
        } finally {
        if (onChange) onChange();
        }
    };

    const handleEliminarMascota = async (id) => {
        if(!window.confirm('¿Estas seguro que quieres eliminar esta mascota?')) return;
        try {
            await mascotasApi.delete(`/mascotas/${id}/`);
            setError(null);
        } catch (error) {
            if (error.reponse?.status === 404) {
                setError('Mascota no encontrada');
            } else {
                setError('Error al eliminar la mascota');
            }
        } finally {
            if (onChange) onChange();
        }
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
                <div className="container-fluid">
                    <span className="navbar-brand h1 m-0">Lista mascotas</span>
                </div>
            </nav>

            {error && <p className="text-danger">{error}</p>}

            
            <MascotasForm onAdd={onAdd} />

            
            {editarMascota && (
                <MascotasForm
                    key={editarMascota.id}
                    mascota={editarMascota}
                    onUpdate={handleUpdateMascota}
                    onCancel={handleCancelEdit}
                />
            )}

            
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
                {lista.map((m) => (
                    <div className="col" key={m.id}>
                        <div className="card h-100 shadow-sm border-0">
                            
                            {m.imagen && (
                                <img 
                                src={m.imagen} 
                                className="card-img-top" 
                                alt={m.nombre} 
                                style={{ height: '280px', objectFit: 'cover' }}
                            />
                            )}

                            <div className="card-body">
                                <h5 className="card-title">{m.nombre}</h5>
                                <p className="card-text">{m.descripcion}</p>
                                <p className="card-text mb-1"><small className="text-muted">Edad:</small> {m.edad}</p>
                                <p className="card-text"><small className="text-muted">Raza:</small> {m.raza}</p>
                            </div>

                            
                            <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between gap-2 pb-3">
                                <Link className="btn btn-outline-info btn-sm" to={`${m.id}`}>
                                    Ver
                                </Link>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(m)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarMascota(m.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MascotasList;