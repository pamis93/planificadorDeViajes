import { useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';

const AvatarUpload = ({ currentAvatar, onAvatarUpdate }) => {
  // Estado para controlar si el modal está abierto.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para almacenar el archivo seleccionado.
  const [selectedFile, setSelectedFile] = useState(null);

  // Estado para almacenar la URL de vista previa de la imagen.
  const [previewUrl, setPreviewUrl] = useState(null);

  // Referencia al input de archivo para disparar el selector de archivos.
  const fileInputRef = useRef(null);

  // Estado para obtener el usuario desde el contexto.
  const [user] = useUser();

  // Estado para mostrar mensajes al usuario (éxito o error).
  const [message, setMessage] = useState({ text: '', type: '' });

  // Función para abrir el modal al hacer clic en el avatar.
  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  // Maneja la selección de un archivo desde el input.
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado.
    if (file) {
      // Verifica si el archivo es una imagen.
      if (!file.type.match('image.*')) {
        setMessage({
          text: 'Por favor selecciona una imagen válida (jpg, jpeg, png)',
          type: 'error',
        });
        return;
      }

      // Crea una URL de vista previa para mostrar la imagen seleccionada.
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // Actualiza el archivo seleccionado en el estado.
      setSelectedFile(file);
    }
  };

  // Maneja la subida del avatar al servidor.
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({
        text: 'Por favor selecciona una imagen primero',
        type: 'error',
      });
      return;
    }

    const formData = new FormData(); // Crea un FormData para enviar el archivo.
    formData.append('avatar', selectedFile);

    try {
      const token = user?.token; // Obtiene el token del contexto de usuario.
      if (!token) {
        setMessage({
          text: 'No se encontró el token de autenticación',
          type: 'error',
        });
        return;
      }

      // Realiza la solicitud para subir el avatar.
      const response = await fetch('http://localhost:3001/users/avatar', {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        setMessage({ text: 'Error al subir el avatar', type: 'error' });
        return;
      }

      const data = await response.json();
      
      if (data.status === 'ok') {
        setMessage({
          text: 'Avatar actualizado exitosamente',
          type: 'success',
        });
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setIsModalOpen(false);
        setSelectedFile(null);
        onAvatarUpdate && onAvatarUpdate(data.data.avatar); // Notifica al componente padre.
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Error al conectar con el servidor', type: 'error' });
    }
  };

  // Maneja la eliminación del avatar.
  const handleDelete = async () => {
    try {
      const token = user?.token; // Obtiene el token del contexto de usuario.
      if (!token) {
        setMessage({
          text: 'No se encontró el token de autenticación',
          type: 'error',
        });
        return;
      }

      // Realiza la solicitud para eliminar el avatar.
      const response = await fetch('http://localhost:3001/users/avatar', {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: null }), // Envía un body vacío para eliminar.
      });

      if (!response.ok) {
        setMessage({ text: 'Error al eliminar el avatar', type: 'error' });
        return;
      }

      setMessage({ text: 'Avatar eliminado exitosamente', type: 'success' });
      setPreviewUrl(null); // Limpia la imagen de vista previa.
      setSelectedFile(null); // Limpia el archivo seleccionado.
      onAvatarUpdate && onAvatarUpdate(null); // Notifica al componente padre.
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Error al conectar con el servidor', type: 'error' });
    }
  };

  // Dispara el selector de archivos de manera programada.
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* Contenedor del avatar */}
      <div onClick={handleAvatarClick} className="cursor-pointer">
        <div className="w-[290px] h-[290px] rounded-full overflow-hidden bg-white flex justify-center items-center">
          {/* Muestra la imagen del avatar */}
          <img
            src={previewUrl || currentAvatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Modal para editar el avatar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full m-4 relative">
            {/* Botón para cerrar el modal */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>

            {/* Contenido del modal */}
            <div className="flex flex-col items-center gap-6">
              <div className="w-[400px] h-[400px] rounded-lg overflow-hidden bg-gray-100">
                {/* Vista previa del avatar */}
                <img
                  src={previewUrl || currentAvatar}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Botones de acción */}
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

      {/* Muestra el mensaje si existe */}
      {message.text && (
        <p
          className={`text-sm font-bold mt-2 ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}
    </>
  );
};

export default AvatarUpload;
