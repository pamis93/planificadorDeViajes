import { useState, useEffect } from 'react';
// import { useUser } from '../../context/UserContext';

const UserForm = ({ initialData, setAvatarAct, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  });

  const [editableFields, setEditableFields] = useState({});
  const [message] = useState({ text: '', type: '' });

  // Actualiza los datos del formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        lastName: initialData.lastName || '',
        username: initialData.username || '',
        email: initialData.email || '',
        password: '', 
      });
      
      // Si hay un avatar, actualiza el avatar en el padre
      if (initialData.avatar) {
        setAvatarAct(`http://localhost:3001/uploads/${initialData.avatar}`);
      }
    }
  }, [initialData, setAvatarAct]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {['name', 'lastName', 'username', 'email', 'password'].map((field) => (
        <div key={field} className="flex flex-col gap-2">
          <label htmlFor={field} className="text-white text-sm font-bold">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <div className="flex items-center">
            <input
              type={field === 'password' ? 'password' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              readOnly={!editableFields[field]}
              className={`px-12 py-2 bg-[#9AA5BC] text-black font-bold rounded-lg focus:outline-none ${
                editableFields[field]
                  ? 'focus:ring-2 focus:ring-[#000000]'
                  : 'cursor-not-allowed'
              }`}
            />
            <button
              type="button"
              onClick={() => handleEditClick(field)}
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

      {message.text && (
        <p
          className={`text-sm font-bold mt-2 ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

export default UserForm;
