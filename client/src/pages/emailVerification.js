import React, {useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useForm,} from "react-hook-form";

const EmailVerification = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [code, setCode] = useState()
    const id= params.id

    const changeCode = (e) => {
        setCode(e.target.value)
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    // useEffect(() => {
    //     if (code) {
    //         verify();
    //     }
    // }, [])
    const verify = async (data) => {

        try {
            const res = await axios.post(`http://localhost:7070/api/v1/auth/verify/${id}`,data);
            toast.success(res.data.message)
            navigate("/auth/login")
        } catch (error) {
            toast.error(error.response.data.message)
            navigate("/auth/register")
        }
    };


    return (
        <div>
            {/*Check your email*/}
            <form onSubmit={handleSubmit(verify)}>
                <input
                    type="number"
                    placeholder="Verification Code"
                    {...register("verificationCode", {
                        required: {value: true, message: "Enter verification code"},
                    })}
                />
                <button>Check</button>
            </form>
        </div>
    );
};

export default EmailVerification;