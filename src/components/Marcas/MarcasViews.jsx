import { Fragment, useRef, useState } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const MarcasView = ({ loadingData, data }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const toast = useRef(null);
    const navigate = useNavigate();

    const [editMarca, setEditMarca] = useState(null);
    const [openDialogEditMarca, setOpenDialogEditMarca] = useState(false);

    const bodyActivo = (rowData) => {
        return rowData.activo ? <span>Activo</span> : <span>Inactivo</span>;
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    className="custom-button-modificar"
                    onClick={() => handleEditMarca(rowData)}
                />
                <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    className="custom-button-eliminar"
                    onClick={() => confirmDeleteMarca(rowData)}
                />
            </div>
        );
    };

    const ValidationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required("Este campo es requerido")
            .max(50, "El nombre no debe ser mayor a 50 caracteres"),
    });

    const handleEditMarca = (rowData) => {
        setEditMarca(rowData);
        setOpenDialogEditMarca(true);
    };

    const onEditMarca = async (values) => {
        const bodyEditMarca = {
            nombre: values.nombre,
        };

        const response = await fetch(`http://127.0.0.1:5000/marca/${editMarca.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyEditMarca),
        });

        if (response.ok) {
            toast.current.show({ severity: "success", summary: "Marca Actualizada", detail: "La marca ha sido actualizada", life: 3000 });
            setOpenDialogEditMarca(false);
        } else {
            toast.current.show({ severity: "error", summary: "Error", detail: "Error al actualizar la marca", life: 3000 });
        }
    };

    const confirmDeleteMarca = (marca) => {
        confirmDialog({
            message: "¿Estás seguro de eliminar esta marca?",
            header: "Confirmación de Eliminación",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => onDeleteMarca(marca),
            reject: () => toast.current.show({ severity: "info", summary: "Cancelado", detail: "Operación cancelada", life: 3000 })
        });
    };

    const onDeleteMarca = async (marca) => {
        const response = await fetch(`http://127.0.0.1:5000/marca/${marca.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            toast.current.show({ severity: "success", summary: "Marca Eliminada", detail: "La marca ha sido eliminada", life: 3000 });
        } else {
            toast.current.show({ severity: "error", summary: "Error", detail: "Error al eliminar la marca", life: 3000 });
        }
    };

    return (
        <Fragment>
            <h1>Marcas</h1>
            <Button
                label="Agregar nueva marca"
                icon="pi pi-plus"
                onClick={() => navigate("/nueva-marca")}
            />
            {loadingData ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="activo" body={bodyActivo} header="Estado"></Column>
                    <Column body={bodyActions} header="Acciones"></Column>
                </DataTable>
            )}
            <Toast ref={toast} />
            <ConfirmDialog />

            <Dialog
                visible={openDialogEditMarca}
                onHide={() => setOpenDialogEditMarca(false)}
                header="Editar Marca"
            >
                <Formik
                    initialValues={{
                        nombre: editMarca ? editMarca.nombre : ""
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={onEditMarca}
                    enableReinitialize
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit} style={{ display: "inline-grid" }}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.nombre}
                            />
                            {errors.nombre && touched.nombre && <div>{errors.nombre}</div>}
                            <Button label="Guardar Cambios" type="submit" disabled={!values.nombre || errors.nombre} />
                        </form>
                    )}
                </Formik>
            </Dialog>
        </Fragment>
    );
};

export default MarcasView;
