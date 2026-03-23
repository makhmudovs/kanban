import { ChevronUp } from "lucide-react";

export function UpvoteButton({ count, upvoted, onToggle, vertical = false }: {
  count: number; upvoted: boolean; onToggle: () => void; vertical?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-bold transition-colors ${
        upvoted ? "bg-[#4661E6] text-white" : "bg-[#F2F4FF] text-[#3A4374] hover:bg-[#CFD7FF]"
      } ${vertical ? "flex-col gap-1 px-4 py-3 min-w-12.5" : ""}`}
    >
      <ChevronUp size={14} className={upvoted ? "text-white" : "text-[#4661E6]"} strokeWidth={3} />
      <span>{count}</span>
    </button>
  );
}