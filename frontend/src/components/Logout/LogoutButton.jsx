import { useUser } from '../../context/UserContext';

const LogoutButton = () => {
    const [, setUser] = useUser();

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <button
            onClick={handleLogout}
            className=" w-full bg-[#a31106] text-white border-none text-sm px-4 py-2 cursor-pointer rounded-lg  text-center transition-transform duration-300 ease-in-out hover:bg-[#790a0a]"
        >
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
