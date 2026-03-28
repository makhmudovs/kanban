type Item = {
  id: number;
  status: string;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
  color: string;
};

export function RoadmapItem(item: Item) {
  return (
    <div
      className="bg-white rounded-lg p-6 md:p-8 border-t-[6px]"
      style={{ borderTopColor: item.color }}
    >
      <div className="flex items-center gap-4 mb-4">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: item.color }}
        ></span>
        <span className="text-[#647196] text-sm">{item.status}</span>
      </div>

      <h3 className="text-[#3A4374] font-bold mb-2 hover:text-[#4661E6] cursor-pointer transition">
        {item.title}
      </h3>
      <p className="text-[#647196] text-sm mb-4 leading-relaxed">
        {item.description}
      </p>

      <span className="inline-block bg-[#F2F4FF] text-[#4661E6] text-xs font-bold px-4 py-1.5 rounded-lg mb-4">
        {item.category}
      </span>

      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 bg-[#F2F4FF] hover:bg-[#CFD7FF] px-4 py-2 rounded-lg transition group">
          <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 6l4-4 4 4"
              stroke="#4661E6"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="text-[#3A4374] text-xs font-bold">
            {item.upvotes}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.62 16H1.346l.902-.902c.485-.485.59-1.232.31-1.855L.2.5h17.1l-2.357 12.743a2.712 2.712 0 01-2.673 2.257H2.62z"
              fill="#CDD2EE"
            />
          </svg>
          <span className="text-[#3A4374] text-xs font-bold">
            {item.comments}
          </span>
        </div>
      </div>
    </div>
  );
}
