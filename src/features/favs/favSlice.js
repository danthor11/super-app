import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection , getDocs ,addDoc , deleteDoc,doc, query, where} from "firebase/firestore";

const initialState = {
    favs: [],
    status:"initial",
    error:null
}

export const removeFav = createAsyncThunk("removeFav", async (favId,{rejectWithValue}) => {
    try {
        
        
        const deletedFav = await db.collection("favs").where("superId","==",favId.favId).get()

        deletedFav.forEach(async (doc) => {
            await doc.ref.delete()
        })
        
        return favId
    } catch (error) {
        rejectWithValue({message: error.message,error:true})
    }
})

export const addFavReducer =  createAsyncThunk("addFavReducer", async ({favId,userId},{rejectWithValue}) => {
    try {
        const result = await addDoc(collection(db,"favs"),{
            superId: favId,
            userId
        })
        
        
        return {
            userId,
            superId: favId,
            id:result.id
        }
        
    } catch (error) {
        rejectWithValue({message: error.message,error:true})
    }
})  

export const getAllFavsByUserId = createAsyncThunk("getAllFavsByUserId" , async (username,{rejectWithValue})=> {
    try {
       
        const favsRefs = collection(db,"favs") 
        const queryFavs = await query(favsRefs,where("userId","==",username))
        const dataFromFirebase = await getDocs(queryFavs)
        
        const favsList = dataFromFirebase.docs.map(doc => ({...doc.data(),id:doc.id}))
      
        return favsList
    } catch (error) {
        rejectWithValue({message: error.message,error:true})
    }
})


const favSlice = createSlice({
    name:"favs",
    initialState,
    reducers:{
        removeAllData : (state,action) => {
            state.favs = []
        }
    },
    extraReducers (build){
        build
            .addCase(addFavReducer.pending, (state,action) => {
                state.status="loading"
            })
            .addCase(addFavReducer.fulfilled, (state,action) => {
                state.status="success"
                state.favs = [...state.favs,action.payload]
                
            })
            .addCase(addFavReducer.rejected, (state, action) => {
                state.error= action.payload
                state.status="rejected"
                console.error(action.payload)
            })
            .addCase(getAllFavsByUserId.pending, (state,action) => {
                state.status="loading"
            })
            .addCase(getAllFavsByUserId.fulfilled, (state,action) => {
                
                state.status="success"
                state.favs=action.payload
            })
            .addCase(getAllFavsByUserId.rejected, (state,action) => {
                state.error= action.payload
                state.status="rejected"
            })

            .addCase(removeFav.pending,(state, action) => {
                state.status="loading"
            })

            .addCase(removeFav.fulfilled,(state, action) => {
                const {payload} = action
                state.favs = state.favs.filter(fav => fav.superId !== payload.favId)
                state.status  = "success"
            })

            .addCase(removeFav.rejected,(state, action) => {
                
                state.status  = "rejected"
                state.error = action.payload
            })

    }
})

export const { removeAllData } = favSlice.actions

export default favSlice.reducer
