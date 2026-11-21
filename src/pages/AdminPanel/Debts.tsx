
import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetContactsQuery, useGetDebtsQuery } from "../../store/api"

function money(amount, currency = "USD") {
   return (
      "$" +
      Number(amount || 0).toLocaleString("en-US", {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      })
   )
}

export default function Debts() {
   const { data, isLoading, error } = useGetDebtsQuery()
   const {data:contactsData}=useGetContactsQuery()
   const [search, setSearch] = useState("")
   const [type, setType] = useState("all")
   const [status, setStatus] = useState("all")
   const [page, setPage] = useState(1)

   const today = new Date().toISOString().slice(0, 10)
   const pageSize = 6

   const debts = Array.isArray(data)
      ? data
      : data?.debts || data?.items || []


     const contacts = Array.isArray(contactsData)
   ? contactsData
   : contactsData?.contacts || []

const debtsWithContacts = debts.map((debt) => {
   const contact = contacts.find(
      (c) => c.id === debt.contact_id
   )

   return {
      ...debt,
      contact_name: contact?.name || debt.contact_name || "Unknown",
      contact_phone: contact?.phone || debt.contact_phone || "—",
   }
})
   const filteredDebts = debtsWithContacts.filter((debt) => {
      const name = debt.contact_name || debt.contact?.name || debt.name || ""
      const phone = debt.contact_phone || debt.contact?.phone || debt.phone || ""
      const id = String(debt.id || "")

      const searchMatch =
         name.toLowerCase().includes(search.toLowerCase()) ||
         phone.toLowerCase().includes(search.toLowerCase()) ||
         id.toLowerCase().includes(search.toLowerCase())

      const typeMatch =
         type === "all" || debt.direction === type

      const overdue =
         debt.status !== "paid" && debt.due_date < today

      const currentStatus = overdue ? "overdue" : debt.status

      const statusMatch =
         status === "all" || currentStatus === status

      return searchMatch && typeMatch && statusMatch
   })

   
   const totalPages = Math.max(
      1,
      Math.ceil(filteredDebts.length / pageSize)
   )

   const currentPage = Math.min(page, totalPages)

   const startIndex = (currentPage - 1) * pageSize

   const currentDebts = filteredDebts.slice(
      startIndex,
      startIndex + pageSize
   )

   function getStatus(debt) {
      if (debt.status !== "paid" && debt.due_date < today) {
         return {
            label: "Overdue",
            style: "border-red-200 bg-red-50 text-red-700",
         }
      }

      const statuses = {
         pending: {
            label: "Pending",
            style: "border-amber-200 bg-amber-50 text-amber-700",
         },
         partial: {
            label: "Active",
            style: "border-blue-200 bg-blue-50 text-blue-700",
         },
         paid: {
            label: "Settled",
            style: "border-green-200 bg-green-50 text-green-700",
         },
      }

      return statuses[debt.status] || statuses.pending
   }

   if (isLoading) {
      return <div className="p-6 text-sm text-slate-600">Loading debts...</div>
   }

   if (error) {
      return (
         <div className="p-6">
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
               {error?.data?.error || "Failed to load debts"}
            </div>
         </div>
      )
   }

   return (
      <>
         <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
            <div className="flex items-center gap-2.5">
               <h1 className="text-base font-bold text-slate-900">
                  Debts Management
               </h1>

               <span className="rounded border border-gray-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                  {filteredDebts.length} entries
               </span>
            </div>

            <Link
               to="/dashboard/debts/new"
               className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-xs font-medium text-white hover:bg-green-800"
            >
               <span className="text-base leading-none">+</span>
               Add New Debt
            </Link>
         </div>

         <div className="space-y-4 p-6">

            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">

               <div className="relative min-w-[220px] flex-1">
                  <svg
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  >
                     <circle cx="11" cy="11" r="7" />
                     <path d="m20 20-4-4" />
                  </svg>

                  <input
                     type="text"
                     placeholder="Search by full name, phone number, ID..."
                     value={search}
                     onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                     }}
                     className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs outline-none focus:border-green-700"
                  />
               </div>

               <div className="flex items-center gap-2">
                  <label className="text-[11px] text-slate-700">
                     Type:
                  </label>

                  <select
                     value={type}
                     onChange={(e) => {
                        setType(e.target.value)
                        setPage(1)
                     }}
                     className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs outline-none"
                  >
                     <option value="all">All Types</option>
                     <option value="they_owe_me">Owed to me</option>
                     <option value="i_owe_them">I owe</option>
                  </select>
               </div>

               <div className="flex items-center gap-2">
                  <label className="text-[11px] text-slate-700">
                     Status:
                  </label>

                  <select
                     value={status}
                     onChange={(e) => {
                        setStatus(e.target.value)
                        setPage(1)
                     }}
                     className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs outline-none"
                  >
                     <option value="all">All Statuses</option>
                     <option value="pending">Pending</option>
                     <option value="partial">Active</option>
                     <option value="paid">Settled</option>
                     <option value="overdue">Overdue</option>
                  </select>
               </div>

               <button
                  onClick={() => {
                     setSearch("")
                     setType("all")
                     setStatus("all")
                     setPage(1)
                  }}
                  className="px-2 py-2 text-xs text-slate-700 hover:text-green-700"
               >
                  Reset
               </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

               <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px] text-left">

                     <thead>
                        <tr className="bg-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                           <th className="px-3 py-3">ID</th>
                           <th className="px-3 py-3">Full Name</th>
                           <th className="px-3 py-3">Phone Number</th>
                           <th className="px-3 py-3">Amount</th>
                           <th className="px-3 py-3">Debt Type</th>
                           <th className="px-3 py-3">Description</th>
                           <th className="px-3 py-3">Due Date</th>
                           <th className="px-3 py-3">Status</th>
                           <th className="px-3 py-3">Details</th>
                        </tr>
                     </thead>

                     <tbody>
                        {currentDebts.length === 0 && (
                           <tr>
                              <td
                                 colSpan={8}
                                 className="px-4 py-10 text-center text-xs text-slate-500"
                              >
                                 No debts found
                              </td>
                           </tr>
                        )}

                        {currentDebts.map((debt) => {
                           const name =
                              debt.contact_name ||
                              debt.contact?.name ||
                              debt.name ||
                              "Unknown"

                           const phone =
                              debt.contact_phone ||
                              debt.contact?.phone ||
                              debt.phone ||
                              "—"

                           const badge = getStatus(debt)

                           return (
                              <tr
                                 key={debt.id}
                                 className="border-b border-gray-200 text-xs last:border-0 hover:bg-slate-50"
                              >
                                 <td className="px-3 py-4 font-mono text-slate-600">
                                    #DBT-{String(debt.id).padStart(4, "0")}
                                 </td>

                                 <td className="px-3 py-4 font-medium text-slate-900">
                                    {name}
                                 </td>

                                 <td className="px-3 py-4 font-mono text-slate-600">
                                    {phone}
                                 </td>

                                 <td className="px-3 py-4 font-mono text-slate-900">
                                    {money(debt.amount, debt.currency)}
                                 </td>

                                 <td className="px-3 py-4">
                                    {debt.direction === "they_owe_me" ? (
                                       <span className="rounded bg-emerald-700 px-2 py-1 font-mono text-[9px] uppercase text-white">
                                          Owed to me
                                       </span>
                                    ) : (
                                       <span className="rounded bg-slate-900 px-2 py-1 font-mono text-[9px] uppercase text-white">
                                          I owe
                                       </span>
                                    )}
                                 </td>

                                 <td className="max-w-[220px] px-3 py-4 text-slate-600">
                                    <p className="truncate">
                                       {debt.description || "—"}
                                    </p>
                                 </td>
                                 

                               <td className="whitespace-nowrap px-3 py-4 font-mono text-slate-600">
   {debt.due_date
      ? debt.due_date.slice(0, 10)
      : "—"}
</td>

                                 <td className="px-3 py-4">
                                    <span
                                       className={
                                          "whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-medium " +
                                          badge.style
                                       }
                                    >
                                       ● {badge.label}
                                    </span>
                                 </td>
                                 <td><Link
  to={`/dashboard/debts/${debt.id}`}
  className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700"
>
  View Details
</Link></td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               </div>

               <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">

                  <p className="text-[10px] text-slate-600">
                     Showing {filteredDebts.length === 0 ? 0 : startIndex + 1}
                     {" "}to{" "}
                     {Math.min(startIndex + pageSize, filteredDebts.length)}
                     {" "}of {filteredDebts.length} debts
                  </p>

                  <div className="flex items-center gap-2">
                     <button
                        disabled={currentPage === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                     >
                        Previous
                     </button>

                     <span className="rounded bg-slate-100 px-2.5 py-1.5 text-[10px] text-slate-700">
                        {currentPage}
                     </span>

                     <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                     >
                        Next
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
