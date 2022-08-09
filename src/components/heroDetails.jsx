import React, { useEffect , useState } from 'react'
import { useRoute } from 'wouter';
import { getUserById } from '../services/heroesServices';

export default function HeroDetails() {
    const [ match, params ] = useRoute("/superhero/:id")
    const [heroe, setHeroe] = useState(null);
    

    useEffect(() => {

        const getData = async () => {
            
            try {
                const res = await getUserById(params)
                const data = await res.json()
    
                if(!res.ok) throw {status:res.status,message : res.statusText}
    
                setHeroe(data)
            } catch (error) {
                
            }
        }
       
        getData()

        return () => {
            
        };
    }, [params.id]);

    
    return (
        <div className='card my-6 mx-4 p-5 is-flex  is-flex-direction-column  is-align-items-center heroe-detail'  >
            {heroe && <>
                <div className='is-flex  heroe-detail-infor is-justify-content-space-around pb-5'  style={{width:"100%", borderBottom:"3px solid #606060"}}>
                    <img src={heroe.images.md} alt={heroe.name} style={{borderRadius:"8px"}}/>
                    <div className='py-3 px-5'>
                        <h3 className='is-size-2 has-text-centered mb-1 has-text-weight-semibold'>{heroe.name}</h3>
                        <h3 className='is-size-8 has-text-centered mb-4 has-text-weight'>{heroe.biography.fullName}</h3>

                        <p className="is-size-5 my-3">
                            Has {heroe.appearance.gender.includes("Female") ? "her" : "his"} first appearance in : <span className='has-text-info'>{heroe.biography.firstAppearance}</span>. 
                        </p>
                        <p className="is-size-5 my-3">
                            Race: <span className='has-text-info'>{heroe.appearance.race || "Unknow"}</span>.
                        </p>
                        <p className="is-size-5 my-3">
                            Was born in {heroe.biography.placeOfBirth.length > 1 ? heroe.biography.placeOfBirth : "unknown"}.
                        </p>
                        <p className="is-size-5 my-3">
                            Is also known as: 
                            
                                {heroe.biography.aliases.map(alia => <li key={alia} className="ml-5" >{alia}.</li>)}
                            
                        </p>

                        <p className="is-size-5 my-3">
                            {heroe.appearance.gender.includes("Female") ? "She" : "He"} works on {heroe.work.base.length > 1 ? heroe.work.base : "unknown"}.
                        </p>
                        <p className="is-size-5 my-3">
                            {heroe.appearance.gender.includes("Female") ? "She" : "He"} is {heroe.work.occupation.length > 1 ? heroe.work.occupation : "unknown"}.
                        </p>
                        <p className="is-size-5 my-3">
                            Has affiliated in <span className='has-text-info'>{heroe.connections.groupAffiliation}</span>.
                        </p>
                        <p className="is-size-5 my-3">
                            Relatives: <span className='has-text-info'>{heroe.connections.relatives}</span>.
                        </p>
                    </div>
                </div>
                <div style={{maxWidth:"500px",width:"100%"}} className="py-2" >
                    <h4 className='has-text-centered is-size-3 my-2'>Statistics</h4>
                    <div className="has-text-centered">
                        Combat: {heroe.powerstats.combat}
                        <progress className="progress is-primary has-background-danger my-2" value={heroe.powerstats.combat} max="100">{heroe.powerstats.combat} %</progress>
                    </div>
                    <div className="has-text-centered">
                        Durability: {heroe.powerstats.durability}
                        <progress className="progress is-link has-background-link my-2" value={heroe.powerstats.durability} max="100">{heroe.powerstats.durability} %</progress>

                    </div>
                    <div className="has-text-centered">
                        Intelligence: {heroe.powerstats.intelligence}
                        <progress className="progress is-info has-background-info my-2" value={heroe.powerstats.intelligence} max="100">{heroe.powerstats.intelligence} %</progress>

                    </div>
                    <div className="has-text-centered">
                        Power: {heroe.powerstats.power}
                        <progress className="progress is-success has-background-danger my-2" value={heroe.powerstats.power} max="100">{heroe.powerstats.power} %</progress>

                    </div>
                    <div className="has-text-centered">
                        Speed: {heroe.powerstats.speed}
                        <progress class="progress is-warning has-background-danger my-2" value={heroe.powerstats.speed} max="100">{heroe.powerstats.speed} %</progress>

                    </div>
                    <div className="has-text-centered">
                        Strength: {heroe.powerstats.strength}
                        <progress className="progress is-danger has-background-danger my-2" value={heroe.powerstats.strength} max="100">{heroe.powerstats.strength} %</progress>
                    </div>
                </div>
                <h3 className='is-size-6 my-2 has-text-centered'>Was published by {heroe.biography.publisher}®.</h3>
            </>}
        </div>
    )
}
