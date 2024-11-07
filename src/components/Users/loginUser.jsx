import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const LoginUser = () => {

    const onLoginUser = async (values, resetForm) => {
        const bodyLoginUser = btoa(`${values.username}:${values.password}`)

        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${bodyLoginUser}`
            }
        })

        if (!response.ok) {
            console.log('error de la solicitud')
        }   

        const data = await response.json()

        localStorage.setItem('token', JSON.stringify(data.Token))

        console.log(data.Token)

        // Limpiar los campos del formulario después de iniciar sesión
        resetForm();
    }

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Este es un campo requerido.')
            .min(4, 'Minimo 4 caracteres.'),
        username: Yup.string()
            .min(4, 'Minimo 4 caracteres.')
            .max(25, 'Máximo 25 caracteres.')
            .required('Este es un campo requerido.')
    });

    return (
        <Formik
            initialValues={{ password: '', username: '' }}
            validationSchema={ValidationSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isValid,
                resetForm,  // Aquí obtenemos el método resetForm
            }) => (
                <>
                    <form>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && errors.username}
                        
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && errors.password}
                        
                        <button 
                            type="button" 
                            onClick={() => onLoginUser(values, resetForm)}  // Llamamos a resetForm
                            disabled={values.username === '' || values.password === '' || !isValid}
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </>
            )}
        </Formik>
    );
}

export default LoginUser;
