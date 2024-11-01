import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

const CreateUser = () => {

    const token= JSON.parse(localStorage.getItem('token'))

    const RegisterUser = async (values) => {
        const bodyRegisterUser = {
            username: values.username,
            password: values.password,
        };

        console.log("bodyRegisterUser", bodyRegisterUser);

        const response = await fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            body: JSON.stringify(bodyRegisterUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(response);
    };

    const ValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Pelotudito')
            .min(4, 'Idiota'),
        username: Yup.string()
            .min(4, 'Infradotado')
            .max(255, 'Retrasado')
            .required('Inutil')
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
                            onClick={() => RegisterUser(values)} 
                            disabled={values.username === '' || values.password === '' || !isValid}
                        >
                            Aceptar
                        </button>
                    </form>
                </>
            )}
        </Formik>
    );
}

export default CreateUser;
