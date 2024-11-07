import { Fragment, useRef } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

const ProveedoresView = ({ loadingData, data }) => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const bodyActivo = (rowData) => {
        return rowData.activo ? <span>Activo</span> : <span>Inactivo</span>;
    };

    return (
        <Fragment>
            <h1>Proveedores</h1>
            {loadingData ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="telefono" header="Telefono"></Column>
                    <Column field="direccion" header="Direccion"></Column>
                    <Column field="correo_electronico" header="Correo"></Column>
                    <Column field="activo" body={bodyActivo} header="Estado"></Column>
                </DataTable>
            )}
            <Toast ref={toast} />
        </Fragment>
    );
};

export default ProveedoresView;