import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
   baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000",
   prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken")
      if (token) headers.set("Authorization", `Bearer ${token}`)
      return headers
   },
})

const baseQueryWithAuth = async (args, api, extraOptions) => {
   const result = await baseQuery(args, api, extraOptions)
   if (result.error && result.error.status === 401) {
      localStorage.removeItem("accessToken")
      window.location.href = "/login"
   }
   return result
}

export const api = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithAuth,
   tagTypes: ["Dashboard", "Debts", "Contacts"],
   endpoints: (builder) => ({
      register: builder.mutation({
         query: (body) => ({ url: "/api/auth/register", method: "POST", body }),
      }),

      login: builder.mutation({
         query: (body) => ({ url: "/api/auth/login", method: "POST", body }),
      }),

      getSummary: builder.query({
         query: () => "/api/dashboard/summary",
         providesTags: ["Dashboard"],
      }),

      getContacts: builder.query({
         query: () => "/api/contacts",
         providesTags: ["Contacts"],
      }),

      createContact: builder.mutation({
         query: (body) => ({ url: "/api/contacts", method: "POST", body }),
         invalidatesTags: ["Contacts"],
      }),

      getDebts: builder.query({
         query: (params) => ({ url: "/api/debts", params }),
         providesTags: ["Debts"],
      }),

      createDebt: builder.mutation({
         query: (body) => ({ url: "/api/debts", method: "POST", body }),
         invalidatesTags: ["Debts", "Dashboard"],
      }),

      updateDebt: builder.mutation({
         query: ({ id, ...body }) => ({
            url: `/api/debts/${id}`,
            method: "PATCH",
            body,
         }),
         invalidatesTags: ["Debts", "Dashboard"],
      }),
      
getPayments: builder.query<any, void>({
   query: () => "/payments",
   providesTags: ["Payments"],
}),

getFolders: builder.query<any, void>({
   query: () => "/api/folders", 
   providesTags: ["Folders"],
}),

createFolder: builder.mutation<any, { name: string; color: string }>({
   query: (body) => ({
      url: "/api/folders",
      method: "POST",
      body,
   }),
   invalidatesTags: ["Folders"],
}),

updateFolder: builder.mutation<any,{ id: string; name: string; color: string }>({
   query: ({ id, ...body }) => ({
      url: `/api/folders/${id}`,
      method: "PATCH",
      body,
   }),
   invalidatesTags: ["Folders"],
}),

deleteFolder: builder.mutation<void, string>({
   query: (id) => ({
      url: `/api/folders/${id}`,
      method: "DELETE",
   }),
   invalidatesTags: ["Folders", "Contacts"],
}),

deletePayment: builder.mutation<void, string | number>({
   query: (id) => ({
      url: `/payments/${id}`, 
      method: "DELETE",
   }),
   invalidatesTags: ["Payments", "Debts", "Summary"],
}),
   }),
})

export const {
   useRegisterMutation,
   useLoginMutation,
   useGetSummaryQuery,
   useGetContactsQuery,
   useCreateContactMutation,
   useGetDebtsQuery,
   useCreateDebtMutation,
   useUpdateDebtMutation,
   useDeletePaymentMutation,
   useGetPaymentsQuery,
   useGetFoldersQuery,
   useCreateFolderMutation,
   useUpdateFolderMutation,
   useDeleteFolderMutation
} = api