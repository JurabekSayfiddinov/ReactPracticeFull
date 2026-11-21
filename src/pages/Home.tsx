import { Link } from "react-router-dom"


const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-50 px-4 py-6">
   
         <section className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white p-1 pr-3 shadow-sm">
               <span className="rounded bg-green-700 px-2 py-0.5 font-mono text-[10px] font-medium text-white">
                  SPEC 2026
               </span>
               <span className="text-xs text-gray-600">
                  Simple, Clean & Modern Debt Administration
               </span>
            </div>

            <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
               Manage debts, track payments, and see who owes money with
               absolute clarity.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
               No cluttered dashboards. No confusing charts or analytics.
               DebtFlow delivers an ultra-fast, Swagger-inspired admin
               interface built for practical record-keeping and reliable
               settlement tracking.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
               <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-md bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800"
               >
                  Create Free Account
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
                     <path d="M5 12h14" />
                     <path d="m12 5 7 7-7 7" />
                  </svg>
               </Link>
               <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-gray-50"
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
                     <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                     <circle cx="12" cy="12" r="3" />
                  </svg>
                  Explore Live App Demo
               </Link>
            </div>
         </section>


         <section className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
       
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                     <span className="h-3 w-3 rounded-full bg-slate-300" />
                     <span className="h-3 w-3 rounded-full bg-slate-300" />
                     <span className="h-3 w-3 rounded-full bg-slate-300" />
                  </div>
                  <span className="hidden font-mono text-[11px] text-slate-500 sm:inline">
                     https://app.debtflow.io/debts
                  </span>
               </div>
               <span className="rounded bg-green-700 px-2 py-0.5 font-mono text-[10px] font-medium text-white">
                  200 OK
               </span>
            </div>

        
            <div className="overflow-x-auto p-4">
               <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                     <tr className="bg-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                        <th className="rounded-l-md px-3 py-2.5">ID</th>
                        <th className="px-3 py-2.5">Party Name</th>
                        <th className="px-3 py-2.5">Amount</th>
                        <th className="px-3 py-2.5">Debt Type</th>
                        <th className="px-3 py-2.5">Due Date</th>
                        <th className="rounded-r-md px-3 py-2.5 text-right">
                           Status
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr className="border-b border-gray-200">
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-500">
                           #DBT-0101
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-slate-900">
                           Marcus Vance
                        </td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-700">
                           $2,450.00
                        </td>
                        <td className="px-3 py-2.5">
                           <span className="rounded bg-green-700 px-2 py-0.5 font-mono text-[10px] font-medium text-white">
                              OWED TO ME
                           </span>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-500">
                           2026-12-15
                        </td>
                        <td className="px-3 py-2.5 text-right">
                           <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
                              Pending
                           </span>
                        </td>
                     </tr>
                     <tr>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-500">
                           #DBT-0102
                        </td>
                        <td className="px-3 py-2.5 font-semibold text-slate-900">
                           Elena Rostova
                        </td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-700">
                           $820.00
                        </td>
                        <td className="px-3 py-2.5">
                           <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-medium text-white">
                              I OWE
                           </span>
                        </td>
                        <td className="px-3 py-2.5 font-mono text-xs text-slate-500">
                           2026-11-30
                        </td>
                        <td className="px-3 py-2.5 text-right">
                           <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-700">
                              Active
                           </span>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </section>
           <section id="features" className="border-t border-gray-200 bg-white px-4 py-16">
            <div className="mx-auto max-w-5xl">
               <div className="text-center">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-green-700">
                     Core Advantages
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                     Engineered for pure speed &amp; administrative clarity
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                     Everything you need to run personal or commercial
                     receivables without bloat.
                  </p>
               </div>

               <div className="mt-12 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-slate-50 p-5">
                     <div className="flex h-9 w-9 items-center justify-center rounded-md border border-green-200 bg-green-50 text-green-700">
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
                           <rect x="3" y="3" width="18" height="18" rx="2" />
                           <path d="M3 9h18" />
                           <path d="M3 15h18" />
                           <path d="M9 3v18" />
                        </svg>
                     </div>
                     <h3 className="mt-4 text-sm font-bold text-slate-900">
                        Swagger-Style Clean Tables
                     </h3>
                     <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                        High-density rows with monospace IDs, direct phone
                        numbers, and instant search &amp; filters without
                        paginated delays.
                     </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-slate-50 p-5">
                     <div className="flex h-9 w-9 items-center justify-center rounded-md border border-green-200 bg-green-50 text-green-700">
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
                           <rect x="2" y="6" width="20" height="12" rx="2" />
                           <circle cx="12" cy="12" r="2" />
                           <path d="M6 12h.01M18 12h.01" />
                        </svg>
                     </div>
                     <h3 className="mt-4 text-sm font-bold text-slate-900">
                        Granular Payment History
                     </h3>
                     <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                        Track multi-stage installment receipts against
                        principal balances with automated paid and remaining
                        calculations.
                     </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-slate-50 p-5">
                     <div className="flex h-9 w-9 items-center justify-center rounded-md border border-green-200 bg-green-50 text-green-700">
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
                           <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                           <path d="m9 12 2 2 4-4" />
                        </svg>
                     </div>
                     <h3 className="mt-4 text-sm font-bold text-slate-900">
                        Protected CRUD Controls
                     </h3>
                     <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                        Every delete operation requires explicit entity
                        confirmation dialogs so records are never lost
                        accidentally.
                     </p>
                  </div>
               </div>
            </div>
         </section>


         <section
            id="workflow"
            className="border-y border-gray-200 bg-slate-50 px-4 py-16"
         >
            <div className="mx-auto max-w-5xl">
               <div className="text-center">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-green-700">
                     3-Step Workflow
                  </p>
                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                     Simple debt tracking in practice
                  </h2>
               </div>

               <div className="mt-12 grid gap-6 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-5">
                     <span className="inline-block rounded border border-gray-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-slate-600">
                        Step 01
                     </span>
                     <h3 className="mt-3 text-sm font-bold text-slate-900">
                        Record Obligation
                     </h3>
                     <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                        Log the counterparty name, phone, due date, and specify
                        if you owe or are owed money.
                     </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-5">
                     <span className="inline-block rounded border border-gray-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-slate-600">
                        Step 02
                     </span>
                     <h3 className="mt-3 text-sm font-bold text-slate-900">
                        Log Installments
                     </h3>
                     <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                        Log partial or lump-sum payments via bank transfer,
                        cash, card, or digital wire.
                     </p>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-5">
                     <span className="inline-block rounded border border-green-700 bg-green-700 px-2 py-0.5 font-mono text-[10px] font-medium uppercase text-white">
                        Step 03
                     </span>
                     <h3 className="mt-3 text-sm font-bold text-slate-900">
                        Settle &amp; Reconcile
                     </h3>
                     <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                        Watch remaining balances zero out automatically as
                        transactions are recorded and verified.
                     </p>
                  </div>
               </div>
            </div>
         </section>

        
         <section className="bg-white px-4 py-16 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
               Ready for clean debt administration?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
               Join professionals tracking personal obligations and
               micro-business credit without clutter.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
               <Link
                  to="/signup"
                  className="rounded-md bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800"
               >
                  Create Your Account
               </Link>
               <Link
                  to="/login"
                  className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 transition-colors hover:bg-gray-50"
               >
                  Sign In to Panel
               </Link>
            </div>
         </section>
      </div> 
    </>
  )
}
export default Home