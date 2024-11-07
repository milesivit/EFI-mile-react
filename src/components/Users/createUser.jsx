import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const CreateUser = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    const RegisterUser = async (values, resetForm) => {
        const bodyRegisterUser = {
            nombre_usuario: values.username,
            password: values.password,
        };

        console.log("bodyRegisterUser", bodyRegisterUser);

        try {
            const response = await fetch('http://127.0.0.1:5000/users', {
                method: 'POST',
                body: JSON.stringify(bodyRegisterUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Usuario creado exitosamente:', data);
                
                // Limpiar los campos del formulario después de crear el usuario
                resetForm();
            
            } else {
                const errorData = await response.json();
                console.error('Error al crear el usuario:', errorData);
                
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            
        }
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Por favor ingrese una contraseña')
            .min(4, 'La contraseña debe tener al menos 4 caracteres'),
        username: Yup.string()
            .min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
            .max(255, 'El nombre de usuario es demasiado largo')
            .required('Por favor ingrese un nombre de usuario')
    });

    return (
        <Formik
            initialValues={{ password: '', username: '' }}
            validationSchema={ValidationSchema}
            onSubmit={(values, { resetForm }) => RegisterUser(values, resetForm)}  // Pasamos resetForm
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
                <form onSubmit={handleSubmit}>  {/* Asegúrate de que esta es la forma correcta */}
                    <div>
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && (
                            <div style={{ color: 'red' }}>{errors.username}</div>
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && (
                            <div style={{ color: 'red' }}>{errors.password}</div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={values.username === '' || values.password === '' || !isValid}
                    >
                        Aceptar
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default CreateUser;
