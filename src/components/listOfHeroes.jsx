import React, {useEffect, useState} from "react";
import Hero from "./hero";
import Loading from "./loading";

const ListOfHeroes = ({heroes,favs}) => {
    
    const [page, setPage] = useState(0);
    const [heroPage, setHeroPage] = useState([])
    
    useEffect(() => {
        if(heroes.length>0 ){
            setHeroPage(heroes.slice(0,10))
            setPage(0)
        }
        
    }, [heroes]);
   
    const nextPage = () => {
        setPage(page+1)
        setHeroPage(heroes.slice(10*page+10,10*page+20))
    }
    
    const prevPage = () => {
        setPage(page-1)
        setHeroPage(heroes.slice(10*page-10,10*page))
    }
    
    return (
        <>
            <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly is-align-items-center my-3 mx-1" style={{gap:"12px"}}>
                {heroes.length > 0 ?   
                    <>
                        {heroPage.map(heroes => 
                        
                            <Hero 
                            key={heroes.id} 
                            heroes ={heroes} 
                            fav={favs.some(fav => fav.superId === heroes.id) ? true: false}
                        
                        />) }
                            
                    </>
                    
                    : <Loading/>
                }
                
                
            </div>
        
            {heroes.length > 10  && 
                <nav className="pagination is-rounded my-4 is-justify-content-center" role="navigation" aria-label="pagination">
                    <button 
                        className="pagination-previous" 
                        disabled={0!==page ? false: true}
                        onClick={() => prevPage()}
                        >   
                        Previous
                    </button>
                    <button 
                        className="pagination-next" 
                        disabled={ Math.floor(heroes.length/10)===page ? true : false }
                        onClick={() => nextPage()}
                    >
                        Next page
                    </button>
                    
                </nav>
            }
        
        </>
    )
}

export default ListOfHeroes

