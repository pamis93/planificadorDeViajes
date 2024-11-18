import { UserDelete } from './UserDelete';
import { UserPanelStatus } from './UserPanelStatus';


export const UsersPanel = ({userList, setUserList}) => {
  const updateUserStatus = (userId, active) => {
    setUserList(prevList =>
      prevList.map(user => (user.id === userId ? { ...user, enable: active } : user))
    );
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

          <tr key={user.id}>
            <td className="text">{user.username}</td>
            <td className="text">{user.email}</td>
            <td><UserPanelStatus userId={user.id} active={user.enable} updateUserStatus={updateUserStatus} /></td>
            <td className='papelera'><UserDelete userId={user.id} setUserList={setUserList} /></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
