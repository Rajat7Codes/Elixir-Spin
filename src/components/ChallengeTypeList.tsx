import ChallengeCard from "./ChallengeCard";
import { CHALLENGE_TYPES } from "../constants";

export default function ChallengeTypeList() {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-6 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {CHALLENGE_TYPES.map((type) => (
          <ChallengeCard key={type.id} {...type} />
        ))}
      </div>
    </section>
  );
}