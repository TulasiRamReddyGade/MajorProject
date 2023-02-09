import { React, useRef } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import styles from './signup.module.css';
import { signup } from './../../services/userService';

const SignUp = props => {
    const formRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];

    const submitHandler = event => {
        event.preventDefault();
        const formData = {
            name: formRefs[0].current.value,
            role: formRefs[1].current.value,
            email: formRefs[2].current.value,
            password: formRefs[3].current.value,
            passwordConfirm: formRefs[4].current.value,
            mobile: formRefs[5].current.value
        };

        signup(props.loader, formData);
    };
    return (
        <div>
            <div className={styles['banner']}></div>
            <form className={styles['signup-form']} onSubmit={submitHandler}>
                <div className={styles['signup-form-fields']}>
                    <p>Enter Your Name</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Name"
                        type="text"
                        variant="outlined"
                        inputRef={formRefs[0]}
                    />
                </div>
                <div className={styles['signup-form-fields']}>
                    <p>Enter Your Role</p>
                    <span style={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-label">
                            Role
                        </InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            inputRef={formRefs[1]}
                            style={{ width: '100%' }}
                        >
                            <MenuItem value={'Student'}>Student</MenuItem>
                            <MenuItem value={'Institution'}>
                                Institution
                            </MenuItem>
                        </Select>
                    </span>
                </div>
                <div className={styles['signup-form-fields']}>
                    <p>Enter Your Email</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Email"
                        type="email"
                        inputRef={formRefs[2]}
                        variant="outlined"
                    />
                </div>
                <div className={styles['signup-form-fields']}>
                    <p>Enter Your Password</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Password"
                        type="password"
                        variant="outlined"
                        inputRef={formRefs[3]}
                    />
                </div>
                <div className={styles['signup-form-fields']}>
                    <p>Confirm Your Password</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Confirm Your Password"
                        type="password"
                        variant="outlined"
                        inputRef={formRefs[4]}
                    />
                </div>
                <div className={styles['signup-form-fields']}>
                    <p>Enter Your Mobile Number</p>
                    <TextField
                        required
                        id="outlined-basic"
                        label="Enter Your Mobile Number"
                        type="text"
                        variant="outlined"
                        inputRef={formRefs[5]}
                    />
                </div>
                <div className={styles['signup-form-button']}>
                    <Button variant="contained" size="large" color="info">
                        login
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        type="submit"
                    >
                        SignUp
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
