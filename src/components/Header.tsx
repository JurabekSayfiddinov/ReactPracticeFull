import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700 text-xs font-medium text-white">
            DF
          </span>
          <span className="text-base font-bold tracking-tight text-gray-900">
            DebtFlow
          </span>
         
        </Link>

        
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/features"
            className="hidden text-sm text-gray-500 transition-colors hover:text-gray-900 md:inline"
          >
            Features
          </Link>
          <Link
            to="/workflow"
            className="hidden text-sm text-gray-500 transition-colors hover:text-gray-900 md:inline"
          >
            Workflow
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium text-gray-900 transition-colors hover:text-green-700"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
          >
            Get Started
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
        </nav>
      </div>
    </header>
  );
}