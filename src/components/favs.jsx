import React , { useEffect, useState} from 'react'
import useFav from '../hook/useFav'
import { useSuperheroes } from '../hook/useSuperheroes'
import ListOfHeroes from './listOfHeroes'

export default function Favs() {
    const {favs} = useFav()
    const {heroesList} = useSuperheroes()
    const [heroesFavList, setHeroesFavList] = useState([]);

    useEffect(() => {
        
        if(heroesList.length>0 && favs.length>0){
            setHeroesFavList(heroesList.filter(heroe => favs.some(fav => fav.superId === heroe.id)))
        }

    }, [heroesList,favs]);


    
    return (
        <div>
            <ListOfHeroes heroes={heroesFavList} favs={favs}/> 

        </div>
    )
}
