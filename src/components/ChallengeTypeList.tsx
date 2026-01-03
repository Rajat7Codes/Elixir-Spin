import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import ChallengeCard from "./ChallengeCard";

interface ChallengeType {
  id: number;
  name: string;
  description: string;
}

export default function ChallengeTypeList() {
  const [types, setTypes] = useState<ChallengeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true

    apiClient.get<ChallengeType[]>("/challenge-types")
      .then((res) => {
        if (isMounted) setTypes(res.data)
      })
      .catch(() => {
        if (isMounted) setError("Failed to load challenges")
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading challenges...
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error occurent please mail patilrajat805@gmail.com if it still persists...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {types.map((type) => (
          <ChallengeCard key={type.id} {...type} />
        ))}
      </div>
    </section>
  );
}
