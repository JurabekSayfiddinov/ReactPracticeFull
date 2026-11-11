import { createSlice } from "@reduxjs/toolkit"

type User = {
   id: number
   job: string
}

type InitialState = {
   data: User[]
}

let initialState: InitialState = {
   data: [
      {
         id: 1,
         job: "Programmer",
      },
      {
         id: 2,
         job: "Farmer",
      },
      {
         id: 3,
         job: "Lawyer",
      },
   ],
}

let dataSlice = createSlice({
   name: "data",
   initialState,
   reducers: {
      DeleteR:(state,{payload})=>{
         state.data=state.data.filter((e)=>e.id!=payload)
      },
      addR:(state,{payload})=>{
         state.data=[...state.data,payload]
      },
       editR: (state, {payload}) => {
      state.data = state.data.map((el)=>el.id === payload.id?payload:el)
    },
   },
})

export const {DeleteR,addR,editR} = dataSlice.actions

export default dataSlice.reducer
