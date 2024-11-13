import { useUser } from '../../context/UserContext';
import "./LogoutButton.css";


const LogoutButton = () => {
    const [,setUser] = useUser()

    const handleLogout = () => {
        setUser(null)
    }

    return (
        <button className='cerrar' onClick={handleLogout}   
        >Cerrar sesión</button>
    )
}


export default LogoutButton;