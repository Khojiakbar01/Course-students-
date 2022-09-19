import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import {useForm} from "react-hook-form";
import {appActions} from "../../store/store";
import {useDispatch} from "react-redux";
import {Button} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import * as yup from "yup";
import styles from "./register.module.css";
import {yupResolver} from "@hookform/resolvers/yup";
import Navbar from "../../components/Navbar";

const userSchema = yup.object().shape({
    username: yup.string().min(5).required('You must enter a username'),
    password: yup.string().min(6).required('You must enter a password')
})

const Login = () => {
    const navigate = useNavigate()
    const {handleSubmit, register, formState: {errors}} = useForm({resolver: yupResolver(userSchema)});
    const dispatch = useDispatch()

    console.log(errors)
    const loginHandler = async (loginData) => {
        try {
            const res = await axios.post('http://localhost:7070/api/v1/auth/login', loginData)
            console.log(res.data.data.user)
            localStorage.setItem('token', res.data.data.jwt)
            localStorage.setItem('userId', res.data.data.user.id)
            localStorage.setItem('userRole', res.data.data.user.role)
            localStorage.setItem('isAuth', true)

            dispatch(appActions.login(res.data.data))
            navigate('/')
        } catch (e) {

        }
    }


    return (<>
            <Navbar title="Login page"/>

            <form onSubmit={handleSubmit(loginHandler)}>
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

                {/*<button type="submit">Submit</button>*/}
                {/*<button className="btnLogin">*/}
                <div className={styles.actions}>

                    <Link to={'/auth/register'}>
                        {/*New user? Register*/}
                        <Button
                            variant={"contained"}
                            size={"large"}
                            className="btnLogin"
                            startIcon={<LoginIcon/>}>
                            New user? Register
                        </Button>
                    </Link>


                    <Button
                        type='submit'
                        variant={"contained"}
                        size={"large"}
                        className="btnLogin"
                        startIcon={<LoginIcon/>
                        }>
                        Log in
                    </Button>
                </div>

            </form>
        </>

    );
};

export default Login;