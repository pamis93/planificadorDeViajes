import { useState, useEffect } from "react";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Asegúrate de guardar el ID del usuario en el almacenamiento local.

        if (!token || !userId) {
          setMessage({ text: "Usuario no autenticado", type: "error" });
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData({
            name: userData.name || "",
            lastname: userData.lastname || "",
            username: userData.username || "",
            email: userData.email || "",
            password: "", // No mostramos la contraseña
          });
          setLoading(false);
        } else {
          const errorData = await response.json();
          setMessage({ text: errorData.message || "Error al obtener datos", type: "error" });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setMessage({ text: "Error al conectar con el servidor", type: "error" });
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        setMessage({ text: "Usuario no autenticado", type: "error" });
        return;
      }

      const response = await fetch(`http://localhost:3001/users/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Datos actualizados correctamente", type: "success" });
        onSubmit(formData); // Llama al callback con los nuevos datos
      } else {
        setMessage({ text: data.message || "Error al actualizar los datos", type: "error" });
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMessage({ text: "Error al conectar con el servidor", type: "error" });
    }
  };

  if (loading) {
    return <p className="text-white text-center">Cargando datos...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-white text-sm font-bold">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastname" className="text-white text-sm font-bold">
          Apellido
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          className="px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-white text-sm font-bold">
          Nombre de Usuario
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white text-sm font-bold">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-white text-sm font-bold">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Ingresa una nueva contraseña"
          className="px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
        />
      </div>

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
