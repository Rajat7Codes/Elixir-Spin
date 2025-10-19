import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-textprimary">
          Elixir Spin
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-textprimary hover:text-emerald-600 transition">Home</Link>
          <Link to="/about" className="text-textprimary hover:text-emerald-600 transition">About</Link>
        </div>
      </div>
    </nav>
  );
}
