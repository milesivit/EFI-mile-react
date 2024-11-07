import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const EditMarca = ({ marcaId }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [marcaData, setMarcaData] = useState(null);

  // Cargar datos de la marca
  useEffect(() => {
    const fetchMarca = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/marca/${marcaId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Datos de la marca:", data); // Verificar los datos
          setMarcaData(data);
        } else {
          console.error("Error al obtener los datos de la marca");
        }
      } catch (error) {
        console.error("Error al obtener los datos de la marca:", error);
      }
    };

    fetchMarca();
  }, [marcaId, token]);

  // Función para actualizar la marca
  const updateMarca = async (values) => {
    const bodyUpdateMarca = {
      nombre: values.nombre,
      activo: values.activo,
    };

    try {
      const response = await fetch(`http://127.0.0.1:5000/marca/${marcaId}`, {
        method: "PUT",
        body: JSON.stringify(bodyUpdateMarca),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Marca actualizada exitosamente:", data);
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar la marca:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Validación de formulario
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por favor ingrese un nombre")
      .min(4, "El nombre debe tener al menos 4 caracteres")
      .max(255, "El nombre es demasiado largo"),
    activo: Yup.boolean(),
  });

  if (!marcaData) {
    console.log("Cargando datos de la marca...");
    return <div>Cargando...</div>;
  }

  return (
    <Formik
      initialValues={{
        nombre: marcaData?.nombre || "",
        activo: marcaData?.activo || false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => updateMarca(values)}
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
            <label htmlFor="nombre">Nombre de la Marca</label>
            <Field
              type="text"
              name="nombre"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nombre}
              className="form-control"
            />
            <ErrorMessage name="nombre" component="div" className="text-danger" />
          </div>

          <div>
            <label htmlFor="activo">¿Está activa?</label>
            <Field
              type="checkbox"
              name="activo"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.activo} // Corregir para checkbox
              className="form-control"
            />
            <ErrorMessage name="activo" component="div" className="text-danger" />
          </div>

          <button
            type="submit"
            disabled={values.nombre === "" || !isValid}
            className="btn btn-primary mt-3"
          >
            Actualizar Marca
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditMarca;
