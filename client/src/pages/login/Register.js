import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import axios from "axios";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {Button} from "@mui/material";
import styles from './register.module.css'
import Navbar from "../../components/Navbar";
import LoginIcon from "@mui/icons-material/Login";


const userSchema = yup.object().shape({
    firstName: yup.string().required('You must enter a first name'),
    lastName: yup.string(),
    username: yup.string().min(5).required('You must enter a username'),
    password: yup.string().min(6).required('You must enter a password'),
    email: yup.string().email().required('You must enter a email address'),
    number: yup.string().required('You must enter a number')
})

const Register = () => {


    const navigate = useNavigate()
    const {handleSubmit, register, formState: {errors}} = useForm({resolver: yupResolver(userSchema)});
    // const {handleSubmit, register, formState:{errors}} = useForm();
    // const dispatch = useDispatch();

    const registerHandler = async (loginData) => {
        const res = await axios.post('http://localhost:7070/api/v1/auth/register', loginData)

        navigate(`/email-verification/${res.data.data.user.id}`)
        console.log(res)
    }



    return (<>
            <Navbar title="Registration page"/>

            <form onSubmit={handleSubmit(registerHandler)}>

                <input
                    className={!errors.firstName ? styles['input-outlined'] : styles['input-field']}
                    type="text"
                    placeholder='First name'
                    {...register('firstName')}
                />
                <p style={{color: 'red'}}>{errors.firstName?.message}</p>


                <input type="text" placeholder='Last name' {...register('lastName')}/>
                <input
                    className={!errors.email ? styles['input-outlined'] : styles['input-field']}
                    type="text"
                    placeholder='Email'
                    {...register('email')}
                />
                <p style={{color: 'red'}}>{errors.email?.message}</p>

                <input
                    className={!errors.username ? styles['input-outlined'] : styles['input-field']}
                    type="text"
                    placeholder='Username'
                    {...register('username')}
                />
                <p style={{color: 'red'}}>{errors.username?.message}</p>

                <input
                    className={!errors.password ? styles['input-outlined'] : styles['input-field']}
                    type="password"
                    placeholder='Password'
                    {...register('password')}
                />
                <p style={{color: 'red'}}>{errors.password?.message}</p>

                {/*<input type="number" placeholder='Phone number' {...register('number')}/>*/}
                <input
                    className={!errors.password ? styles['input-outlined'] : styles['input-field']}
                    type="number"
                    placeholder='Phone number'
                    {...register('number')}
                />
                <p style={{color: 'red'}}>{errors.number?.message}</p>
                <div className={styles.actions}>

                    <Link to={'/auth/login'}>
                        {/*New user? Register*/}
                        <Button
                            variant={"contained"}
                            size={"large"}
                            className="btnLogin"
                            startIcon={<LoginIcon/>}>
                            Already have an account? Login
                        </Button>
                    </Link>

                    <Button
                        type='submit'
                        variant={"contained"}
                        size={"large"}
                        className="btnLogin"
                        startIcon={<VpnKeyIcon/>}>
                        Register
                    </Button>
                </div>
            </form>
        </>

    )
        ;
};

export default Register;