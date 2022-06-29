import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'react-router-dom';
import { userLogin as userLoginData } from '../../data';
import { UserLogin } from './Authentication';



type AuthState = {
    isLoading: boolean
    userData:any,
    error: any,
    location: Location| string

}

const initialState :AuthState ={
    isLoading: false,
    userData:{},
    error:null,
    location:'/'


}

export const loginUser = createAsyncThunk('user/loginUser', async ({account, entryEmail}:UserLogin)=>{
    const response = await userLoginData(account, entryEmail);
    return response
})

export const AuthenticationSlice = createSlice({
    name: 'Autorisation',
    initialState,
    reducers:{
        loggedOut : (state, action) =>{
            localStorage.removeItem("userId");
            state.location = action.payload.pathname
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginUser.pending, (state=>{
            state.isLoading= true
            
        }))
        builder.addCase(loginUser.fulfilled, ((state, action)=>{
            state.isLoading= false
            state.userData = action.payload
            state.error = null
            if(state.userData.status === 200 ){
                localStorage.setItem("userId", state.userData.response.Userid)
            } 
            else if(state.userData.status === 400){
                state.userData = null
                state.error = action.payload  
            }

        }))
        builder.addCase(loginUser.rejected, ((state, action)=>{
            state.isLoading= false
            state.userData = {}
            state.error = action.payload
          
        }))
    }
})

export const {loggedOut} = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer