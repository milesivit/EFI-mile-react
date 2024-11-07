import { useState, useEffect } from "react";
import MarcasView from "./MarcasViews";

const MarcaContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataMarcas = async () => {
        try {
            const response = await fetch("http://localhost:5000/marca", {
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
        getDataMarcas();
    }, []);

    return (
        <MarcasView loadingData={loadingData} data={data} />
    );
};

export default MarcaContainer;
