import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase.config";
import { createContext } from "react";


const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    //sign up user
    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in user
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const allInfo = {
        signUpUser,
        signInUser,
    }


    return (
        <AuthContext.Provider value={allInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;