import { useState } from "react";
import { SortOption } from "./FeedbackBoard";
import { ChevronUp, Lightbulb } from "lucide-react";
import Account from "./Account";

export function SortBar({
  count,
  sort,
  setSort,
  onAdd,
}: {
  count: number;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  onAdd: () => void;
}) {
  const [open, setOpen] = useState(false);
  const options: SortOption[] = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  return (
    <div className="bg-[#373F68] rounded-none sm:rounded-2xl px-6 py-3.5 flex items-center gap-4">
      <div className="hidden sm:flex items-center gap-3 text-white/75 mr-auto">
        <Lightbulb size={18} className="text-white/50" />
        <span className="font-bold text-white text-[15px]">
          {count} Suggestions
        </span>
      </div>
      <div className="relative mr-auto sm:mr-0">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-white/75 hover:text-white text-[13px]"
        >
          Sort by : <span className="font-bold text-white">{sort}</span>
          <ChevronUp
            size={14}
            className={`transition-transform ${open ? "" : "rotate-180"}`}
          />
        </button>
        {open && (
          <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
            {options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => {
                  setSort(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-6 py-3.5 text-[16px] text-[#647196] hover:text-[#AD1FEA] flex justify-between items-center ${
                  i < options.length - 1 ? "border-b border-[#3A437433]" : ""
                }`}
              >
                {opt}
                {sort === opt && <span className="text-[#AD1FEA]">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={onAdd}
        className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
      >
        + Add Feedback
      </button>
      <Account />
    </div>
  );
}
