import { useState, useEffect } from "react";
import EquiposView from "./EquipoView";

const EquipoContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataEquipos = async () => {
        try {
            const response = await fetch("http://localhost:5000/equipos", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                console.log("Error en la consulta");
                return;
            }
            const data = await response.json();
            setData(data);
        } catch {
            console.log("Error en la API");
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getDataEquipos();
    }, []);

    return (
        <EquiposView loadingData={loadingData} data={data} />
    );
};

export default EquipoContainer;
