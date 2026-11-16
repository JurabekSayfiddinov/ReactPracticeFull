
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  images: {
    id: number;
    imageName: string;
  }[];
}

export interface TodoResponse {
  data: Todo[];
  errors: unknown[];
  statusCode: number;
}

export interface TodoInput {
  name: string;
  description: string;
  isCompleted: boolean;
}

export const todoApi = createApi({
  reducerPath: "todoApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://to-dos-api.softclub.tj/api/",
  }),

  tagTypes: ["Todos"],

  endpoints: (builder) => ({

 
    getTodos: builder.query<TodoResponse, void>({
      query: () => "to-dos",
      providesTags: ["Todos"],
    }),


    addTodo: builder.mutation<Todo, TodoInput>({
      query: (newTodo) => ({
        url: "to-dos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todos"],
    }),


    editTodo: builder.mutation< Todo, TodoInput>({
      query: ({ id, body }) => ({
        url: `to-dos/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),


    deleteTodo: builder.mutation<
      unknown,
      number
    >({
      query: (id) => ({
        url: `to-dos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),

  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
