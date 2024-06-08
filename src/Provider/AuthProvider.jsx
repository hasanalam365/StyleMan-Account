import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from "../firebase.config";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const auth = getAuth(app);

//Provider



export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    //sign up user
    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }



    //sign in user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //update a user
    const updateUser = (name, photo) => {

        return updateProfile(auth.currentUser, {

            displayName: name,
            photoURL: photo
        })

    }

    //signOut user
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }


    //on Auth user State Change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser)

            if (currentUser) {
                //jwt 
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })

            }
            else {
                localStorage.removeItem('access-token')
            }
            console.log('currentUser:', currentUser)
            setLoading(false)
        })
        return () => unSubscribe()
    }, [])


    const allInfo = {
        signUpUser,
        signInUser,
        updateUser,
        user,
        loading,
        signOutUser,
    }


    return (
        <AuthContext.Provider value={allInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;