import { useState, useEffect } from "react";
import ProveedoresView from "./ProveedorView";

const ProveedorContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataProveedores = async () => {
        try {
            const response = await fetch("http://localhost:5000/proveedor", {
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
        getDataProveedores();
    }, []);

    return (
        <ProveedoresView loadingData={loadingData} data={data} />
    );
};

export default ProveedorContainer;
