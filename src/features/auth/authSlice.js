import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import { app } from "../../firebase"

const authAction = app.auth()
const KEY_STORAGE = "auth-info"
const authInitialState = JSON.parse(localStorage.getItem(KEY_STORAGE)) || {
    token: null,
    username: null
}

export const signUpUser = createAsyncThunk("auth/signUpUser", async ({email,password},{rejectWithValue}) => {
    try {
        const { user } = await authAction.createUserWithEmailAndPassword(email,password) 
        

        return {
            token :user.refreshToken,
            username : user.email
        }
    } catch (err) {
        
        return rejectWithValue({message: "Email has been already used",error:true})
    }
})

export const signInUser = createAsyncThunk("auth/signInUser", async ({email,password},{rejectWithValue}) => {
    try {
        
        const {user} = await authAction.signInWithEmailAndPassword(email,password) 
        

        return {
            token :user.refreshToken,
            username : user.email
        }
    } catch (err) {
        
        return rejectWithValue({message: "Email or password are invalid",error:true})
    }
})


const authSlice = createSlice({
    name:"auth",
    initialState:{
        auth:authInitialState,
        isLoading:false,
        error:{
            error:false,
            message:""
        },
        ok:false
    },
    reducers:{
        setError: (state,action) => {
            state.error = {
                error:false,
                message:""
            }
        },
        logout: (state,action) => {
            state.auth =  {
                token: null,
                username: null
            }
            localStorage.removeItem(KEY_STORAGE)
        },
        setOk: (state,action) => {
            state.ok = false
        },
       
    },
    extraReducers(build){
        build
            .addCase(signInUser.pending, (state,action) => {
                state.isLoading=true
            })
            .addCase(signInUser.fulfilled, (state,action) => {  
                state.auth.token = action.payload.token
                state.auth.username = action.payload.username

                state.isLoading = false

                localStorage.setItem(KEY_STORAGE,JSON.stringify(state.auth))
                
            })  
            .addCase(signInUser.rejected, (state,action) => {
                state.isLoading = false
                state.error=action.payload
                
            })

            .addCase(signUpUser.pending, (state,action) => {
                state.isLoading=true
            })
            .addCase(signUpUser.fulfilled, (state,action) => {
                state.ok=true
                state.isLoading = false
                
            })  
            .addCase(signUpUser.rejected, (state,action) => {
                state.isLoading = false
                state.error = action.payload           
            })
            
            
    }

})

export const {setError,logout,setOk} = authSlice.actions
export default authSlice.reducer