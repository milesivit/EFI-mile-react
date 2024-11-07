import { Fragment, useRef } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const MarcasView = ({ loadingData, data }) => {
    const toast = useRef(null);
    const navigate = useNavigate();

    const bodyActivo = (rowData) => {
        return (
            rowData.activo ? <span>Activo</span> : <span>Inactivo</span>
        );
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                {/* Modificar marca seleccionada sin ID */}
                <Button label="Modificar" icon="pi pi-pencil" className="custom-button-modificar" onClick={() => navigate(`/modificar-marca/${rowData.id}`)} />
                <Button label="Eliminar" icon="pi pi-trash" className="custom-button-eliminar" onClick={deleteUser} />
            </div>
        );
    };

    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Eliminaste la marca', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Denegado', detail: 'Cancelaste la eliminacion', life: 3000 });
    }

    const deleteUser = () =>{
        confirmDialog({
            message: 'Estas seguro de eliminar este usuario?',
            header: 'Eliminar usuario',
            rejectLabel: 'No',
            acceptLabel: 'Si',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });

    }

    return (
        <Fragment>
            <h1>Marcas</h1>
            <Button
                label="Agregar nueva marca"
                icon="pi pi-plus"
                onClick={() => navigate("/nueva-marca")}
            />
            {loadingData ?
                <ProgressSpinner /> :
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="activo" body={bodyActivo} header="Estado"></Column>
                    <Column body={bodyActions} header="Acciones"></Column>
                </DataTable>
            }
            <Toast ref={toast} />
            <ConfirmDialog />
        </Fragment>
    );
};

export default MarcasView;
