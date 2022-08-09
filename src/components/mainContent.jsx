import React , { useState , useEffect } from 'react'
import ListOfHeroes from './listOfHeroes'

import FilterElements from './filterElements'
import { useSuperheroes } from '../hook/useSuperheroes'
import useFav from '../hook/useFav'

export default function MainContent() {
    const {
        heroesList,
        
        isLoadingFilter,
        searchValue,
        setSearchValue,
        filterSelectedIndex,
        changeFilter
    } = useSuperheroes()
    const {favs} = useFav()

    return (
        <section className='content'>
            <div className=' my-5 mx-auto header-content' style={{width:"fit-content"}}>
                <input 
                    className='input' 
                    type={"search"} 
                    placeholder="Type to search" 
                    value={searchValue} 
                    onChange={({target}) => setSearchValue(target.value)}
                    
                />
                <div className='my-3'>
                    <FilterElements 
                        filterSelectedIndex={filterSelectedIndex} 
                        changeFilter={changeFilter}
                    />
                </div> 
            </div>
            {isLoadingFilter && "LOADING :::::"}
            <ListOfHeroes heroes={heroesList} favs={favs}/>
        </section>
    )
}
