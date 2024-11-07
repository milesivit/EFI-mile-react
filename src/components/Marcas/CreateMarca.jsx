import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useState } from 'react';

const CreateMarca = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const [loading, setLoading] = useState(false);  // Para mostrar carga mientras creamos la marca
    const [error, setError] = useState(null);  // Para manejar errores

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const body = {
            nombre: values.nombre,
            activo: values.activo || true,  // Si no se especifica, activo será true por defecto
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/marca', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Marca creada exitosamente:', data);
                // Limpiar el formulario después de la creación
                resetForm();  // Esto vacía los campos del formulario
            } else {
                const errorData = await response.json();
                console.error('Error al crear la marca:', errorData);
                setError('Hubo un error al crear la marca.');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error en la solicitud, por favor intente de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{ nombre: '', activo: true }}  // Valores iniciales
            validationSchema={Yup.object({
                nombre: Yup.string()
                    .required('El nombre es obligatorio')
                    .min(3, 'El nombre debe tener al menos 3 caracteres'),
            })}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                handleSubmit,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre de la marca</label>
                        <Field
                            type="text"
                            name="nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
                        />
                        <ErrorMessage name="nombre" component="div" style={{ color: 'red' }} />
                    </div>
                    

                    <button
                        type="submit"
                        disabled={values.nombre === '' || !isValid || loading}
                    >
                        {loading ? 'Cargando...' : 'Crear Marca'}
                    </button>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </form>
            )}
        </Formik>
    );
};

export default CreateMarca;
