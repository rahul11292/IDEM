import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'react-router-dom';
import { loadAllCard, searchCard } from '../../data';

type InitialStateAllCards ={
    isLoading : boolean,
    data: any,
    error: any 
}
const initialState:InitialStateAllCards = {
    isLoading : false,
    data: {},
    error : null
} 



export const loadAllCardAsync = createAsyncThunk('user/loadAllCards', async ()=>{
    return await loadAllCard()
})
export const searchCardAsync = createAsyncThunk('user/searchCard', async (searchParam:string)=>{
    return await searchCard(searchParam)
})

export const AllCardsSlice = createSlice({
    name: 'AllCards',
    initialState,
    reducers:{
    },
    extraReducers: (builder)=>{
        builder.addCase(loadAllCardAsync.pending, (state=>{
            state.isLoading= true
            
        }))
        builder.addCase(loadAllCardAsync.fulfilled, ((state, action)=>{
            state.isLoading= false
            state.data = action.payload
            if(state.data?.status === 400){
                state.data = {};
                state.error = action.payload
            }

        }))
        builder.addCase(loadAllCardAsync.rejected, ((state, action)=>{
            state.isLoading= false
            state.data = {}
            state.error = action.payload
          
        }))
        builder.addCase(searchCardAsync.pending, (state=>{
            state.isLoading= true
            
        }))
        builder.addCase(searchCardAsync.fulfilled, ((state, action)=>{
            state.isLoading= false
            state.data = action.payload
            if(state.data?.status === 400){
                state.data = {};
                state.error = action.payload
            }

        }))
        builder.addCase(searchCardAsync.rejected, ((state, action)=>{
            state.isLoading= false
            state.data = {}
            state.error = action.payload
          
        }))
    }
})


export default AllCardsSlice.reducer