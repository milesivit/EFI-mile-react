import { useState, useEffect } from "react";
import ModelosView from "./ModeloView";

const ModeloContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataModelos = async () => {
        try {
            const response = await fetch("http://localhost:5000/modelo", {
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
        getDataModelos();
    }, []);

    return (
        <ModelosView loadingData={loadingData} data={data} />
    );
};

export default ModeloContainer;
