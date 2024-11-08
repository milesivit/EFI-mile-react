import { Fragment, useState, useRef } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ToggleButton } from "primereact/togglebutton";
import { Formik } from "formik";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";

const UsersView = ({ loadingData, data }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const toast = useRef(null);
    const navigate = useNavigate();

    const [openDialogEditUser, setOpenDialogEditUser] = useState(false);
    const [editUser, setEditUser] = useState({});

    const bodyIsAdmin = (rowData) => {
        return rowData.is_admin ? <span>Si</span> : <span>No</span>;
    };

    const bodyActions = (rowData) => {
        return (
            <div>
                <Button 
                    label="Editar" 
                    icon="pi pi-pencil" 
                    className="custom-button-modificar"
                    onClick={() => (setEditUser(rowData), setOpenDialogEditUser(true))} 
                />
                <Button 
                    label="Eliminar" 
                    icon="pi pi-trash" 
                    className="custom-button-eliminar"
                    onClick={() => confirmDeleteUser(rowData)} 
                />
            </div>
        );
    };

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Este campo es requerido")
            .max(50, "El nombre de usuario no debe ser mayor a 50 caracteres"),
    });

    const onEditUser = async (values) => {
        const bodyEditUser = {
            nombre_usuario: values.username,
            is_admin: values.is_admin,
        };

        const response = await fetch(`http://127.0.0.1:5000/users/${editUser.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bodyEditUser),
        });

        if (response.ok) {
            toast.current.show({ severity: "success", summary: "Usuario Actualizado", detail: "El usuario ha sido actualizado", life: 3000 });
            setOpenDialogEditUser(false);
        } else {
            toast.current.show({ severity: "error", summary: "Error", detail: "Error al actualizar el usuario", life: 3000 });
        }
    };

    const confirmDeleteUser = (user) => {
        confirmDialog({
            message: "¿Estás seguro de eliminar este usuario?",
            header: "Confirmación de Eliminación",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => onDeleteUser(user),
            reject: () => toast.current.show({ severity: "info", summary: "Cancelado", detail: "Operación cancelada", life: 3000 })
        });
    };

    const onDeleteUser = async (user) => {
        const response = await fetch(`http://127.0.0.1:5000/users/${user.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            toast.current.show({ severity: "success", summary: "Usuario Eliminado", detail: "El usuario ha sido eliminado", life: 3000 });
        } else {
            toast.current.show({ severity: "error", summary: "Error", detail: "Error al eliminar el usuario", life: 3000 });
        }
    };

    return (
        <Fragment>
            <h1>Usuarios</h1>
            <Button
                label="Agregar nuevo usuario"
                icon="pi pi-user-plus"
                onClick={() => navigate("/nuevo-usuario")} 
            />
            {loadingData ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
                    <Column field="username" header="Nombre de usuario" />
                    <Column field="is_admin" body={bodyIsAdmin} header="¿Es administrador?" />
                    <Column body={bodyActions} header="Acciones" />
                </DataTable>
            )}
            <Toast ref={toast} />
            <ConfirmDialog />

            <Dialog
                visible={openDialogEditUser}
                onHide={() => setOpenDialogEditUser(false)}
                header="Editar usuario"
            >
                <Formik
                    initialValues={{ username: editUser.username, is_admin: editUser.is_admin }}
                    validationSchema={ValidationSchema}
                    onSubmit={onEditUser}
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
                            <label>Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            {errors.username && touched.username && <div>{errors.username}</div>}
                            <label>¿Es administrador?</label>
                            <ToggleButton
                                name="is_admin"
                                checked={values.is_admin}
                                onChange={(e) => handleChange({ target: { name: "is_admin", value: e.value } })}
                                onLabel="Si"
                                offLabel="No"
                            />
                            <Button label="Modificar usuario" type="submit" disabled={!values.username || errors.username} />
                        </form>
                    )}
                </Formik>
            </Dialog>
        </Fragment>
    );
};

export default UsersView;
