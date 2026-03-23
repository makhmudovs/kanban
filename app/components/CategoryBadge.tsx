const categoryColor: Record<string, string> = {
  Enhancement: "bg-[#F2F4FF] text-[#4661E6]",
  Feature: "bg-[#F2F4FF] text-[#4661E6]",
  Bug: "bg-[#F2F4FF] text-[#4661E6]",
  UI: "bg-[#F2F4FF] text-[#4661E6]",
  UX: "bg-[#F2F4FF] text-[#4661E6]",
};

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className={`inline-block px-4 py-1 rounded-lg text-[13px] font-semibold ${categoryColor[label] ?? "bg-[#F2F4FF] text-[#4661E6]"}`}
    >
      {label}
    </span>
  );
}
