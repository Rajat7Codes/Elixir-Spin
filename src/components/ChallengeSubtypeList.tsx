import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

interface ChallengeSubtype {
  id: number;
  name: string;
  description: string;
}

export default function ChallengeSubtypeList() {
  const { id } = useParams(); // challenge type id
  const [subtypes, setSubtypes] = useState<ChallengeSubtype[]>([]);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/challenge-types/${id}/subtypes`).then((res) => setSubtypes(res.data));
  }, [id]);

  return (
    <div className="p-6 space-y-4">
      {subtypes.map((sub) => (
        <div
          key={sub.id}
          className="p-4 border rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold">{sub.name}</h2>
          <p className="text-gray-600">{sub.description}</p>

          {/* Link updated to include both challenge type id and subtype id */}
          <Link
            to={`/challenge-types/${id}/subtypes/${sub.id}`}
            className="inline-block mt-2 text-emerald-600 font-medium"
          >
            Play →
          </Link>
        </div>
      ))}
    </div>
  );
}
