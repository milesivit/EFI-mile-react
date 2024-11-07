import { useState, useEffect } from "react";
import ClientesView from "./ClientesViews";

const ClienteContainer = () => {
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const token = JSON.parse(localStorage.getItem('token'));

    const getDataClientes = async () => {
        try {
            const response = await fetch("http://localhost:5000/clientes", {
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
        getDataClientes();
    }, []);

    return (
        <ClientesView loadingData={loadingData} data={data} />
    );
};

export default ClienteContainer;
