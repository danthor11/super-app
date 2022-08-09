import React , { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser , signInUser , logout , setOk ,setError} from '../features/auth/authSlice'
import useFav from './useFav'

export default function useAuth() {
    const {auth,ok,isLoading,error}  = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const { getFavs , setInitialFav, favs , status} = useFav()

    const signUp = useCallback(({email,password}) => {
            return dispatch(signUpUser({email,password})).unwrap()
        },
      [],
    )
    
    const logInUser = useCallback(({email,password}) => {
        getFavs(email)
        return dispatch(signInUser({email,password})).unwrap()
    },[])

    const setOkStatus = useCallback( () => {
        dispatch(setOk())
    },[])

    const setErrorStatus = useCallback (() => {
        dispatch(setError())
    },[])

    const logOutService = useCallback(() => {
        dispatch(logout())
        setInitialFav()
    },[])


    useEffect(() => {
        if(status==="initial" && auth.token){
            
            getFavs(auth.username)
        }
    }, []);

    return {
        auth,
        ok,
        isLoading,
        error,
        logInUser,
        signUp,
        setOkStatus,
        setErrorStatus,
        logOutService
    }
}
