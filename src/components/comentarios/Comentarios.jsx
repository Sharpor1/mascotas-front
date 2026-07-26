import { useState, useEffect } from "react";
import mascotasApi from "../../api/api";

function Comentarios({ mascotaId }) {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [autor, setAutor] = useState("");
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {  
                const response = await mascotasApi.get(`mascotas/${mascotaId}/comentarios/`);
                setComentarios(response.data.comentarios || []);
            } catch (error) {
                const status = error.response?.status;
                console.error("Error fetching comentarios:", status, error.response?.data);
            