import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white text-center px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>

      <p className="text-xl text-gray-300 mb-6">
        This arena does not exist ⚔️
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}