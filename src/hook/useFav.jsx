import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavsByUserId, addFavReducer ,removeFav, removeAllData} from '../features/favs/favSlice'

export default function useFav() {
    const {favs,status} = useSelector(state => state.fav)
    const dispatch = useDispatch()

    
    const getFavs = useCallback((username) => {
        dispatch(getAllFavsByUserId(username))
        
    }
    ,[])

    const addNewFav = ({favId,userId}) => {
      
        dispatch(addFavReducer({favId,userId}))
    }

    const removeSuperFav =  (favId) => {
        dispatch(removeFav(favId))
    }

    const setInitialFav = () => {
        dispatch(removeAllData())
    }

    const isAFav = (id)=>{
        const exists = favs.some(fav => fav.superId===id)
        if(exists){
            return true
        }
        return false        
    }
    

    return {
        getFavs,
        removeSuperFav,
        addNewFav,
        isAFav,
        favs,
        status,
        setInitialFav
    }
}
