import React, { useRef } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './login.module.css';
import { login } from '../../services/userService';

const Login = props => {
    const formRefs = [useRef(), useRef()];
    const submitHandler = event => {
        event.preventDefault();
        const formData = {
            email: formRefs[0].current.value,
            password: formRefs[1].current.value
        };
        login(props.loader, formData);
    };
    return (
        <div>
            <div className={styles['banner']}></div>
            <form className={styles['login-form']} onSubmit={submitHandler}>
                <div className={styles['login-form-fields']}>
                    <p>Enter Your Email</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Email"
                        type="email"
                        variant="outlined"
                        inputRef={formRefs[0]}
                    />
                </div>
                <div className={styles['login-form-fields']}>
                    <p>Enter Your Password</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Password"
                        type="password"
                        variant="outlined"
                        inputRef={formRefs[1]}
                    />
                </div>
                <div className={styles['login-form-button']}>
                    <Button variant="contained" size="large" color="info">
                        SignUp
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
