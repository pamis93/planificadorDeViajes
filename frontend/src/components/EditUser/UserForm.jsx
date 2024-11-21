import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const UserForm = ({ onSubmit }) => {
  const [user] = useUser(); // Obtiene el estado de userContext
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [userId, setUserId] = useState(null); // Estado para guardar el userId
  const [editableFields, setEditableFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = user?.token;
      const email = user?.email;

      if (!token || !email) {
        setMessage({ text: "Usuario no autenticado", type: "error" });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/users/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id); // Asigna el userId desde userData
          setFormData({
            name: userData.name || "",
            lastName: userData.lastName || "",
            username: userData.username || "",
            email: userData.email || "",
            password: "", // Nunca mostramos contraseñas
          });
          setLoading(false);
        } else {
          const errorData = await response.json();
          setMessage({ text: errorData.message || "Error al obtener datos", type: "error" });
          setLoading(false);
        }
      } catch {
        setMessage({ text: "Error al conectar con el servidor", type: "error" });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]); // Solo se ejecuta si el contexto de `user` cambia

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field], // Alterna entre editable y no editable
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage({ text: "Usuario no autenticado", type: "error" });
      return;
    }

    try {
      const token = user?.token;
      if (!token) {
        setMessage({ text: "Token no disponible, vuelva a iniciar sesión", type: "error" });
        return;
      }

      const response = await fetch(`http://localhost:3001/users/edit/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ text: "Datos actualizados correctamente", type: "success" });
        onSubmit(formData); // Llama a onSubmit si los datos fueron actualizados
      } else {
        const errorData = await response.json();
        setMessage({ text: errorData.message || "Error al actualizar los datos", type: "error" });
      }
    } catch {
      setMessage({ text: "Error al conectar con el servidor", type: "error" });
    }
  };

  if (loading) {
    return <p className="text-white text-center">Cargando datos...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {["name", "lastName", "username", "email", "password"].map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <label htmlFor={field} className="text-white text-sm font-bold">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="flex items-center">
            <input
              type={field === "password" ? "password" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              readOnly={!editableFields[field]} // Controla si el campo es editable
              className={`px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none ${
                editableFields[field] ? "focus:ring-2 focus:ring-[#000000]" : "cursor-not-allowed"
              }`}
            />
            <button
              type="button"
              onClick={() => handleEditClick(field)}
              className="ml-2 text-blue-500 hover:text-blue-300"
            >
              ✏
            </button>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white font-bold text-sm rounded-lg hover:bg-green-400"
      >
        Guardar Cambios
      </button>

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