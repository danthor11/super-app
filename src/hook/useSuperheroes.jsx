import React ,{useState , useEffect} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { getAllHeroes } from '../features/hero/heroSlice';
import { filterElement, filtersFunction } from '../components/filterElements';

export const useSuperheroes = () => {
    const heroesState = useSelector(state => state.heroes)
    const dispatch = useDispatch()

    const [heroesList, setHeroesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);
    const [filterSelectedIndex, setFilterSelectedIndex] = useState(0);

    useEffect(() => {
        if(heroesState.status==="initial"){
            
            dispatch(getAllHeroes())  
        }
    }, [dispatch]);

    useEffect(()=> {
        if(heroesState.heroes?.length > 0){
            
            setHeroesList(heroesState.heroes)
            setIsLoading(false)
        }
    },[heroesState.heroes])


    useEffect(()  => {
        setIsLoadingFilter(true)
        const changeResults = async () => {
            if(searchValue.length > 0){
               
                const array = (filtersFunction[filterElement[filterSelectedIndex]](heroesState.heroes))
                
                await setHeroesList(array.filter(heroe => heroe.name.toLowerCase().includes(searchValue.toLowerCase())))
                
            
            }
            else {
                setHeroesList(heroesState.heroes)
                setFilterSelectedIndex(0)
            }
        }
        changeResults()
        setIsLoadingFilter(false)
    }, [searchValue]);


    const changeFilter = (index) => {
        setFilterSelectedIndex(index)
        setHeroesList(filtersFunction[filterElement[index]](heroesState.heroes))
    }

    return {
        heroesList,
        isLoading,
        setHeroesList,
        isLoadingFilter,
        searchValue,
        setSearchValue,
        changeFilter,
        filterSelectedIndex
    }
}


