import { useState, useRef } from 'react';
import { useUser } from "../../context/UserContext";

const AvatarUpload = ({ currentAvatar, onAvatarUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [user] = useUser();

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        alert('Por favor selecciona una imagen válida (jpg, jpeg, png)');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona una imagen primero');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const response = await fetch('http://localhost:3001/users/avatar', {
        method: 'PUT',
        body: formData,
        headers: {
            Authorization: `${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al subir el avatar');
      }

      const data = await response.json();
      if (data.status === 'ok') {
        alert('Avatar actualizado exitosamente');
        setPreviewUrl(URL.createObjectURL(selectedFile)); // Mostrar la imagen seleccionada
        setIsModalOpen(false);
        setSelectedFile(null);
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      const response = await fetch('http://localhost:3001/users/avatar', {
        method: 'PUT',
        headers: {
            Authorization: `${user.token}`,
        },
        body: JSON.stringify({ avatar: null }),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el avatar');
      }

      setPreviewUrl(null);
      setSelectedFile(null);
      onAvatarUpdate && onAvatarUpdate(null);
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div onClick={handleAvatarClick} className="cursor-pointer">
        <div className="w-[290px] h-[290px] rounded-full overflow-hidden bg-white flex justify-center items-center">
          <img
            src={previewUrl || currentAvatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full m-4 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-6">
              <div className="w-[400px] h-[400px] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={previewUrl || currentAvatar}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={triggerFileInput}
                  className="px-6 py-2 bg-[#F66136] text-white font-bold rounded-full hover:bg-[#e25630]"
                >
                  SELECCIONAR IMAGEN
                </button>
                {selectedFile && (
                  <button
                    onClick={handleUpload}
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700"
                  >
                    GUARDAR
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-[#F20D11] text-white font-bold rounded-full hover:bg-[#d10b0e]"
                >
                  BORRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarUpload;
