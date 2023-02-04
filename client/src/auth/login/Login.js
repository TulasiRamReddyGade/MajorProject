import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './login.module.css';

const Login = () => {
    return (
        <div>
            <div className={styles['banner']}></div>
            <div className={styles['login-form']}>
                <div className={styles['login-form-fields']}>
                    <p>Enter Your Email</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Email"
                        type="email"
                        variant="outlined"
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
                    />
                </div>
                <div className={styles['login-form-button']}>
                    <Button variant="contained" size="large" color="info">
                        SignUp
                    </Button>
                    <Button variant="contained" size="large" color="success">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
