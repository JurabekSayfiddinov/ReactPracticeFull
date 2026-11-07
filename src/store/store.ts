import { create } from "zustand";

export const useTodo=create((set)=>({
    data:[{id:1,name:"Ali",job:"Farmer"},{id:2, name:"Kurbon",job:"Doctor"}],
    deleteUser:(id:number)=>set((state)=>({data:state.data.filter((e)=>e.id!=id)})),
        addUser: (user) => set((state) => ({
        data: [...state.data, { id: Date.now(), ...user }]
    })),
    editUser: (id, user) => set((state) => ({
        data: state.data.map((e) =>
            e.id === id ? { ...e, ...user } : e
        )
    })),
}
))