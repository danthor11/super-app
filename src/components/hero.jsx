import React from 'react'
import { useLocation , Link } from 'wouter'

import FavElement from './favElement'

export default function Hero(props) {
    
    const [_,setLocation] = useLocation()


    return (
        <div  style={{maxWidth:"380px",position:"relative",zIndex:"1"}}>
            <div className="is-flex card has-background-light px-4 py-5 hero-card-info" style={{boxShadow:`0px 0px 2px 0 ${props.heroes.biography.alignment.includes("good") ? "#48a4ff" : props.heroes.biography.alignment.includes("bad") ? "#ff2d2d" : "#0fff87"}`}}>

                <img src={props.heroes.images} alt={props.heroes.name} className="image" width={"200px"}   loading='lazy' style={{borderRadius:"8px",height:"auto"}}/>
                <div className="px-3">
                    
                    <h4 className="title is-4 has-text-centered pb-2" style={{borderBottom:`2px solid ${props.heroes.biography.alignment.includes("good") ? "#48a4ff" : props.heroes.biography.alignment.includes("bad") ? "#ff2d2d" : "#0fff87"}`}}>
                        <Link to={`/superhero/${props.heroes.id}`} style={{textDecoration:"none",color:"inherit"}}>{props.heroes.name}</Link>
                    </h4>
                    
                    <small className="subtitle is-6">{props.heroes.biography.fullName}</small>
                    <p>First Appearance in {props.heroes.biography.firstAppearance}</p>
                    <p 
                        className={`${props.heroes.biography.alignment.includes("good") ?"has-background-info min-content" : props.heroes.biography.alignment.includes("bad") ? "has-background-danger" : props.heroes.biography.alignment.includes("neutral") ? "has-background-success" : "has-background-dark"} is-capitalized has-text-centered mt-2 has-text-light py-1`}
                        style={{borderRadius:"4px"}}
                    >
                        { props.heroes.biography.alignment.length > 1 ?props.heroes.biography.alignment : "unknown"}
                    </p>
                </div>
            </div>
            <FavElement id={props.heroes.id} isFav={props.fav}/>
        
            
        </div>
    )
}
