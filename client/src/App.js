import logo from './logo.svg';
import './App.css';
import Login from './auth/login/Login';
import { Redirect, Route } from 'react-router-dom';
import SignUp from './auth/signup/SignUp';
import Loader from './loader/Loader';
import Institution from './Institution/Institution';
import Student from './Student/Student';
import { useState } from 'react';
import { protect, authorize } from './services/userService';
import Home from './Home/Home';

function App() {
    const [loader, loaderUpdateFunction] = useState(false);

    return (
        <div className="App">
            {loader && <Loader />}
            <Route path={'/'} exact>
                <Home />
            </Route>
            <Route path={'/login'} exact>
                {(!protect() && (
                    <Login loader={loaderUpdateFunction}></Login>
                )) ||
                    (authorize('Student') && <Redirect to={'/student'} />) ||
                    (authorize('Institution') && (
                        <Redirect to={'/institution'} />
                    ))}
            </Route>
            <Route path={'/signup'} exact>
                <SignUp loader={loaderUpdateFunction} />
            </Route>
            <Route path={'/institution'} exact>
                {(protect() && authorize('Institution') && (
                    <Institution></Institution>
                )) || <Redirect to={'/login'} />}
            </Route>
            <Route path={'/student'} exact>
                {(protect() && authorize('Student') && <Student></Student>) || (
                    <Redirect to={'/login'} />
                )}
            </Route>
        </div>
    );
}

export default App;
