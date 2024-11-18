import  { useState } from 'react';
import avatar from '../../assets/avatar.png';


// Componente de la imagen de perfil 
const ProfilePictureComponent = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleDelete = () => {
    setProfilePicture(null);
  };

  return (
    <div className="flex flex-col items-center mr-8">
      <div className="w-25 h-25 rounded-full overflow-hidden  flex justify-center items-center">
        {profilePicture ? (
          <img src={URL.createObjectURL(profilePicture)} alt="Profile" className="w-full h-full object-cover" />
        ) : (
            <img src={avatar} alt="Default Avatar" className="w-full h-full object-cover" />

        )}
      </div>
      <div className="mt-4">
        <button className="mr-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 cursor-pointer" onClick={handleUpload}>
          SUBIR
        </button>
        <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 cursor-pointer" onClick={handleDelete}>
          BORRAR
        </button>
      </div>
    </div>
  );
};

// Componente de datos personales del usuario 
const PersonalDataComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex-grow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-bold">Apellido</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-bold">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">Correo Electronico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="px-2 py-1 border border-gray-300 rounded-md text-base"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 cursor-pointer">
          ELIMINAR PERFIL
        </button>
      </form>
    </div>
  );
};

const EditUser = () => {
  return (
    <div className="flex flex-row justify-center items-center p-8 bg-gray-200">
      <ProfilePictureComponent />
      <PersonalDataComponent />
    </div>
  );
};

export default EditUser;