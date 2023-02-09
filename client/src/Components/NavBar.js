import React from 'react';
import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';

const NavBar = () => {
    const cookie = new Cookies().get('certificate-management');
    let role = undefined;
    if (cookie !== undefined) {
        role = JSON.parse(localStorage.getItem(cookie)).role;
    }
    return (
        <div className={styles['Navbar']}>
            <div className={styles['Navbar-div']}>
                <NavLink to={'/'} className={styles['Navlink']}>
                    Home
                </NavLink>
                {role === 'Student' && (
                    <NavLink to={'/student'} className={styles['Navlink']}>
                        Student
                    </NavLink>
                )}
                {cookie === undefined && (
                    <div className={styles['ButtonGroup']}>
                        <NavLink
                            to={'/signup'}
                            className={`${styles['Navlink']} ${styles['Button']}`}
                            style={{ backgroundColor: '#0ea5e9' }}
                        >
                            SignUp
                        </NavLink>
                        <NavLink
                            to={'/login'}
                            className={`${styles['Navlink']} ${styles['Button']}`}
                            style={{ backgroundColor: '#059669' }}
                        >
                            Login
                        </NavLink>
                    </div>
                )}
                {role !== undefined && (
                    <div className={styles['ButtonGroup']}>
                        <NavLink
                            to={'/login'}
                            className={`${styles['Navlink']} ${styles['Button']}`}
                            style={{ backgroundColor: '#e11d48' }}
                        >
                            Logout
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
