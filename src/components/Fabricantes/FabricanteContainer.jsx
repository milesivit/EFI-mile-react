import { useState, useEffect } from "react";
import FabricantesView from "./FabricanteView";

const FabricanteContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataFabricantes = async () => {
        try {
            const response = await fetch("http://localhost:5000/fabricante", {
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
        getDataFabricantes();
    }, []);

    return (
        <FabricantesView loadingData={loadingData} data={data} />
    );
};

export default FabricanteContainer;
