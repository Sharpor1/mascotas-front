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
        <div className="container my-4">
            {fetchError ? (
                
                <div className="alert alert-danger text-center p-5 shadow-sm rounded-4" role="alert">
                    <h1 className="display-4 fw-bold">404</h1>
                    <p className="fs-5">Mascota no encontrada o ha sido eliminada.</p>
                </div>
            ) : (
                <div className="row g-4">
                    
                    <div className="col-lg-7">
                        <div className="card shadow-sm border-0 mb-4 overflow-hidden">
                            {mascota?.imagen ? (
                                <img 
                                    src={mascota.imagen} 
                                    alt={mascota.nombre} 
                                    className="card-img-top img-fluid"
                                    style={{ maxHeight: '450px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div className="bg-secondary text-white text-center py-5">
                                    Sin imagen disponible
                                </div>
                            )}
                        </div>

                        
                        <div className="card shadow-sm border-0 p-4">
                            <h4 className="fw-bold mb-3">Comentarios</h4>
                            <Comentarios
                                mascotaId={id}
                                comentarios={mascota?.comentarios}
                                onRefresh={fetchMascotaDetail}
                            />
                        </div>
                    </div>

                    
                    <div className="col-lg-5">
                        <div className="card shadow-sm border-0 p-4 sticky-lg-top" style={{ top: '20px' }}>
                            <h1 className="fw-bold display-6 mb-3 text-primary">
                                {mascota?.nombre}
                            </h1>

                            <div className="mb-4">
                                <h5 className="text-muted fw-bold mb-2">Sobre {mascota?.nombre}</h5>
                                <p className="card-text text-secondary lead fs-6">
                                    {mascota?.descripcion || "Sin descripción proporcionada."}
                                </p>
                            </div>

                            <hr className="my-3 text-muted" />

                            
                            <div className="row g-3 mb-4">
                                <div className="col-6">
                                    <div className="p-3 bg-light rounded-3 text-center">
                                        <span className="d-block text-muted small fw-bold">EDAD</span>
                                        <span className="fs-5 fw-semibold text-dark">{mascota?.edad}</span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-3 bg-light rounded-3 text-center">
                                        <span className="d-block text-muted small fw-bold">RAZA</span>
                                        <span className="fs-5 fw-semibold text-dark">{mascota?.raza}</span>
                                    </div>
                                </div>
                            </div>

                            
                            <ul className="list-group list-group-flush mb-4">
                                {mascota?.estado && (
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">Estado</span>
                                        <span className="badge bg-info rounded-pill">{mascota.estado}</span>
                                    </li>
                                )}
                                {mascota?.tipo_animal && (
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">Tipo</span>
                                        <span className="fw-semibold">{mascota.tipo_animal}</span>
                                    </li>
                                )}
                                {mascota?.sexo && (
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">Sexo</span>
                                        <span className="fw-semibold">{mascota.sexo}</span>
                                    </li>
                                )}
                                {mascota?.tamano && (
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        <span className="text-muted">Tamaño</span>
                                        <span className="fw-semibold">{mascota.tamano}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MascotasDetail;