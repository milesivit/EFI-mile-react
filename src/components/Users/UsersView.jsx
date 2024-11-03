import { Fragment, useRef } from "react"
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
        

const UsersView = ({loadingData, data}) => {

    const toast = useRef(null)

    const bodyIsAdmin = (rowData) => {
        return(
            rowData.is_admin ? <span>Si</span> : <span>No</span> 
        )
    }

    const bodyActions = (rowData) =>{
        return(
            <div>
                <Button label='Modificar' icon='pi pi-pencil' className="custom-button-modificar" />
                <Button label='Eliminar' icon='pi pi-trash' className="custom-button-eliminar" onClick={() => deleteUser()} />
            </div>
        )
    }

    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Confirmado', detail: 'Eliminaste el usuario', life: 3000 });
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

    return(
        <Fragment>
            <h1>Usuarios</h1>
            <Button label="Agregar nuevo usuario" con='pi pi-user-plus'/>
        {loadingData ? 
        <ProgressSpinner/> 
        :
        <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
            <Column field="username" header="Nombre de usuario"></Column>
            <Column field="is_admin" body={bodyIsAdmin} header="¿Es administrador?"></Column>
            <Column body={bodyActions} header="Acciones"></Column>
        </DataTable>
        }
        <Toast ref={toast} />
        <ConfirmDialog />
    </Fragment>
    )
}
export default UsersView