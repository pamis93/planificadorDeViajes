import { UserDelete } from './UserDelete';
import { UserPanelStatus } from './UserPanelStatus';

export const UsersPanel = ({ userList, setUserList }) => {
  const updateUserStatus = (userId, active) => {
    setUserList(prevList =>
      prevList.map(user => (user.id === userId ? { ...user, enable: active } : user))
    );
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Usuario</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id} className="border-b border-gray-300">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <UserPanelStatus userId={user.id} active={user.enable} updateUserStatus={updateUserStatus} />
              </td>
              <td className="px-4 py-2">
                <UserDelete userId={user.id} setUserList={setUserList} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
