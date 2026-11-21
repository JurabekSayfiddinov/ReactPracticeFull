
import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetDebtsQuery, useGetContactsQuery } from "../../store/api"

function money(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amount || 0))
}

function DebtDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: debts = [],
    isLoading: debtsLoading,
    error,
  } = useGetDebtsQuery()

  const {
    data: contactsData = [],
    isLoading: contactsLoading,
  } = useGetContactsQuery()

  const contacts = Array.isArray(contactsData)
    ? contactsData
    : contactsData?.contacts || []

  const debt = debts.find((item) => item.id === id)

  if (debtsLoading || contactsLoading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading debt details...
      </div>
    )
  }

  if (error || !debt) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Debt not found</p>
        <Link to="/dashboard/debts" className="text-green-600">
          Back to Debts
        </Link>
      </div>
    )
  }

  const contact = contacts.find(
    (item) => item.id === debt.contact_id
  )

  const totalAmount = Number(debt.amount || 0)

  const paidAmount = 0
  const remainingAmount = totalAmount - paidAmount

  const direction =
    debt.direction === "they_owe_me"
      ? "Owed to me"
      : "I owe"

  const status = debt.status || "pending"

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/debts"
            className="text-xl text-slate-500 hover:text-slate-900"
          >
            ←
          </Link>

          <div>
            <p className="text-sm text-slate-500">
              Debts / <span className="font-semibold text-slate-900">
                #{debt.id.slice(0, 8).toUpperCase()}
              </span>
            </p>
            <span className="mt-1 inline-block rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              {direction}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              navigate(`/dashboard/debts/${debt.id}/edit`)
            }
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100"
          >
            ✎ Edit Debt
          </button>

          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            ♙ Debtor & Record Overview
          </h2>

          <span className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs text-amber-700">
            ● {status}
          </span>
        </div>

        <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-2 text-xs font-semibold text-slate-500">
              FULL NAME
            </p>
            <p className="font-semibold text-slate-900">
              {contact?.name || "Unknown"}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-500">
              PHONE NUMBER
            </p>
            <p className="font-mono text-slate-800">
              {contact?.phone || "—"}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-500">
              ORIGINATION DATE
            </p>
            <p className="font-mono text-slate-800">
              {debt.created_at?.slice(0, 10) || "—"}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-slate-500">
              DUE DATE
            </p>
            <p className="font-mono text-slate-800">
              {debt.due_date?.slice(0, 10) || "—"}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 p-5">
          <p className="mb-2 text-xs font-semibold text-slate-500">
            DESCRIPTION & TERMS
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {debt.description || "No description provided."}
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-4 text-xs font-semibold text-slate-500">
            TOTAL AMOUNT
          </p>
          <h2 className="text-3xl font-medium text-slate-900">
            {money(totalAmount, debt.currency)}
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            Initial principal obligation
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-4 text-xs font-semibold text-slate-500">
            PAID AMOUNT
          </p>
          <h2 className="text-3xl font-medium text-green-600">
            {money(paidAmount, debt.currency)}
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            Payments received
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="mb-4 text-xs font-semibold text-slate-500">
            REMAINING AMOUNT
          </p>
          <h2 className="text-3xl font-medium text-amber-600">
            {money(remainingAmount, debt.currency)}
          </h2>
          <p className="mt-2 text-xs text-slate-500">
            Remaining balance
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            ◷ Payment History
          </h2>

          <button
            disabled
            title="Connect the payments API first"
            className="cursor-not-allowed rounded-lg bg-green-700 px-4 py-2 text-sm text-white opacity-60"
          >
            + Record Payment
          </button>
        </div>

        <div className="p-8 text-center text-sm text-slate-400">
          No payment records yet.
        </div>
      </div>

    </div>
  )
}

export default DebtDetails
