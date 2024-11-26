import { UserDelete } from './UserDelete';
import { UserPanelStatus } from './UserPanelStatus';
import{ Link } from 'react-router-dom'
import {InformationCircleIcon} from '@heroicons/react/16/solid'

export const UsersPanel = ({ userList, setUserList }) => {
  const updateUserStatus = (userId, active) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.id === userId ? { ...user, enable: active } : user
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#686e9e] shadow-md rounded-lg overflow-hidden">
        <thead className='w-full  bg-[#515a9b] text-white font-manrope text-xs font-bold leading-[13.66px] text-left underline decoration-skip-ink-none'>
          <tr>
            <th className='py-1 px-2 text-left'>Usuario</th>
            <th className='py-1 px-2 text-left'>Email</th>
            <th className='py-1 px-2 text-left'>Estado</th>
            <th className='py-1 px-2 text-left'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td id='text' className="py-1 px-1 text-left text-xs text-[#252a31]">{user.username}</td>
              <td className="py-1 px-1 text-left text-xs text-[#252a31]">{user.email}</td>
              <td>
                <UserPanelStatus
                  userId={user.id}
                  active={user.enable}
                  updateUserStatus={updateUserStatus}
                />
              </td>
              <td id='acciones' className="py-1 px-2 flex items-center space-x-1">
              <Link to={'/admin/users/' + user.id}><button className='w-5 h-5 text-[#252a31]'><InformationCircleIcon className='w-5 h-5 mt-2.5'/> </button></Link>
                <UserDelete userId={user.id} setUserList={setUserList} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
