import AvatarUpload from './AvatarUpload';
import UserForm from './UserForm';
import avatar from '../../assets/avatar.png';

const EditUser = () => {
  const handleFormSubmit = (formData) => {
    console.log('Datos del usuario:', formData);
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
        {/* Avatar */}
        <div className="flex flex-col items-center bg-[#686E9E] p-6 rounded-lg w-[350px] h-[600px]">
          <p className="text-white text-10 font-bold mb-4">Foto de perfil</p>
          <AvatarUpload
            currentAvatar={avatar}
            onAvatarUpdate={handleAvatarUpdate}
          />
          <p className="text-white text-sm font-bold mt-10 text-center">
            Agrega tu foto de perfil o avatar favorito
          </p>
        </div>

        {/* Datos personales */}
        <div className="flex flex-col bg-[#686E9E] p-8 rounded-lg w-[350px] h-[600px]">
          <h3 className="text-white text-lg font-bold mb-8 text-center">
            Datos personales
          </h3>
          <UserForm onSubmit={handleFormSubmit} />
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 px-6 py-2 bg-green-600 text-white font-bold text-10 rounded-full hover:bg-green-400"
      >
        Guardar Cambios
      </button>
      <button
        type="button"
        className="mt-8 px-6 py-2 bg-[#F20D11] text-white font-bold text-10 rounded-full hover:bg-[#d10b0e]"
      >
        ELIMINAR PERFIL
      </button>
    </div>
  );
};

export default EditUser;
