import React, {useContext} from 'react';
import {AuthContext} from '../contexts/AuthProvider';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

const GoogleLogIn = () => {

    const {auth} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    // console.log(from);

    const googleLoginHandler = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                // console.log(user);
                // console.log(token);
                navigate(from, {replace: true});
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    return (
        <button onClick={googleLoginHandler} className="google-signin-button">
            <img className="w-6" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" />
            <h1 className="text-white pl-2 text-lg">Log in with Google</h1>
        </button>
    );
};

export default GoogleLogIn;