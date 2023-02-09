import Cookies from 'universal-cookie';

const backendConnectionString = 'http://127.0.0.1:8080/api/v1/user';

const signup = (loaderUpdate, formData) => {
    console.log(formData);
    const signupConnectionString = `${backendConnectionString}/signup/`;
    loaderUpdate(true);
    fetch(signupConnectionString, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            loaderUpdate(false);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
            loaderUpdate(false);
        });
};

const login = (loaderUpdate, formData) => {
    const loginConnectionString = `${backendConnectionString}/login/`;
    loaderUpdate(true);
    fetch(loginConnectionString, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            loaderUpdate(false);
            console.log(data);
            const cookie = new Cookies();

            cookie.set('certificate-management', data.token, {
                path: '/'
            });
            localStorage.setItem(
                data.token,
                JSON.stringify({
                    name: data.data.user.name,
                    role: data.data.user.role,
                    email: data.data.user.email,
                    mobile: data.data.user.mobile
                })
            );
            console.log(cookie.get('certificate-management'));
        })
        .catch(err => {
            console.log(err);
            loaderUpdate(false);
        });
};

const protect = () => {
    const token = new Cookies().get('certificate-management');
    // console.log(token);
    return token !== undefined;
};

const authorize = user => {
    const token = new Cookies().get('certificate-management');
    console.log(token);

    if (token !== undefined) {
        const userDetails = JSON.parse(localStorage.getItem(token));
        console.log(userDetails);
        return user === userDetails.role;
    }
};

export { signup, login, protect, authorize };
