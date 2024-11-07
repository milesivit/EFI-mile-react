import { Fragment, useRef } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

const EquiposView = ({ loadingData, data }) => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const bodyActivo = (rowData) => {
        return rowData.activo ? <span>Inactivo</span> : <span>Activo</span>;
    };


    return (
        <Fragment>
            <h1>Equipos</h1>
            {loadingData ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="categoria.nombre" header="Categoria"></Column>
                    <Column field="marca.nombre" header="Marca"></Column>
                    <Column field="modelo.nombre" header="Modelo "></Column>
                    <Column field="accesorio.cargador" header="Cargador"></Column>
                    <Column field="accesorio.auriculares" header="Auriculares"></Column>
                    <Column field="activo" body={bodyActivo} header="Estado"></Column>
                </DataTable>
            )}
            <Toast ref={toast} />   
        </Fragment>
    );
};

export default EquiposView;
