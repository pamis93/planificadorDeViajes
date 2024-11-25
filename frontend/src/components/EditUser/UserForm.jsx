import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const UserForm = ({ onSubmit }) => {
  // Obtiene el estado del contexto de usuario con useUser.
  const [user] = useUser(); 

  // Estado local para almacenar los datos del formulario.
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  // Estado para guardar el ID del usuario.
  const [userId, setUserId] = useState(null); 

  // Estado para controlar qué campos son editables.
  const [editableFields, setEditableFields] = useState({});

  // Estado para indicar si los datos están cargando.
  const [loading, setLoading] = useState(true);

  // Estado para mostrar mensajes (éxito o error).
  const [message, setMessage] = useState({ text: "", type: "" });

  // useEffect para cargar los datos del usuario al montar el componente.
  useEffect(() => {
    const fetchUserData = async () => {
      // Obtiene el token y el email del contexto de usuario.
      const token = user?.token;
      const email = user?.email;

      // Si no hay token o email, muestra un mensaje de error y detiene la carga.
      if (!token || !email) {
        setMessage({ text: "Usuario no autenticado", type: "error" });
        setLoading(false);
        return;
      }

      try {
        // Llama a la API para obtener los datos del perfil del usuario.
        const response = await fetch("http://localhost:3001/users/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ email }), // Envia el email en el cuerpo de la solicitud.
        });

        if (response.ok) {
          // Si la respuesta es exitosa, parsea los datos y actualiza el estado.
          const userData = await response.json();
          setUserId(userData.id); // Guarda el ID del usuario.
          setFormData({
            name: userData.name || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            email: userData.email || "",
            password: "", // Nunca se muestra la contraseña por seguridad.
          });
          setLoading(false); // Detiene la carga.
        } else {
          // Maneja errores de la API.
          const errorData = await response.json();
          setMessage({ text: errorData.message || "Error al obtener datos", type: "error" });
          setLoading(false);
        }
      } catch {
        // Maneja errores de conexión.
        setMessage({ text: "Error al conectar con el servidor", type: "error" });
        setLoading(false);
      }
    };

    fetchUserData(); // Llama a la función al montar el componente.
  }, [user]); // Se ejecuta cuando cambia el usuario en el contexto.

  // Maneja los cambios en los campos del formulario.
  const handleInputChange = (e) => {
    setFormData({
      ...formData, // Copia el estado actual.
      [e.target.name]: e.target.value, // Actualiza solo el campo que cambió.
    });
  };

  // Alterna si un campo es editable o no.
  const handleEditClick = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field], // Cambia entre true y false para el campo especificado.
    }));
  };

  // Maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario.

    if (!userId) {
      // Si no hay un ID de usuario, muestra un error.
      setMessage({ text: "Usuario no autenticado", type: "error" });
      return;
    }

    try {
      const token = user?.token;
      if (!token) {
        // Si no hay un token válido, muestra un error.
        setMessage({ text: "Token no disponible, vuelva a iniciar sesión", type: "error" });
        return;
      }

      // Llama a la API para actualizar los datos del usuario.
      const response = await fetch(`http://localhost:3001/users/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData), // Envía los datos del formulario como JSON.
      });

      if (response.ok) {
        // Si la respuesta es exitosa, muestra un mensaje de éxito.
        setMessage({ text: "Datos actualizados correctamente", type: "success" });
        onSubmit(formData); // Llama a la función onSubmit si se pasa desde el padre.
      } else {
        // Maneja errores de la API.
        const errorData = await response.json();
        setMessage({ text: errorData.message || "Error al actualizar los datos", type: "error" });
      }
    } catch {
      // Maneja errores de conexión.
      setMessage({ text: "Error al conectar con el servidor", type: "error" });
    }
  };

  // Si los datos están cargando, muestra un mensaje.
  if (loading) {
    return <p className="text-white text-center">Cargando datos...</p>;
  }

  // Renderiza el formulario.
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {["name", "lastName", "username", "email", "password"].map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <label htmlFor={field} className="text-white text-sm font-bold">
            {field.charAt(0).toUpperCase() + field.slice(1)} {/* Capitaliza el nombre del campo */}
          </label>
          <div className="flex items-center">
            <input
              type={field === "password" ? "password" : "text"} // El campo password es de tipo "password".
              id={field}
              name={field}
              value={formData[field]} // Muestra el valor del estado.
              onChange={handleInputChange} // Maneja los cambios del input.
              readOnly={!editableFields[field]} // Solo es editable si está habilitado.
              className={`px-12 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none ${
                editableFields[field] ? "focus:ring-2 focus:ring-[#000000]" : "cursor-not-allowed"
              }`}
            />
            <button
              type="button"
              onClick={() => handleEditClick(field)} // Alterna el modo editable.
              className="ml-3 text-blue-500 hover:text-blue-300"
            >
              ✏
            </button>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="px-5 py-2 bg-green-600 text-white font-bold text-sm rounded-lg hover:bg-green-400"
      >
        Guardar Cambios
      </button>

      {/* Muestra el mensaje si hay alguno */}
      {message.text && (
        <p
          className={`text-sm font-bold mt-2 ${
            message.type === "success" ? "text-green-400" : "text-red-400"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

export default UserForm;
