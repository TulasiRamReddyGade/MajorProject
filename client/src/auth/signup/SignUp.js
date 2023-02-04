import React from 'react';
import { TextField, Button } from '@mui/material';
import styles from './signup.module.css';

const SignUp = () => {
    return (
        <div>
            <div className={styles['banner']}></div>
            <div className={styles['login-form']}>
                <div className={styles['login-form-fields']}>
                    <p>Enter Your Name</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Email"
                        type="text"
                        variant="outlined"
                    />
                </div>
                <div className={styles['login-form-fields']}>
                    <p>Enter Your Role</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Role"
                        type="text"
                        variant="outlined"
                    />
                </div>
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
                <div className={styles['login-form-fields']}>
                    <p>Confirm Your Password</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Password"
                        type="password"
                        variant="outlined"
                    />
                </div>
                <div className={styles['login-form-fields']}>
                    <p>Enter Your Mobile Number</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Mobile Number"
                        type="text"
                        variant="outlined"
                    />
                </div>
                <div className={styles['login-form-button']}>
                    <Button variant="contained" size="large" color="info">
                        Login
                    </Button>
                    <Button variant="contained" size="large" color="success">
                        SignUp
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
