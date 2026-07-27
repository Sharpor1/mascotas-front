import { useParams } from "react-router-dom";
import mascotasApi from "../../api/api";
import { useEffect, useState } from "react";
import Comentarios from "../comentarios/Comentarios";

function MascotasDetail() {
    const { id } = useParams();
    console.log(id);
    const [fetchError, setFetchError] = useState(false);
    const [mascota, setMascota] = useState(null);

    const fetchMascotaDetail = async () => {
        try {
            const response = await mascotasApi.get(`mascotas/${id}/`);
            console.log(response.data);
            setMascota(response.data);
            setFetchError(false);
            
        } catch (error) {
            console.log(error);
            setFetchError(true);
        }
    }

    useEffect(() => {
        fetchMascotaDetail();
    }, [id]);

    return (
        <div>
            {fetchError ? (
                <p>404 - Mascota no encontrada</p>
            ) : (
                <>
                    <h2>{mascota?.nombre}</h2>
                    <img src={mascota?.imagen} alt={mascota?.nombre} />
                    <p>{mascota?.descripcion}</p>
                    <p>Edad: {mascota?.edad}</p>
                    <p>Raza: {mascota?.raza}</p>
                    <Comentarios
                        mascotaId={id}
                        comentarios={mascota?.comentarios}
                        onRefresh={fetchMascotaDetail}
                    />
                </>
            )}
        </div>
    )
}

export default MascotasDetail;