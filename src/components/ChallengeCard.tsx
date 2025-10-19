import { Link } from "react-router-dom";

interface ChallengeCardProps {
  name: string;
  description: string;
}

export default function ChallengeCard({name, description }: ChallengeCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800 p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
      <h2 className="text-2xl font-semibold text-textprimary">{name}</h2>
      <p className="text-textprimary mt-2">{description}</p>
      <Link
        to={`/challenge-types/${name.toLowerCase().replace(/[_\s]+/g, "-")}`}
        className="inline-block mt-3 text-textsecondary font-medium hover:underline"
      >
        Play →
      </Link>
    </div>
  );
}
