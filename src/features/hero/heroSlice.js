import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { getAllHeroesService } from "../../services/heroesServices";

export const getAllHeroes = createAsyncThunk("heroes/getAllHeroes", async ( ) => { 
    try {
        const res = await getAllHeroesService()
        const data = await res.json()
        if(!res.ok) throw {status:res.status , statusText : res.statusText}
        return {data}
    } catch (err) {
        const message = err.statusText || "An error occurred"
        return {
            message,
            ...err
        }
    }
    
})


const heroesSlice = createSlice({
    name:"heroes",
    initialState:{
        heroes: [],
        favs:[],
        status:"initial",
        error:null,
        powerstatsLimits:{

        }
    },
    reducers:{
        makeFav : (state,action) => {
            const { id } = action.payload
            state.favs.concat([state.favs,id])
        },
        changeFilter : (state,action) => {
            
            state.heroes = state.heroes
        }
    },
    extraReducers(build){
        build
            .addCase(getAllHeroes.pending, (state,action) => {
                state.status="loading"
            })
            .addCase(getAllHeroes.fulfilled, (state,action) => {
               
                
                const {data} = action.payload
                
                const dataFormated = data.map(character => {
                    return {
                        id: character.id,
                        name:character.name,
                        images: character.images.sm,
                        appearance: character.appearance,
                        biography : character.biography,
                        powerstats: character.powerstats
                    }
                })

                state.heroes = dataFormated

                state.status = "success"
                
            })
            .addCase(getAllHeroes.rejected, (state,action) => {
                state.status = "failed"
            })

    }
})


export const {makeFav , changeFilter} = heroesSlice.reducer
export default heroesSlice.reducer



