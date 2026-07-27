import { useEffect, useState } from "react";
import mascotasApi from "../../api/api";

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
        <form class="mb-3" onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Nombre:
                <input class="form-control form-control-lg"
                placeholder="Spike"
                aria-label=".form-control-lg example"
                type="text"
                value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>

            <label>Descripcion:
                <textarea class="form-control form-control-lg"
                placeholder="Pelaje rubio"
                aria-label=".form-control-lg example"
                value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
            </label>

            <label>Edad:
                <input class="form-control form-control-lg" placeholder="2 años"
                aria-label=".form-control-lg example"
                type="number"
                value={edad} onChange={(e) => setEdad(e.target.value)} />
            </label>

            <label>Raza:
                <input class="form-control form-control-lg"
                placeholder="Golden Retriever"
                aria-label=".form-control-lg example"
                type="text"
                value={raza} onChange={(e) => setRaza(e.target.value)} />
            </label>

            <label>Estado:
                <select
                class="form-select"
                aria-label="Default select example"
                value={selectedEstado} onChange={(e) => setEstado(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        estados.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label>Tipo Animal:
                <select class="form-select"
                aria-label="Default select example"
                value={selectedTipoMascota} onChange={(e) => setTipoMascotaSeleccionada(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        tipoMascota.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label>Sexo:
                <select class="form-select"
                aria-label="Default select example"
                value={selectedSexo} onChange={(e) => setSexoSeleccionado(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        sexo.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>
            
            <label>Tamaño:
                <select class="form-select"
                aria-label="Default select example"
                value={selectedTamano} onChange={(e) => setTamanoSeleccionado(e.target.value)}>
                    <option value={""} >Sin estado</option>
                    {
                        tamano.map(e => <option value={e.value} key={e.value}>{e.label}</option>)
                    }
                </select>
            </label>

            <label for="formFile" class="form-label">Imagen:
                <input class="form-control"
                type="file"
                id="formFile"
                key={fileKey}
                type="file" onChange={(e) => setImagen(e.target.files[0])} />
            </label>

            <button type="submit">{mascota ? "Actualizar" : "Guardar"}</button>
            
            {mascota && <button type="button" onClick={onCancel}>Cancelar</button>}

        </form>
    )
}

export default MascotasForm;