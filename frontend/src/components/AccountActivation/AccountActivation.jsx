import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AccountActivation() {
  const { registrationCode } = useParams();
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const activateAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/validate/${registrationCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data) {
        console.log(data);
        setStatus('Cuenta activada correctamente');
      }
      // if (response.ok) {
      //     const data = await response.json();
      //     if (data.status === "ok") {
      //         setStatus("Cuenta activada correctamente");
      //     } else {
      //         setStatus("Error en la activación de la cuenta");
      //     }
      // } else {
      //     setStatus("Error en la activación de la cuenta");
      // }
    } catch (error) {
      setStatus('Error en la activación de la cuenta');
      console.error(error);
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  const closeModal = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-custom-blue text-white p-6 rounded-lg shadow-xl w-11/12 max-w-sm text-center relative">
        <h2 className="text-2xl font-semibold mb-4">
          {status ? status : 'Cargando...'}
        </h2>

        <button
          onClick={closeModal}
          className="top-1 right-2 absolute text-white py-2 px-3 rounded-full mt-0 hover:text-orange-500 transition-colors"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default AccountActivation;
