import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

interface SystemMetrics {
  totalDecks: number;
  uniqueUsers: number;
  totalWheelSpins: number;
  totalRandomizerDecks: number;
  totalSlotRolls: number;
}

export default function SystemStats() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await apiClient.get("/metrics");
        setMetrics(response.data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <section className="border-t border-white/5 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 divide-x divide-white/10">
          <StatItem label="Decks Built" value={metrics.totalDecks} icon="🎴" />
          <StatItem label="Unique Users" value={metrics.uniqueUsers} icon="👥" />
          <StatItem label="Wheel Spins" value={metrics.totalWheelSpins} icon="🎡" />
          <StatItem label="Slot Rolls" value={metrics.totalSlotRolls} icon="🎰" />
          <StatItem label="Randomizer Runs" value={metrics.totalRandomizerDecks} icon="🎲" />
        </div>
      </div>
    </section>
  );
}

function StatItem({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="flex flex-col items-center px-8 py-2 gap-0.5 min-w-[110px]">
      <span className="text-xl mb-0.5">{icon}</span>
      <p className="text-textprimary text-xl font-black tracking-tight leading-none">
        {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString()}
      </p>
      <p className="text-textprimary/40 text-[10px] font-semibold uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}
