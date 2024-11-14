import logoTrash from '../../assets/logoTrash.png';


export const UsersPanel = ({userList}) => {
  
  const handletoggleActive= (userId)=>{
    console.log(`Toggle active status for user with id: ${userId}`);
  };

  const handleDeleteUser= (userId)=>{
    console.log(`Delete user with id:${userId}`); 
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>{userList.map((user) => (

          <tr key={userList.id}>
            <td className="text">{user.username}</td>
            <td className="text">{user.email}</td>
            <td><button id="state" onClick={() => handletoggleActive(user.id)}>{userList.enable ? 'Activo' : 'Inactivo'}</button></td>
            <td className='papelera'><button onClick= {() => handleDeleteUser(user.id)}> <img id="trash" src={logoTrash} alt="papelera" /> </button></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
