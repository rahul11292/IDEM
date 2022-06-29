import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getById, ResponseUser } from './../../../data';

type InitialStateCardview ={
    isLoading : boolean,
    data: ResponseUser | null,
    error: any 
}
const initialState:InitialStateCardview = {
    isLoading : false,
    data: null,
    error : null
} 




export const getUserById = createAsyncThunk('user/getUserById', async (id:string)=>{
    console.log(await getById(id))
    return await getById(id)
    
})

export const CardOpenViewSlice = createSlice({
    name: 'CardOpenView',
    initialState,
    reducers:{
    },
    extraReducers: (builder)=>{
        builder.addCase(getUserById.pending, (state=>{
            state.isLoading= true
            
        }))
        builder.addCase(getUserById.fulfilled, ((state, action)=>{
            state.isLoading= false
            state.data = action.payload as ResponseUser
            if(state.data?.status === 400){
                state.data = null;
                state.error = action.payload
            }

        }))
        builder.addCase(getUserById.rejected, ((state, action)=>{
            state.isLoading= false
            state.data = null
            state.error = action.payload
          
        }))

    }
})


export default CardOpenViewSlice.reducer