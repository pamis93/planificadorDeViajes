import { useState } from 'react';
import avatar from '../../assets/avatar.png'; 
import AvatarUpload from './AvatarUpload';

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleAvatarUpdate = (newAvatarUrl) => {
    console.log('Avatar actualizado:', newAvatarUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-black text-2xl font-bold mb-8">
        Configuración de la Cuenta
      </h1>
      <div className="flex flex-row justify-center items-start gap-8">
        {/* Contenedor Foto de perfil */}
        <div className="flex flex-col items-center bg-[#686E9E] p-6 rounded-lg w-[350px] h-[500px]">
          <p className="text-white text-10 font-bold mb-4">Foto de perfil</p>
          <AvatarUpload 
            currentAvatar={avatar}
            onAvatarUpdate={handleAvatarUpdate}
          />
          <p className="text-white text-sm font-bold mt-10 text-center">
            Agrega tu foto de perfil o avatar favorito
          </p>
        </div>

        {/* Contenedor Datos personales */}
        <div className="flex flex-col bg-[#686E9E] p-8 rounded-lg w-[350px] h-[500px]">
          <h3 className="text-white text-lg font-bold mb-8 text-center">Datos personales</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white text-sm font-bold">
                Nombre y Apellido
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
                className="px-4 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000000]"
              />
            </div>
          </form>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 px-6 py-2 bg-[#F20D11] text-white font-bold text-sm rounded-full hover:bg-[#d10b0e]"
      >
        ELIMINAR PERFIL
      </button>
    </div>
  );
};

export default EditUser;
