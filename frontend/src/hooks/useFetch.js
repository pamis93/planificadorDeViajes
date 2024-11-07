import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";


function useFetch(url) {
    const [user] = useUser();
    const [content, setContent] = useState(null);
    console.log(JSON.stringify(user));

    useEffect(() => {
        const headers = {};
        if (user?.token) headers.Authorization = user.token;
        console.log("headers", headers);

        fetch(url, { headers })
            .then((res) => res.json())
            .then((data) => setContent(data));
    }, [url, user?.token]);

    return content;
}

export default useFetch;
