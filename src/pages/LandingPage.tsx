import Hero from "../layout/Hero";
import ChallengeTypeList from "../components/ChallengeTypeList";
import SystemStats from "../components/SystemStats";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <ChallengeTypeList />
      <SystemStats />
    </div>
  );
}
