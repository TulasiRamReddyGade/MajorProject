import logo from './logo.svg';
import './App.css';
import Login from './auth/login/Login';
import { Route } from 'react-router-dom';
import SignUp from './auth/signup/SignUp';

function App() {
    return (
        <div className="App">
            <Route path={'/login'} exact>
                <Login></Login>
            </Route>
            <Route path={'/signup'} exact>
                <SignUp />
            </Route>
        </div>
    );
}

export default App;
