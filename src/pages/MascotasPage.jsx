import MascotasList from "../components/mascotas/MascotasList";
import { useEffect, useState } from "react";
import mascotasApi from "../api/api";
import { Outlet } from "react-router-dom";

function MascotasPage() {
    const [mascotasList, setMascotasList] = useState([]);
    const [error, setError] = useState(null);

    const fetchMascotas = async () => {
        try {
            const response = await mascotasApi.get('mascotas/');
            console.log(response.data);
            setMascotasList(response.data);
            setError(null);
        } catch (error) {
            console.log(error);
            if (error.response?.status === 404) {
                setError('Recurso no encontrado');
            } else {
                setError('Error al cargar las mascotas');
            }
        }
    }

    const addMascotas = async (mascota) => {
        try {
            const response = await mascotasApi.post('mascotas/', mascota);
            console.log(response);
            setError(null);
        } catch (error) {
            console.log(error);
            if (error.response?.status === 400) {
                const detalle = error.response?.data;
                const mensajes = Object.entries(detalle)
                    .map(([campo, msgs]) => `${campo}: ${msgs.join(', ')}`)
                    .join(' | ');
                setError(`Error de validación: ${mensajes}`);
            } else {
                setError('Error al crear la mascota');
            }
        } finally {
            fetchMascotas();
        }
    }

    useEffect(() => {
        fetchMascotas();
    }, [])

    return (
        <>
            <h1>Pagina Mascotas</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <MascotasList lista={mascotasList} onAdd={addMascotas} onChange={fetchMascotas} />

            <Outlet />
        </>
    )
}

export default MascotasPage;