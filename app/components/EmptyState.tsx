export function EmptyState() {
  return (
    <div className="bg-white rounded-2xl p-16 flex flex-col items-center text-center">
      <div className="text-6xl mb-6">🤔</div>
      <h3 className="text-[#3A4374] font-bold text-2xl mb-4">There is no feedback yet.</h3>
      <p className="text-[#647196] text-[15px] max-w-xs">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
      </p>
    </div>
  );
}