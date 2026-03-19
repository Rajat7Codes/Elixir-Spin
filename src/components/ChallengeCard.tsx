import { Link } from "react-router-dom";

interface ChallengeCardProps {
  name: string;
  description: string;
  path: string;
  icon: string;
  badge: string;
}

export default function ChallengeCard({
  name,
  description,
  path,
  icon,
  badge,
}: ChallengeCardProps) {
  return (
    <div className="group relative bg-secondary/30 border border-secondary/60 hover:border-accentprimary/70 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,153,51,0.12)] overflow-hidden">
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accentprimary/0 to-accentprimary/0 group-hover:from-accentprimary/5 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="text-3xl">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-accentprimary border border-accentprimary/40 bg-accentprimary/10 px-2.5 py-1 rounded-full">
          {badge}
        </span>
      </div>

      {/* Title + accent line */}
      <div>
        <h2 className="text-lg font-bold text-textprimary">{name}</h2>
        <div className="mt-1.5 h-0.5 w-8 bg-accentprimary rounded-full group-hover:w-16 transition-all duration-300" />
      </div>

      {/* Description */}
      <p className="text-textprimary/60 text-sm leading-relaxed flex-1">{description}</p>

      {/* CTA */}
      <Link
        to={path}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-accentprimary hover:text-textprimary transition-colors duration-200 group/link mt-1"
      >
        Play Now
        <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
      </Link>
    </div>
  );
}
