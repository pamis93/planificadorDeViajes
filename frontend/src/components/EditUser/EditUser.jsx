import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import AvatarUpload from './AvatarUpload';
import UserForm from './UserForm';
import avatar from '../../assets/avatar.png';
import { useTranslation } from 'react-i18next';  // Importar useTranslation

const EditUser = () => {
  const { t } = useTranslation();  // Usar hook de traducción

  const [avatarAct, setAvatarAct] = useState(avatar);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  const [user] = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = user?.token;
      const email = user?.email;
  
      if (!token || !email) {
        setMessage({ text: 'Usuario no autenticado', type: 'error' });
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3001/users/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ email }),
        });
  
        const responseData = await response.json();
  
        if (responseData.status === 'ok') {
          const userData = responseData.data;
          setUserData(userData);
          setAvatarAct(`http://localhost:3001/uploads/${userData.avatar}`);
          setLoading(false);
        } else {
          setMessage({
            text: responseData.message || 'Error al obtener datos',
            type: 'error',
          });
          setLoading(false);
        }
      } catch {
        setMessage({
          text: 'Error al conectar con el servidor',
          type: 'error',
        });
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [user]);

  const handleFormSubmit = async (formData) => {
    try {
      const token = user?.token;
      const response = await fetch(`http://localhost:3001/users/edit/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({
          text: t('message.updatedSuccess'),  // Usar traducción
          type: 'success',
        });
      } else {
        const errorData = await response.json();
        setMessage({
          text: errorData.message || t('message.updateError'),  // Usar traducción
          type: 'error',
        });
      }
    } catch {
      setMessage({ 
        text: t('message.serverError'),  // Usar traducción
        type: 'error' 
      });
    }
  };

  const handleAvatarUpdate = (newAvatarUrl) => {
    setAvatarAct(`http://localhost:3001/uploads/${newAvatarUrl}`);
  };

  if (loading) {
    return <p className="text-white text-center">{t('message.loading')}</p>;  // Usar traducción
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#9AA5BC] p-4 sm:p-6 md:p-8">
      <h1 className="text-white mt-20 sm:mt-10 md:mt-20 text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center">
        {t('editProfile')} {/* Usar traducción */}
      </h1>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center items-start gap-4 sm:gap-8 w-full max-w-4xl">
        <div className="flex flex-col items-center bg-[#686E9E] p-4 sm:p-20 rounded-lg w-full sm:w-[350px] mb-4 sm:mb-0">
          <p className="text-white text-sm sm:text-base font-bold mb-2 sm:mb-4 text-center">{t('avatar')}</p>  {/* Usar traducción */}
          <AvatarUpload
            currentAvatar={avatarAct}
            onAvatarUpdate={handleAvatarUpdate}
          />
          <p className="text-white text-xs sm:text-sm font-bold mt-4 sm:mt-10 text-center">
            {t('updateAvatar')} {/* Usar traducción */}
          </p>
        </div>

        <div className="flex flex-col bg-[#686E9E] p-4 sm:p-7 rounded-lg w-full sm:w-[450px]">
          <h3 className="text-white text-base sm:text-lg font-bold mb-2 sm:mb-1 text-center">
            {t('personalData')} {/* Usar traducción */}
          </h3>
          <UserForm 
            initialData={userData} 
            setAvatarAct={setAvatarAct} 
            onSubmit={handleFormSubmit} 
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-4 sm:mt-8 px-4 sm:px-6 py-2 bg-[#F20D11] text-white font-bold text-sm sm:text-base rounded-full hover:bg-[#d10b0e]"
      >
        {t('deleteProfile')}  {/* Usar traducción */}
      </button>
    </div>
  );
};

export default EditUser;
