import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AccountActivation() {
    const { registrationCode } = useParams();
    const [status, setStatus] = useState("");

    useEffect(() => {
        const activateAccount = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/validate/${registrationCode}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    setStatus("Cuenta activada correctamente");
                } else {
                    setStatus("Error en la activación de la cuenta");
                }
            } catch (error) {
                setStatus("Error en la activación de la cuenta");
                console.error(error);
            }
        };
        activateAccount();
    }, [registrationCode]);

    return (
        <div>
            <h2>{status}</h2>
        </div>
    );
}

export default AccountActivation;
