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
            <h2>Lista mascotas</h2>

            {error && <p>{error}</p>}

            <MascotasForm onAdd={onAdd} />

            {editarMascota && (
                <MascotasForm
                key={editarMascota.id}
                mascota={editarMascota}
                onUpdate={handleUpdateMascota}
                onCancel={handleCancelEdit}
                />
            )}

            {
                lista.map(m =>
                (
                    <div key={m.id}>
                        <h3>{m.nombre}</h3>
                        <img src={m.imagen} alt={m.nombre} />
                        <p>{m.descripcion}</p>
                        <p>Edad: {m.edad}</p>
                        <p>Raza: {m.raza}</p>
                        <Link to={`${m.id}`}>Ver mascota</Link>
                        <button onClick={() => handleEdit(m)}>Editar</button>
                        <button onClick={() => handleEliminarMascota(m.id)}>Eliminar</button>

                    </div>
                )
                )

            }
           
        </>
    )
}

export default MascotasList;