import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary shadow-xl/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
        <Link to="/" className="text-2xl font-bold text-textprimary">
          Elixir Spin
        </Link>
      </div>
    </nav>
  );
}
