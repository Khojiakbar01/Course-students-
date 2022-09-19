import axios from "axios";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";


const Verification = () => {
    const navigate = useNavigate()
    const params = useParams();
    console.log(params.id);
    const verify = async () => {
        try {
            const res = await axios(`http://localhost:7070/api/v1/auth/verify/${params.id}`);
            toast.success(res.data.message)
            navigate("/auth/login")
        } catch (error) {
            toast.error(error.response.data.message)
            navigate("/auth/register")
        }


    };
    useEffect(() => {
        if (params.id) {
            verify();
        }
    }, [params.id])
    // return (
    //     <>
    //         <h1>Hello</h1>
    //     </>
    // );
}

export default Verification;