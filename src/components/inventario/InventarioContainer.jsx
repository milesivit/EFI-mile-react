import { useState, useEffect } from "react";
import InventarioView from "./InventarioView";

const InventarioContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataInventario = async () => {
        try {
            const response = await fetch("http://localhost:5000/inventarios", {
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
        getDataInventario();
    }, []);

    return (
        <InventarioView loadingData={loadingData} data={data} />
    );
};

export default InventarioContainer;
