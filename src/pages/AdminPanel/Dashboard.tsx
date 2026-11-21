import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useGetSummaryQuery } from "../../store/api"


function money(n) {
   return (
      "$" +
      Number(n).toLocaleString("en-US", {
         minimumFractionDigits: 2, 
         maximumFractionDigits: 2,
      })
   )
}

export default function Dashboard() {
   const { data, isLoading, error } = useGetSummaryQuery()

   if (isLoading) {
      return <div className="p-6 text-sm text-slate-600">Loading...</div>
   }

   if (error) {
      return (
         <div className="p-6">
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
               {error}
            </div>
         </div>
      )
   }

   
   const owedToMe = data.outstanding.they_owe_me 
   const iOwe = data.outstanding.i_owe_them 
   const net = data.outstanding.net_balance 
   const paidIn = data.totals.they_owe_me - data.outstanding.they_owe_me 
   const activeCount = data.counts.pending + data.counts.partial 
   const today = new Date().toISOString().slice(0, 10) 

   return (
      <>
      
         <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
            <div className="flex items-center gap-2.5">
               <h1 className="text-base font-bold text-slate-900">
                  System Overview
               </h1>
               <span className="rounded border border-gray-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                  live status
               </span>
            </div>
            <Link
               to="/dashboard/debts/new"
               className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-green-800"
            >
               <span className="text-base leading-none">+</span>
               Add New Debt
            </Link>
         </div>

         <div className="space-y-5 p-6">
           
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
               <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        Owed to me
                     </span>
                     <span className="rounded bg-green-700 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase text-white">
                        Receivable
                     </span>
                  </div>
                  <p className="mt-3 font-mono text-2xl text-green-700">
                     {money(owedToMe)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                     {activeCount} active debts
                  </p>
               </div>

               <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        I owe
                     </span>
                     <span className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase text-white">
                        Liability
                     </span>
                  </div>
                  <p className="mt-3 font-mono text-2xl text-slate-900">
                     {money(iOwe)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                     {data.contacts_count} contacts
                  </p>
               </div>

               <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        Net balance
                     </span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                     >
                        <path d="M3 21h18" />
                        <path d="M5 21V10" />
                        <path d="M19 21V10" />
                        <path d="M9 21V10" />
                        <path d="M15 21V10" />
                        <path d="m3 10 9-6 9 6" />
                     </svg>
                  </div>
                  <p
                     className={
                        "mt-3 font-mono text-2xl " +
                        (net >= 0 ? "text-green-700" : "text-red-700")
                     }
                  >
                     {net >= 0 ? "+" : "-"}
                     {money(Math.abs(net))}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                     {net >= 0 ? "Net positive surplus" : "Net deficit"}
                  </p>
               </div>

               <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                        Total paid in
                     </span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-slate-700"
                        aria-hidden="true"
                     >
                        <circle cx="12" cy="12" r="10" />
                        <path d="m9 12 2 2 4-4" />
                     </svg>
                  </div>
                  <p className="mt-3 font-mono text-2xl text-slate-900">
                     {money(paidIn)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                     {data.counts.paid} fully paid debts
                  </p>
               </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
               <div className="flex items-center justify-between px-4 py-3.5">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-amber-700"
                        aria-hidden="true"
                     >
                        <rect x="8" y="2" width="8" height="4" rx="1" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <path d="M12 11v4" />
                        <path d="M12 18h.01" />
                     </svg>
                     Pending &amp; Overdue Debts
                  </h2>
                  <Link
                     to="/dashboard/debts"
                     className="text-xs font-medium text-green-700 hover:text-green-800"
                  >
                     View All
                  </Link>
               </div>

               <table className="w-full text-left text-sm">
                  <thead>
                     <tr className="bg-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                        <th className="px-4 py-2">Debtor / Creditor</th>
                        <th className="px-2 py-2">Type</th>
                        <th className="px-2 py-2">Amount</th>
                        <th className="px-4 py-2 text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.upcoming_due.length === 0 && (
                        <tr>
                           <td
                              colSpan={4}
                              className="px-4 py-6 text-center text-xs text-slate-500"
                           >
                              No pending debts
                           </td>
                        </tr>
                     )}

                     {data.upcoming_due.map((d) => {
                        const overdue = d.status !== "paid" && d.due_date < today

                        const label = overdue
                           ? "Overdue"
                           : d.status.charAt(0).toUpperCase() + d.status.slice(1)

                        const badge = overdue
                           ? "border-red-200 bg-red-50 text-red-700"
                           : d.status === "partial"
                             ? "border-sky-200 bg-sky-50 text-sky-700"
                             : d.status === "paid"
                               ? "border-green-200 bg-green-50 text-green-700"
                               : "border-amber-200 bg-amber-50 text-amber-700"

                        return (
                           <tr
                              key={d.id}
                              className="border-b border-gray-200 last:border-b-0"
                           >
                              <td className="px-4 py-3">
                                 <p className="text-[13px] font-semibold text-slate-900">
                                    {d.contact_name}
                                 </p>
                                 <p className="font-mono text-[10px] text-slate-500">
                                    Due: {d.due_date}
                                 </p>
                              </td>

                              <td className="px-2 py-3">
                                 {d.direction === "they_owe_me" ? (
                                    <span className="rounded bg-green-700 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase text-white">
                                       Owed
                                    </span>
                                 ) : (
                                    <span className="rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase text-white">
                                       I owe
                                    </span>
                                 )}
                              </td>

                              <td className="px-2 py-3 font-mono text-xs text-slate-800">
                                 {money(d.amount)}
                                 <span className="ml-1 text-[10px] text-slate-500">
                                    {d.currency}
                                 </span>
                              </td>

                              <td className="px-4 py-3 text-right">
                                 <span
                                    className={
                                       "rounded-full border px-2 py-0.5 text-[10px] font-medium " +
                                       badge
                                    }
                                 >
                                    {label}
                                 </span>
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
               <h2 className="text-sm font-bold text-slate-900">
                  Quick Actions
               </h2>
               <div className="mt-3 flex flex-wrap gap-2.5">
                  <Link
                     to="/dashboard/debts/new"
                     className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-green-800"
                  >
                     <span className="text-base leading-none">+</span>
                     Create New Debt Record
                  </Link>

                  <Link
                     to="/dashboard/debts?status=overdue"
                     className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-slate-900 transition-colors hover:bg-gray-50"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                     >
                        <path d="M3 6h18" />
                        <path d="M7 12h10" />
                        <path d="M10 18h4" />
                     </svg>
                     Filter Overdue Obligations
                  </Link>
               </div>
            </div>
         </div>
      </>
   )
}