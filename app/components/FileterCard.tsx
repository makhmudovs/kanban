import { Category } from "./FeedbackBoard";

const FILTERS: Category[] = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

export function FilterCard({
  active,
  onSelect,
}: {
  active: Category;
  onSelect: (c: Category) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onSelect(f)}
            className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
              active === f
                ? "bg-[#4661E6] text-white"
                : "bg-[#F2F4FF] text-[#4661E6] hover:bg-[#CFD7FF]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
