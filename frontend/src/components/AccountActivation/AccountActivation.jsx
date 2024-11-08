import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AccountActivation() {
    const { registrationCode } = useParams();
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const activateAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/validate/${registrationCode}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.status === "ok") {
                    setStatus("Cuenta activada correctamente");
                } else {
                    setStatus("Error en la activación de la cuenta");
                }
            } else {
                setStatus("Error en la activación de la cuenta");
            }
        } catch (error) {
            setStatus("Error en la activación de la cuenta");
            console.error(error);
        }
    };

    useEffect(() => {
        activateAccount();
    }, []);

    const closeModal = ()=>{
        navigate("/");
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-header">{status ? status : "Cargando..."}</h2>
                <button onClick={closeModal} className="modal-close-button">
                    X
                </button>
            </div>
        </div>
    );
}

export default AccountActivation;
