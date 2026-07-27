import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';

function MascotasForm({ onAdd, mascota, onUpdate, onCancel }) {
    const [estados, setEstados] = useState([]);
    const [tipoMascota, setTipoMascota] = useState([]);
    const [sexo, setSexo] = useState([]);
    const [tamano, setTamano] = useState([]);

    const [nombre, setNombre] = useState(mascota?.nombre ?? "");
    const [descripcion, setDescripcion] = useState(mascota?.descripcion ?? "");
    const [edad, setEdad] = useState(mascota?.edad ?? "");
    const [raza, setRaza] = useState(mascota?.raza ?? "");
    const [selectedEstado, setEstado] = useState(mascota?.estado ?? "");
    const [selectedTipoMascota, setTipoMascotaSeleccionada] = useState(mascota?.tipo_animal ?? "");
    const [selectedSexo, setSexoSeleccionado] = useState(mascota?.sexo ?? "");
    const [selectedTamano, setTamanoSeleccionado] = useState(mascota?.tamano ?? "");
    const [imagen, setImagen] = useState(null);
    const [fileKey, setFileKey] = useState(0);

    const fetchChoices = async () => {
        try {
            const response = await mascotasApi.get("choices/");
            console.log(response.data.estado);
            setEstados(response.data.estado);
            setTipoMascota(response.data.tipo_animal);
            setSexo(response.data.sexo);
            setTamano(response.data.tamano);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchChoices();
    }, [])

    const resetForm = () => {
        setNombre("");
        setDescripcion("");
        setEdad("");
        setRaza("");
        setEstado("");
        setTipoMascotaSeleccionada("");
        setSexoSeleccionado("");
        setTamanoSeleccionado("");
        setImagen(null);
        setFileKey(prev => prev + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("edad", edad);
        formData.append("raza", raza);
        formData.append("estado", selectedEstado);
        formData.append("tipo_animal", selectedTipoMascota);
        formData.append("sexo", selectedSexo);
        formData.append("tamano", selectedTamano);
        if (imagen) {
            formData.append("imagen", imagen);
        }

        if (mascota && onUpdate) {
            onUpdate(mascota.id, formData);
            onCancel();
        } else {
            onAdd(formData);
            resetForm();
        }
    }

    return (
        <div className="container my-4">
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
                <div className="card-header">
                    <h4 className="card-title mb-0">
                        {mascota ? "Editar Mascota" : "Registrar Mascota"}
                    </h4>
                </div>
                
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row g-3">
                            
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Nombre:</label>
                                <input 
                                    className="form-control"
                                    placeholder="Spike"
                                    type="text"
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                />
                            </div>

                            
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Edad:</label>
                                <input 
                                    className="form-control" 
                                    placeholder="Ej: 2"
                                    type="number"
                                    value={edad} 
                                    onChange={(e) => setEdad(e.target.value)} 
                                />
                            </div>

                            
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Raza:</label>
                                <input 
                                    className="form-control"
                                    placeholder="Golden Retriever"
                                    type="text"
                                    value={raza} 
                                    onChange={(e) => setRaza(e.target.value)} 
                                />
                            </div>

                            
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Estado:</label>
                                <select
                                    className="form-select"
                                    value={selectedEstado} 
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value="">Sin estado</option>
                                    {estados.map(e => (
                                        <option value={e.value} key={e.value}>{e.label}</option>
                                    ))}
                                </select>
                            </div>

                            
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Tipo Animal:</label>
                                <select 
                                    className="form-select"
                                    value={selectedTipoMascota} 
                                    onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}
                                >
                                    <option value="">Seleccionar</option>
                                    {tipoMascota.map(e => (
                                        <option value={e.value} key={e.value}>{e.label}</option>
                                    ))}
                                </select>
                            </div>

                            
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Sexo:</label>
                                <select 
                                    className="form-select"
                                    value={selectedSexo} 
                                    onChange={(e) => setSexoSeleccionado(e.target.value)}
                                >
                                    <option value="">Seleccionar</option>
                                    {sexo.map(e => (
                                        <option value={e.value} key={e.value}>{e.label}</option>
                                    ))}
                                </select>
                            </div>

                            
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Tamaño:</label>
                                <select 
                                    className="form-select"
                                    value={selectedTamano} 
                                    onChange={(e) => setTamanoSeleccionado(e.target.value)}
                                >
                                    <option value="">Seleccionar</option>
                                    {tamano.map(e => (
                                        <option value={e.value} key={e.value}>{e.label}</option>
                                    ))}
                                </select>
                            </div>

                            
                            <div className="col-12">
                                <label className="form-label fw-semibold">Descripción:</label>
                                <textarea 
                                    className="form-control"
                                    rows="3"
                                    placeholder="Pelaje rubio, juguetón..."
                                    value={descripcion} 
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>

                            
                            <div className="col-12">
                                <label htmlFor="formFile" className="form-label fw-semibold">Imagen:</label>
                                <input 
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    key={fileKey}
                                    onChange={(e) => setImagen(e.target.files[0])} 
                                />
                            </div>

                            
                            <div className="col-12 d-flex gap-2 justify-content-end mt-4">
                                {mascota && (
                                    <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
                                        Cancelar
                                    </button>
                                )}
                                <button className="btn btn-success px-4" type="submit">
                                    {mascota ? "Actualizar" : "Guardar"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MascotasForm;