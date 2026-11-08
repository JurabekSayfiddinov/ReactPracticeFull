import axios from "axios";
import { create } from "zustand";
import { Api } from "../utils/Api";


type User = {
    id: number;
    name: string;
    description?: string;
    job?: string;
    IsCompleted?: boolean;
    Images?: string;
};

type TodoStore = {
    data: User[];
    getUsers: () => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
    addUser: (user: Record<string, unknown>) => Promise<void>;
    editUser: (id: number, user: { name: string; job: string }) => Promise<void>;
};

export const useTodo = create<TodoStore>((set, get) => ({
    data: [],
    getUsers: async () => {
        try {
            const { data } = await axios.get<{ data: User[] }>(Api);
            set({ data: data.data });
        } catch (error) {
            console.error(error);
        }
    },
    deleteUser: async (id: number) => {
        try {
            await axios.delete(`${Api}?id=${id}`);
            await get().getUsers();
        } catch (error) {
            console.error(error);
        }
    },
   addUser: async (user: FormData) => {
    try {
        await axios.post(Api, user);
        await get().getUsers();
    } catch (error) {
        console.error(error);
        throw error;
    }
},
  editUser: async (id, user) => {
    try {
        await axios.put(`${Api}?id=${id}`, user);
        await get().getUsers();
    } catch (error) {
        console.log(error);
        throw error;
    }
},
}));