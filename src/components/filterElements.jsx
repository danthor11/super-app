import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { changeFilter } from '../features/hero/heroSlice';

export const filterElement = [
    "All",
    "Heroes",
    "Villain",
    "Women",
    "Men",
    "More powerful"
]

export const filtersFunction = {
    "All": (heroes) => {
        return heroes
    },
    "Heroes" : (heroes) => {
        return heroes.filter(hero => hero.biography.alignment.includes("good"))
    },
    "Villain" : (heroes) => {
        return heroes.filter(hero => hero.biography.alignment.includes("bad"))
    },
    "Women" : (heroes) => {
        return heroes.filter(hero => hero.appearance.gender.includes("Female"))
    },
    "Men" : (heroes) => {
        return heroes.filter(hero => hero.appearance.gender.includes("Male"))
    },
    "More powerful" : (heroes) => {
        const arrayToSort =  [...heroes]
        return arrayToSort.sort((a,b) => b?.powerstats?.power - a?.powerstats?.power)
    },
}


export default function FilterElements({filterSelectedIndex, changeFilter,setHeroes}) {
    
    const { heroes } = useSelector(state => state.heroes)

    const handleSelect = (event,index) => {
        changeFilter(index)
        // setfilterSelectedIndex(index)
        // setHeroes(filtersFunction[filterElement[index]](heroes))
        
    }
    
    return (

    <div className='is-flex is-flex-wrap-wrap is-justify-content-center '>
        {filterElement.map((filter,index) => 
            <span key={filter} className={`filter-element ${filterSelectedIndex===index && `filter-element-selected-${index} has-text-light`}`}
                onClick={(event) => handleSelect(event,index)}
                style={{cursor:"pointer"}}

            >
                {filter}
            </span>)
        }
    </div>
  )
}
