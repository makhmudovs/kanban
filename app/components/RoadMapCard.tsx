const ROADMAP = [
  { label: "Planned", count: 2, color: "#F49F85" },
  { label: "In-Progress", count: 3, color: "#AD1FEA" },
  { label: "Live", count: 1, color: "#62BCFA" },
];

export function RoadmapCard() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-[#3A4374] text-base">Roadmap</h3>
        <a
          href="/roadmap"
          className="text-[#4661E6] text-[13px] font-semibold underline underline-offset-1 hover:text-[#8397F8]"
        >
          View
        </a>
      </div>
      <ul className="space-y-2">
        {ROADMAP.map((item) => (
          <li key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#647196] text-[16px]">{item.label}</span>
            </div>
            <span className="text-[#3A4374] font-bold text-[16px]">
              {item.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
